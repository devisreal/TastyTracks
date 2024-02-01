from django.urls import path, include
from rest_framework import routers
from users.api.views import CreateRestaurantView, CreateCustomerView, UserList

router = routers.DefaultRouter()

# router.register(r'customers', CustomerViewset, basename='customers')
# router.register(r'restaurants', RestaurantViewset, basename='restaurants')


urlpatterns = [
    # path('hotels/', HotelList.as_view(), name='hotel-list'),
    # path('hotels/<int:pk>/', HotelDetail.as_view(), name='hotel-detail'),        
    
    path('', include(router.urls)),
    path('create-restaurant/', CreateRestaurantView.as_view(), name='create-restaurant'),
    path('create-customer/', CreateCustomerView.as_view(), name='create-customer'),
    path('users/', UserList.as_view(), name='user-list'),
]   