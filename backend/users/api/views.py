from rest_framework.views import APIView
from users.models import User, Customer, Restaurant
from users.api.serializers import (
    CreateCustomerSerializer,
    CreateRestaurantSerializer,
    UserRegisterSerializer,
    UserLoginSerializer,
    PasswordResetSerializer,
    SetNewPasswordSerializer,
    LogoutUserSerializer,
    CustomerSerializer,
    RestaurantSerializer,
    RestaurantWithMenuSerializer
)
from rest_framework.response import Response
from rest_framework import status
from users.api.permissions import IsCustomer, IsOwner
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from users.utils import send_verification_otp
from rest_framework.generics import GenericAPIView
from users.models import OneTimePassword
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import viewsets
from rest_framework import generics


class UserLoginAPIView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class CreateRestaurantView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CreateRestaurantSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            restaurant = serializer.save()
            send_verification_otp(restaurant.user.email)
            data["response"] = "Successfully created restaurant"
            data["username"] = restaurant.user.username
            data["email"] = restaurant.user.email
            data["full_name"] = (
                f"{restaurant.user.first_name} {restaurant.user.last_name}"
            )
            data["store_name"] = restaurant.store_name

            # refresh = RefreshToken.for_user(restaurant.user)
            # data["token"] = {
            #     "refresh": str(refresh),
            #     "access": str(refresh.access_token),
            # }

            return Response(
                {
                    "data": data,
                    "message": "Thanks for signing up a passcode has be sent to verify your email",
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateCustomerView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CreateCustomerSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            customer = serializer.save()
            send_verification_otp(customer.user.email)

            data["response"] = "Registration Successful!"
            data["username"] = customer.user.username
            data["email"] = customer.user.email
            data["slug"] = customer.user.slug
            data["first_name"] = customer.user.first_name
            data["last_name"] = customer.user.last_name
            data["is_customer"] = customer.user.is_customer

            # refresh = RefreshToken.for_user(customer.user)
            # data["token"] = {
            #     "refresh": str(refresh),
            #     "access": str(refresh.access_token),
            # }
            return Response(
                {
                    "data": data,
                    "message": "Thanks for signing up a passcode has be sent to verify your email",
                },
                status=status.HTTP_201_CREATED,
            )

            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerDetailView(APIView):
    permission_classes = [IsAuthenticated & IsCustomer]

    def get(self, request, format=None):
        user = request.user
        if user.is_authenticated:
            try:
                customer = Customer.objects.get(user=user)
                serializer = CustomerSerializer(customer)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Customer.DoesNotExist:
                return Response(
                    {"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
            )

    def patch(self, request, format=None):
        user = request.user
        if user.is_authenticated:
            try:
                customer = Customer.objects.get(user=user)
                serializer = CustomerSerializer(
                    customer, data=request.data, partial=True
                )
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Customer.DoesNotExist:
                return Response(
                    {"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
            )


class RestaurantDetailView(APIView):
    permission_classes = [IsAuthenticated & IsOwner]

    def get(self, request, format=None):
        user = request.user
        if user.is_authenticated:
            try:
                restaurant = Restaurant.objects.get(user=user)
                serializer = RestaurantSerializer(restaurant)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Restaurant.DoesNotExist:
                return Response(
                    {"error": "Restaurant not found"}, status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
            )


class RestaurantListView(APIView):
    def get(self, request):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

class RestaurantDetail(APIView):   
   def get(self, request, format=None):
      username = request.query_params.get('username', None)
      if username:
         try:
            restaurant = Restaurant.objects.get(user__username=username)
            serializer = RestaurantWithMenuSerializer(restaurant)
            return Response(serializer.data)
         except Restaurant.DoesNotExist:
            return Response({"error": "Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)
      else:
         return Response({"error": "Username parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

class UserList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = UserRegisterSerializer(users, many=True)
        return Response(serializer.data)


class UserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user.slug
        profile = User.objects.get(slug=user)
        serializer = UserRegisterSerializer(profile)
        return Response(serializer.data)


class VerifyUserEmail(GenericAPIView):
    def post(self, request):
        otpcode = request.data.get("otp")
        try:
            user_code_obj = OneTimePassword.objects.get(code=otpcode)
            user = user_code_obj.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response(
                    {"message": "Email verified successfully"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"message": "Code invalid email already verified"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except OneTimePassword.DoesNotExist:
            return Response({"message": "Invalid OTP"})


class PasswordResetView(GenericAPIView):
    serializer_class = PasswordResetSerializer

    def post(self, request):
        email = request.data.get("email")
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(
            {
                "message": "A link to reset your password has been sent to the registered email."
            },
            status=status.HTTP_200_OK,
        )


class PasswordResetConfirmView(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"error": "Token is not valid, please request a new one"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            return Response(
                {
                    "success": True,
                    "message": "Credentials Valid, Please Reset your Password",
                    "uidb64": uidb64,
                    "token": token,
                },
                status=status.HTTP_200_OK,
            )

        except DjangoUnicodeDecodeError:
            return Response(
                {"error": "Token is not valid, please request a new one"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class SetNewPasswordView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {
                "success": True,
                "message": "Password reset successful. Login with new details",
            },
            status=status.HTTP_200_OK,
        )


class LogoutUserView(GenericAPIView):
    serializer_class = LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {"success": True, "message": "Password Reset Success"},
            status=status.HTTP_200_OK,
        )


class TestAuthenticationView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {"msg": "it works"}

        return Response(data, status=status.HTTP_200_OK)
