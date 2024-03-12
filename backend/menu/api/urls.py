from django.urls import path, include
from rest_framework import routers
from menu.api.views import MenuCategoryViewSet, MenuItemViewSet, MenuItemListAPIView

router = routers.DefaultRouter()
router.register("category", MenuCategoryViewSet, basename="menu-category")
router.register("menu-items", MenuItemViewSet, basename="menu-items")


urlpatterns = [
    path("", include(router.urls)),
    path("all-menu-items/", MenuItemListAPIView.as_view(), name="menu-item-list"),
    path(
        "menu-items/by_restaurant/",
        MenuItemViewSet.as_view({"get": "by_restaurant"}),
        name="menuitems-by-restaurant",
    ),
]
