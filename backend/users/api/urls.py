from django.urls import path, include
from rest_framework import routers
from users.api.views import (
    UserLoginAPIView,
    CreateRestaurantView,
    CreateCustomerView,
    UserList,
    UserDetails,
    VerifyUserEmail,
    PasswordResetConfirmView,
    PasswordResetView,
    SetNewPasswordView,
    LogoutUserView,
)
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()


urlpatterns = [
    path("", include(router.urls)),
    path("login/", UserLoginAPIView.as_view(), name="user-login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "create-restaurant/", CreateRestaurantView.as_view(), name="create-restaurant"
    ),
    path("create-customer/", CreateCustomerView.as_view(), name="create-customer"),
    path("verify-email/", VerifyUserEmail.as_view(), name="verfiy-email"),
    path("users/", UserList.as_view(), name="user-list"),
    path("users/me/", UserDetails.as_view(), name="user-details"),
    path("password-reset/", PasswordResetView.as_view(), name="password-reset"),
    path(
        "password-reset-confirm/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(),
        name="password-reset-confirm",
    ),
    path("set-new-password/", SetNewPasswordView.as_view(), name="set-new-password"),
    path("logout/", LogoutUserView.as_view(), name="logout"),
]
