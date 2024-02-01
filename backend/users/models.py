from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, UserManager, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password) 
        user.save(using=self._db)
        return user    

    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")        

        user = self.model(
            email=self.normalize_email(email)
        )        
        user.set_password(password)              
        user.admin = True
        user.staff = True
        user.active = True
        user.save(using=self._db)
        return user

class CustomerManager(CustomUserManager):
    def create_user(self, email, password, **extra_fields):
        # Create a customer user with the given email and password
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_customer', True)
        extra_fields.setdefault('is_restaurant', False)
        return super().create_user(email, password, **extra_fields)

    

class RestaurantManager(CustomUserManager):
    def create_user(self, email, password, **extra_fields):
        # Create a restaurant user with the given email and password
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_customer', False)
        extra_fields.setdefault('is_restaurant', True)
        return super().create_user(email, password, **extra_fields)
        

class User(AbstractUser):
    is_customer = models.BooleanField(default=False)
    is_owner = models.BooleanField(default=False)
    email = models.EmailField(blank=False, null=False, unique=True)
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()    

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)    
    address = models.CharField(max_length=255)
    post_code = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=15)

    objects = CustomerManager()

    def __str__(self):
      return f"{self.user.username}"

class Restaurant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=15)
    rating = models.FloatField(null=True, blank=True)
    delivery_time = models.IntegerField(null=True, blank=True)  # in minutes
    delivery_fee = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    opening_hours = models.CharField(max_length=100, null=True, blank=True)

    objects = RestaurantManager()

    def __str__(self):
      return f"{self.name}"