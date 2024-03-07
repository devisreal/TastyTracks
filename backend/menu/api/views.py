from django.shortcuts import render
from rest_framework import viewsets
from menu.models import MenuCategory, MenuItem, MenuItemImage
from menu.api.serializers import (
    MenuCategorySerializer,
    MenuItemSerializer,
    MenuItemImageSerializer,
)
from users.api.permissions import IsAdminOrReadOnly, IsOwner
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    IsAdminUser,
)
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser


class MenuCategoryViewSet(viewsets.ModelViewSet):
    queryset = MenuCategory.objects.all()
    serializer_class = MenuCategorySerializer
    # permission_classes = [IsAdminUser]
    lookup_field = "slug"

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # Get associated menu items and serialize them
        menu_items = instance.menu_items.all()  # Replace with the actual related name
        menu_item_serializer = MenuItemSerializer(
            menu_items, many=True, context={"request": request}
        )

        # Include serialized menu items in the response data
        response_data = serializer.data
        response_data["menu_items"] = menu_item_serializer.data

        return Response(response_data)


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    # permission_classes = [IsOwner]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        # Assign the restaurant to the menu item being created
        serializer.save(restaurant=self.request.user.restaurant)
        
        images_data = self.request.FILES.getlist('images')  # Get list of uploaded images
        menu_item = serializer.instance  # Get the created MenuItem instance
        
        for image_data in images_data:
            MenuItemImage.objects.create(menu_item=menu_item, image=image_data)


class MenuItemImageViewSet(viewsets.ModelViewSet):
    queryset = MenuItemImage.objects.all()
    serializer_class = MenuItemImageSerializer
    permission_classes = [IsOwner]
