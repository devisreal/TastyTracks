from rest_framework import serializers
from menu.models import MenuCategory, MenuItem, MenuItemImage
from users.models import Restaurant

# category = serializers.HyperlinkedRelatedField(
#     view_name='menu-category-detail',  # Change to the actual view name
#     queryset=MenuCategory.objects.all(),  # Replace with your queryset
#     lookup_field='slug'  # Change to the actual lookup field in MenuCategory
# )

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class MenuCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuCategory
        fields = "__all__"
        lookup_field = "slug"


class MenuItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemImage
        fields = ["id", "image"]


# class MenuItemImageListSerializer(serializers.ListSerializer):
#     child = MenuItemImageSerializer()


class MenuItemSerializer(serializers.ModelSerializer):
    images = MenuItemImageSerializer(many=True, required=False)
    category = serializers.SlugRelatedField(
        queryset=MenuCategory.objects.all(),
        slug_field="slug",  # Assuming 'slug' is the field used for the category
    )
    # restaurant = serializers.CharField(source="restaurant.name", read_only=True)
    restaurant = serializers.StringRelatedField(read_only=True)


    class Meta:
        model = MenuItem
        fields = [
            "id",
            "name",
            "restaurant",
            "description",
            "price",
            "category",
            "is_vegetarian",
            "is_vegan",
            "is_gluten_free",
            "allergens",
            "cook_time",
            "calories",
            "ingredients",
            "avg_rating",
            "number_rating",
            "is_available",
            "is_promoted",
            "images",
        ]
