from django.shortcuts import render
from rest_framework import viewsets
from menu.models import MenuCategory
from menu.api.serializers import MenuCategorySerializer
from users.api.permissions import IsAdminOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser


class MenuCategoryViewSet(viewsets.ModelViewSet):
    queryset = MenuCategory.objects.all()
    serializer_class = MenuCategorySerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'slug'
