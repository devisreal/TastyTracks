from django.urls import path, include
from rest_framework import routers
from orders.api.views import (
    CartItemViewSet,
    CartAddItemView,
    CartListView,
    CartDeleteItemView,
    CartItemDecreaseQuantity,
    CartItemIncreaseQuantity,
)

router = routers.DefaultRouter()
router.register("cart-items", CartItemViewSet, basename="cart-items")
# router.register("menu-items", MenuItemViewSet, basename="menu-items")


urlpatterns = [
    path("", include(router.urls)),
    path("cart/add-item/", CartAddItemView.as_view(), name="cart-add-item"),
    path(
        "cart/item/<int:cart_item_id>/increase/",
        CartItemIncreaseQuantity.as_view(),
        name="cart-item-increase",
    ),
    path(
        "cart/item/<int:cart_item_id>/decrease/",
        CartItemDecreaseQuantity.as_view(),
        name="cart-item-decrease",
    ),
    path("cart/delete-item/", CartDeleteItemView.as_view(), name="cart-delete-item"),
    path("cart/me/", CartListView.as_view(), name="customer-cart-list"),
]
