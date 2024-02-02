from django.urls import path, include
from rest_framework import routers
from users.api.views import CreateRestaurantView, CreateCustomerView, UserList
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
router = routers.DefaultRouter()



urlpatterns = [        
    path('', include(router.urls)),
    path('create-restaurant/', CreateRestaurantView.as_view(), name='create-restaurant'),
    path('create-customer/', CreateCustomerView.as_view(), name='create-customer'),
    path('users/', UserList.as_view(), name='user-list'),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]   