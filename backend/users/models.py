import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from autoslug import AutoSlugField
from django.template.defaultfilters import slugify
from users.managers import CustomerManager, CustomUserManager, RestaurantManager


# def get_upload_path(instance, filename):
#     return os.path.join('images', 'avatars', str(instance.user.pk))


class User(AbstractUser):
    is_customer = models.BooleanField(default=False, verbose_name="Customer Status")
    is_owner = models.BooleanField(default=False, verbose_name="Restaurant Status")
    is_verified = models.BooleanField(default=False, verbose_name="Verfication Status")
    email = models.EmailField(blank=False, null=False, unique=True)
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    slug = AutoSlugField(unique=True, populate_from="username", sep="-", null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.username)
        super().save(*args, **kwargs)


def customer_upload_to(instance, filename):
    return "avatars/{filename}".format(filename=filename)


class Customer(models.Model):
    customer_id = models.UUIDField(default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    post_code = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=15)
    avatar = models.ImageField(upload_to=customer_upload_to, blank=True, null=True)

    objects = CustomerManager()

    def initials(self):
        x = self.user.get_full_name()
        fullname = str(x)
        l = []
        for i in fullname.split(" "):
            l.append(i[0])
        result = ".".join(l) + "."
        return result

    def __str__(self):
        return f"{self.user.username}"


def restaurant_upload_to(instance, filename):
    return "logos/{filename}".format(filename=filename)


class Restaurant(models.Model):
    restaurant_id = models.UUIDField(default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    store_name = models.CharField(max_length=255, verbose_name="Restaurant Store Name")
    brand_name = models.CharField(max_length=255, verbose_name="Restaurant Brand Name")
    description = models.TextField()
    phone_number = models.CharField(max_length=15)
    website = models.URLField(max_length=200, blank=True, null=True)
    postcode = models.CharField(max_length=10)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100, default='United Kingdom')    
    logo = models.ImageField(upload_to=restaurant_upload_to, blank=True, null=True)
    # rating = models.FloatField(null=True, blank=True)
    # delivery_time = models.IntegerField(null=True, blank=True)  # in minutes
    # delivery_fee = models.DecimalField(
    #     max_digits=6, decimal_places=2, null=True, blank=True
    # )
    # opening_hours = models.CharField(max_length=100, null=True, blank=True)

    objects = RestaurantManager()

    def __str__(self):
        return f"{self.store_name}"


class OneTimePassword(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6, unique=True)

    def __str__(self):
        return f"{self.user.first_name}-passcode"
