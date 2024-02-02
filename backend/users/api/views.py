from rest_framework.views import APIView
from users.models import User
from users.api.serializers import CustomerSerializer, RestaurantSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from users.api.permissions import IsCustomer, IsOwner
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework_simplejwt.tokens import RefreshToken

# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)

#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }

class CreateRestaurantView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

    
class CreateCustomerView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(APIView):
    permission_classes = [IsAdminUser, IsAuthenticated]
    
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
        