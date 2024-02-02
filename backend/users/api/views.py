from rest_framework.views import APIView
from users.models import User
from users.api.serializers import CustomerSerializer, RestaurantSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from users.api.permissions import IsCustomer, IsOwner
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken



class CreateRestaurantView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RestaurantSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            restaurant = serializer.save()
            
            data['response'] = "Registration Successful!"
            data['username'] = restaurant.user.username
            data['email'] = restaurant.user.email
            data['slug'] = restaurant.user.slug
            data['name'] = restaurant.name
            data['is_owner'] = restaurant.user.is_owner            
            
            refresh = RefreshToken.for_user(restaurant.user)
            data['token'] = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
            
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

    
class CreateCustomerView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CustomerSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            customer = serializer.save()
            
            data['response'] = "Registration Successful!"
            data['username'] = customer.user.username
            data['email'] = customer.user.email
            data['slug'] = customer.user.slug
            data['first_name'] = customer.user.first_name
            data['last_name'] = customer.user.last_name
            data['is_customer'] = customer.user.is_customer            
            
            refresh = RefreshToken.for_user(customer.user)
            data['token'] = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
            
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(APIView):
    permission_classes = [IsAdminUser, IsAuthenticated]
    
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
        