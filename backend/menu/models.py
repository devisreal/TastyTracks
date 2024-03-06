from django.db import models
from autoslug import AutoSlugField
from django.template.defaultfilters import slugify
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
from django.db import models
from users.models import Restaurant, Customer


class MenuCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = AutoSlugField(unique=True, populate_from="name", sep="-", null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Menu Category"
        verbose_name_plural = "Menu Categories"


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
    calories = models.IntegerField(blank=True, null=True)
    ingredients = models.TextField(blank=True, null=True)
    avg_rating = models.FloatField(default=0)
    number_rating = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(
        default=False, verbose_name="Avaialibilty Status", blank=True, null=True
    )
    is_promoted = models.BooleanField(default=False, verbose_name="Promotion Status")
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Menu Item"
        verbose_name_plural = "Menu Items"


class MenuItemImage(models.Model):
    menu_item = models.ForeignKey(
        MenuItem, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="menu_item_images", max_length=255)

    def __str__(self):
        return (
            f"Image for {self.menu_item.name} of {self.menu_item.restaurant.store_name}"
        )

    class Meta:
        verbose_name = "Menu Image"
        verbose_name_plural = "Menu Images"


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
