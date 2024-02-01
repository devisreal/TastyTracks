from rest_framework import serializers
from users.models import User, Customer, Restaurant
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'} , write_only=True)
    
    class Meta:
        model = User
        fields = ['username','slug', 'email', 'password', 'password2', 'first_name', 'last_name', 'is_customer', 'is_owner', 'is_staff', 'is_superuser', 'is_active']
        extra_kwargs = {            
            'email': { 'required': True, 'allow_blank': False },            
            'password': {'write_only': True, 'required': True, 'allow_blank': False, 'min_length': 6}
        }        
    
    def validate(self, attrs):
        password=attrs.get('password')
        password2=attrs.pop('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password Does not match")
        
        if User.objects.filter(email=attrs.get('email')).exists():
            raise serializers.ValidationError({
                'error': 'Email already exists'
            })
            
        return attrs
    
    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as err:            
            raise serializers.ValidationError(list(err.messages))
    
    


class CustomerSerializer(serializers.ModelSerializer):            
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        
        # Generate username from the first and last name
        first_name = user_data.get('first_name')
        last_name = user_data.get('last_name')
        base_username = f"{first_name.lower()}_{last_name.lower()}"
        
        # Ensure the username is unique
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1
        
        user_data['username'] = username
        
        user = User.objects.create_user(**user_data, is_customer=True)
        customer = Customer.objects.create(user=user, **validated_data)
        return customer


class CustomerAvatarSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = ['avatar']
        
    def update(self, instance, validated_data):
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        return instance

class RestaurantSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Restaurant
        fields=['user', 'name', 'description', 'phone_number']

    def create(self, validated_data):
        user_data = validated_data.pop('user')            
        
        # Generate username from the restaurant's name
        name = validated_data.get('name')
        base_username = f"{name.lower().replace(' ', '_')}"
        
        # Ensure the username is unique
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1
        
        
        user_data['username'] = username
        
        user = User.objects.create_user(**user_data, is_owner=True)
        restuarant = Restaurant.objects.create(user=user, **validated_data)
        return restuarant
