from django.db import models
from autoslug import AutoSlugField
from django.template.defaultfilters import slugify
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
from django.db import models
from users.models import Restaurant, Customer

import os


def category_image_path(instance, filename):
    category_name = instance.name
    category_name = category_name.lower().replace(" ", "_")
    ext = os.path.splitext(filename)[-1]
    # Construct the new filename
    new_filename = f"{category_name}{ext}"
    return os.path.join("category_images", new_filename)


class MenuCategory(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to=category_image_path, max_length=255)
    slug = AutoSlugField(unique=True, populate_from="name", sep="-", null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Menu Category"
        verbose_name_plural = "Menu Categories"


def menu_image_path(instance, filename):
    # Assuming instance.menu is the ForeignKey to the MenuItem model
    menu_name = instance.name
    menu_store_name = instance.restaurant.store_name
    # Remove spaces and special characters from menu_name and convert to lowercase
    menu_name = menu_name.lower().replace(" ", "_")
    menu_store_name = menu_store_name.lower().replace(" ", "_")
    # Get the file extension
    ext = os.path.splitext(filename)[-1]
    # Construct the new filename
    new_filename = f"{menu_store_name}-{menu_name}{ext}"
    # Return the path where the file will be uploaded
    return os.path.join("menu_images", new_filename)


class MenuItem(models.Model):
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name="menu_items"
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        MenuCategory, on_delete=models.CASCADE, related_name="menu_items"
    )
    image_1 = models.ImageField(upload_to=menu_image_path, max_length=255)
    image_2 = models.ImageField(
        upload_to=menu_image_path, max_length=255, blank=True, null=True
    )
    image_3 = models.ImageField(
        upload_to=menu_image_path, max_length=255, blank=True, null=True
    )
    is_vegetarian = models.BooleanField(
        default=False, verbose_name="Vegeterian Status", blank=True, null=True
    )
    is_vegan = models.BooleanField(
        default=False, verbose_name="Vegan Status", blank=True, null=True
    )
    is_gluten_free = models.BooleanField(
        default=False, verbose_name="Gluten Free Status", blank=True, null=True
    )
    allergens = models.TextField(blank=True, null=True)
    cook_time = models.IntegerField(blank=True, null=True)
    calories = models.FloatField(blank=True, null=True)
    ingredients = models.TextField(blank=True, null=True)
    avg_rating = models.FloatField(default=0)
    number_rating = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(
        default=True, verbose_name="Avaialibilty Status", blank=True, null=True
    )
    is_promoted = models.BooleanField(default=False, verbose_name="Promotion Status")
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    slug = AutoSlugField(unique=True, populate_from="name", sep="-", null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Menu Item"
        verbose_name_plural = "Menu Items"


# def menu_image_path(instance, filename):
#     # Assuming instance.menu is the ForeignKey to the MenuItem model
#     menu_name = instance.menu_item.name
#     menu_store_name = instance.menu_item.restaurant.store_name
#     # Remove spaces and special characters from menu_name and convert to lowercase
#     menu_name = menu_name.lower().replace(" ", "_")
#     menu_store_name = menu_store_name.lower().replace(" ", "_")
#     # Get the file extension
#     ext = os.path.splitext(filename)[-1]
#     # Construct the new filename
#     new_filename = f"{menu_store_name}-{menu_name}{ext}"
#     # Return the path where the file will be uploaded
#     return os.path.join("menu_images", new_filename)


# class MenuItemImage(models.Model):
#     menu_item = models.ForeignKey(
#         MenuItem, on_delete=models.CASCADE, related_name="images"
#     )
#     image = models.ImageField(upload_to=menu_image_path, max_length=255)

#     def __str__(self):
#         return (
#             f"Image for {self.menu_item.name} of {self.menu_item.restaurant.store_name}"
#         )

#     class Meta:
#         verbose_name = "Menu Image"
#         verbose_name_plural = "Menu Images"


class Review(models.Model):
    reviewer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    description = models.CharField(max_length=200, null=True)
    menu_item = models.ForeignKey(
        MenuItem, on_delete=models.Case, related_name="reviews"
    )
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.rating} on {self.menu_item.name} by {self.reviewer}"
