from django.urls import path, include
from rest_framework import routers
from menu.api.views import MenuCategoryViewSet, MenuItemViewSet, MenuItemImageViewSet

router = routers.DefaultRouter()
router.register("category", MenuCategoryViewSet, basename="menu-category")
router.register("menu-items", MenuItemViewSet, basename="menu-items")
router.register("menu-item-images", MenuItemImageViewSet, basename="menu-item-images")

urlpatterns = [
    path("", include(router.urls)),
]
