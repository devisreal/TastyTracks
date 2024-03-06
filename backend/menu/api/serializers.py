from rest_framework import serializers
from menu.models import MenuCategory, MenuItem, MenuItemImage


class MenuCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuCategory
        fields = "__all__"
        lookup_field = "slug"


class MenuItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemImage
        fields = ("image",)


class MenuItemSerializer(serializers.ModelSerializer):
    images = MenuItemImageSerializer(many=True, read_only=True)

    class Meta:
        model = MenuItem
        fields = "__all__"
