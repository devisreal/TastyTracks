from django.shortcuts import render
from rest_framework import viewsets
from menu.models import MenuCategory, MenuItem
from menu.api.serializers import (
    MenuCategorySerializer,
    MenuItemSerializer,    
)
from users.api.permissions import IsAdminOrReadOnly, IsOwner
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    IsAdminUser,
)
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from rest_framework.decorators import action


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
    lookup_field = 'slug'
    # permission_classes = [IsOwner]
    # parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        # Assign the restaurant to the menu item being created
        serializer.save(restaurant=self.request.user.restaurant)        
        
    @action(detail=False, methods=['get'])
    def by_restaurant(self, request):
        # Retrieve menu items for the restaurant of the logged-in user
        queryset = self.queryset.filter(restaurant=request.user.restaurant)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class MenuItemListAPIView(generics.ListAPIView):
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        queryset = MenuItem.objects.all()

        # Check if 'sort' query parameter is provided
        sort_param = self.request.query_params.get('sort')
        if sort_param:
            # Sort queryset by price (ascending or descending)
            if sort_param == 'asc':
                queryset = queryset.order_by('price')
            elif sort_param == 'desc':
                queryset = queryset.order_by('-price')

        return queryset