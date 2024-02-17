from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, email, username, first_name, last_name, password=None, **extra_fields
    ):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.is_verified = True
        user.save(using=self._db)
        return user


class CustomerManager(CustomUserManager):
    def create_user(self, email, password, **extra_fields):
        # Create a customer user with the given email and password
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_customer", True)
        extra_fields.setdefault("is_restaurant", False)
        return super().create_user(email, password, **extra_fields)


class RestaurantManager(CustomUserManager):
    def create_user(self, email, password, **extra_fields):
        # Create a restaurant user with the given email and password
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_customer", False)
        extra_fields.setdefault("is_restaurant", True)
        return super().create_user(email, password, **extra_fields)
