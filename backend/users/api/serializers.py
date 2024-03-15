from rest_framework import serializers
from users.models import User, Customer, Restaurant
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from users.utils import send_normal_email
from django.template.loader import render_to_string
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from menu.api.serializers import MenuItemSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = "__all__"
        exclude = ["password"]


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "email": {"required": True, "allow_blank": False},
            "password": {"write_only": True},
        }

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.pop("password2")
        if password != password2:
            raise serializers.ValidationError(
                {"password": "Password and Confirm Password Does not match"}
            )
        if not attrs.get("first_name"):
            raise serializers.ValidationError({"first_name": "First Name is required"})
        if not attrs.get("last_name"):
            raise serializers.ValidationError({"first_name": "First Name is required"})
        return attrs

    def validate_password(self, value):
        validate_password(value, self.instance)
        return value

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            # Check if a user with the given email exists
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError(
                    {"error": "No user found with this email."}
                )

            # Check if the provided password matches the user's password
            if user and not user.check_password(password):
                raise serializers.ValidationError(
                    {"error": "Invalid email/password combination."}
                )

            # Check if the user is verified
            if user and not user.is_verified:
                raise serializers.ValidationError(
                    {"error": "Account not verified. Please verify your email."}
                )

            user = authenticate(email=email, password=password)
            if user and user.is_verified:
                refresh = RefreshToken.for_user(user)
                if user.is_customer:
                    user_type = "customer"
                elif user.is_owner:
                    user_type = "restaurant"
                elif user.is_staff:
                    user_type = "admin"
                else:
                    user_type = "unknown"
                return {
                    "email": email,
                    "username": user.username,
                    "full_name": f"{user.first_name} {user.last_name}",
                    "user_type": user_type,
                    "tokens": {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    },
                }
        else:
            raise serializers.ValidationError("Both email and password are required.")


class CreateCustomerSerializer(serializers.ModelSerializer):
    user = UserRegisterSerializer()

    class Meta:
        model = Customer
        fields = ["user"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        # Generate username from the first and last name
        first_name = user_data.get("first_name")
        last_name = user_data.get("last_name")
        base_username = f"{first_name.lower()}_{last_name.lower()}"

        # Ensure the username is unique
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1

        user_data["username"] = username

        user = User.objects.create_user(**user_data, is_customer=True)
        customer = Customer.objects.create(user=user, **validated_data)
        return customer


class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = "__all__"
        # fields = ['id', 'customer_id', 'user', 'address', 'city', 'state', 'post_code', 'phone_number', 'avatar']
        # exclude = ["user"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", None)
        if user_data:
            # Update user fields (modify as needed based on your User model)
            instance.user.username = user_data.get("username", instance.user.username)
            instance.user.first_name = user_data.get(
                "first_name", instance.user.first_name
            )
            instance.user.last_name = user_data.get(
                "last_name", instance.user.last_name
            )

            instance.user.save()
        print(self.data)

        if "avatar" in validated_data:
            avatar_url = validated_data["avatar"]
            if isinstance(avatar_url, str) and avatar_url.startswith("http"):
                # Existing avatar URL - keep it
                pass
            else:
                # New file upload - update avatar field
                instance.avatar = avatar_url
                instance.save()

        # Update other fields normally
        return super().update(instance, validated_data)


class RestaurantSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Restaurant
        fields = "__all__"
        
class RestaurantWithMenuSerializer(serializers.ModelSerializer):
    menu_items = MenuItemSerializer(many=True, read_only=True)
    user = UserSerializer()

    class Meta:
        model = Restaurant
        fields = '__all__'

class CreateRestaurantSerializer(serializers.ModelSerializer):
    user = UserRegisterSerializer()

    class Meta:
        model = Restaurant
        fields = [
            "user",
            "store_name",
            "brand_name",
            "description",
            "phone_number",
            "website",
            "address_line1",
            "address_line2",
            "postcode",
            "city",
        ]

    def validate(self, attrs):
        if not attrs.get("store_name"):
            raise serializers.ValidationError({"store_name": "Store name is required"})
        if not attrs.get("brand_name"):
            raise serializers.ValidationError({"brand_name": "Brand name is required"})
        return attrs

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        # Generate username from the restaurant's name
        store_name = validated_data.get("store_name")
        base_username = f"{store_name.lower().replace(' ', '_')}"

        # Ensure the username is unique
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1

        user_data["username"] = username

        user = User.objects.create_user(**user_data, is_owner=True)
        restuarant = Restaurant.objects.create(user=user, **validated_data)
        return restuarant


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            recipient_name = user.first_name + " " + user.last_name
            uuid64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request = self.context.get("request")
            site_domain = "localhost:8080/auth"
            relative_link = reverse(
                "reset-password", kwargs={"uidb64": uuid64, "token": token}
            )
            absolute = f"http://{site_domain}{relative_link}"
            html_content = render_to_string(
                "password_reset_email.html",
                {"recipient_name": recipient_name, "absolute_link": absolute},
            )
            data = {
                "email_body": html_content,
                "to_email": user.email,
                "email_subject": "Password Reset Instructions for Tasty Tracks",
            }
            send_normal_email(data)

        return super().validate(attrs)


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password = serializers.CharField(
        max_length=100, min_length=6, write_only=True
    )
    uidb64 = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    class Meta:
        fields = ["password", "confirm_password", "uidb64", "token"]

    def validate(self, attrs):
        try:
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")
            password = attrs.get("password")
            confirm_password = attrs.get("confirm_password")

            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)
            recipient_name = user.first_name + " " + user.last_name
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("The reset link is invalid or expired", 401)
            if password != confirm_password:
                raise AuthenticationFailed("Passwords do not match")
            user.set_password(password)
            user.save()

            html_content = render_to_string(
                "password_reset_complete_email.html",
                {"recipient_name": recipient_name},
            )
            data = {
                "email_body": html_content,
                "to_email": user.email,
                "email_subject": "Password Changed Successfully: Your Account Is Secure",
            }
            send_normal_email(data)

            return user
        except Exception as e:
            raise AuthenticationFailed("The reset link is invalid or expired", 401)


class LogoutUserSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    defualt_error_message = {"bad_token": ("Token is expired or invalid")}

    def validate(self, attrs):
        self.token = attrs.get("refresh_token")
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            return self.fail("bad_token")
