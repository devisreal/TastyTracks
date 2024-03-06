from django.urls import path, include
from rest_framework import routers
from menu.api.views import MenuCategoryViewSet

router = routers.DefaultRouter()
router.register('category', MenuCategoryViewSet, basename='menu-category' )

urlpatterns = [
    path("", include(router.urls)),
]