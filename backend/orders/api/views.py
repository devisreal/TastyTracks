from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from users.api.permissions import (
    IsCustomer,
    IsOwner,
    IsOwnerOrReadOnly,
    IsCustomerOrReadOnly,
)
from orders.models import CartItem, Cart
from menu.models import MenuItem
from .serializers import CartItemSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CartListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user

        try:
            cart = Cart.objects.get(user=user, completed=False)
        except Cart.DoesNotExist:
            # If the user doesn't have a cart, create an empty one
            return Response({})

        cart_items = CartItem.objects.filter(cart=cart)
        serializer = CartItemSerializer(cart_items, many=True)

        response_data = {
            "id": cart.id,
            "total_price": cart.total_price,
            "cart_items": serializer.data,
            "completed": cart.completed,
        }
        return Response(response_data)


class CartAddItemView(APIView):
    permission_classes = [IsAuthenticated & IsCustomer]

    def post(self, request, format=None):
        menu_item_id = request.data.get("menu_item_id")
        quantity = request.data.get("quantity", 1)

        try:
            menu_item = MenuItem.objects.get(pk=menu_item_id)
        except MenuItem.DoesNotExist:
            return Response(
                {"error": "Menu item not found"}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            cart = Cart.objects.filter(user=request.user, completed=False).first()
            if not cart:
                cart = Cart.objects.create(user=request.user)
        except Cart.MultipleObjectsReturned:
            # Handle the case where multiple incomplete carts are found
            # You can either choose one of them or handle the situation differently
            return Response(
                {"error": "Multiple incomplete carts found"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # Check if the item already exists in the cart
        cart_item, cart_item_created = CartItem.objects.get_or_create(
            cart=cart, menu_item=menu_item, defaults={"quantity": 0}
        )

        # If the cart item exists, update the quantity
        if not cart_item_created:
            cart_item.quantity += quantity
            cart_item.save()
        else:
            cart_item.quantity = quantity
            cart_item.save()

        # Update the cart's total price (assuming price is a field on MenuItem)
        cart.total_price = sum(
            item.quantity * item.menu_item.price for item in cart.cartitems.all()
        )
        cart.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CartItemIncreaseQuantity(APIView):
    permission_classes = [IsAuthenticated & IsCustomer]

    def patch(self, request, cart_item_id, format=None):
        try:
            cart_item = CartItem.objects.get(id=cart_item_id)
            cart_item.quantity += 1
            cart_item.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response(
                {"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CartItemDecreaseQuantity(APIView):
    permission_classes = [IsAuthenticated & IsCustomer]

    def patch(self, request, cart_item_id, format=None):
        try:
            cart_item = CartItem.objects.get(id=cart_item_id)

            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                # Delete the cart item if quantity is 1 or less
                cart_item.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except CartItem.DoesNotExist:
            return Response(
                {"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CartDeleteItemView(APIView):
    permission_classes = [IsAuthenticated & IsCustomer]

    def post(self, request, format=None):
        cart_item_id = request.data.get("cart_item_id")

        try:
            cart_item = CartItem.objects.get(pk=cart_item_id)
        except CartItem.DoesNotExist:
            return Response(
                {"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Delete the cart item
        cart_item.delete()

        return Response(
            {"success": "Item deleted from cart"}, status=status.HTTP_200_OK
        )
