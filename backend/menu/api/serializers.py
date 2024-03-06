from rest_framework import serializers
from menu.models import MenuCategory, MenuItem

class MenuCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuCategory
        fields = "__all__"
        lookup_field = 'slug'

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = "__all__"
