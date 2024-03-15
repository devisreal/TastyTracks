from rest_framework import serializers
from menu.models import MenuItem
from orders.models import CartItem
from menu.api.serializers import MenuItemSerializer


class CartItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer()

    class Meta:
        model = CartItem
        fields = ["id", "cart", "menu_item", "quantity"]
