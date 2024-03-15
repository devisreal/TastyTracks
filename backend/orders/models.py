from django.db import models
from users.models import User
from menu.models import MenuItem
import uuid
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


# Create your models here.


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"Cart: {self.user.first_name} {self.user.last_name}"


class CartItem(models.Model):
    menu_item = models.ForeignKey(
        MenuItem, on_delete=models.CASCADE, related_name="items"
    )
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="cartitems")
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.menu_item.name} x {self.quantity} by {self.cart.user.first_name} {self.cart.user.last_name}"

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #     # Update the total price of the associated cart
    #     cart_items = self.cart.cartitems.all()
    #     total_price = sum(item.menu_item.price * item.quantity for item in cart_items)
    #     self.cart.total_price = total_price
    #     self.cart.save()


@receiver(post_save, sender=CartItem)
@receiver(post_delete, sender=CartItem)
def update_cart_total_price(sender, instance, **kwargs):
    cart = instance.cart
    cart.total_price = sum(
        item.quantity * item.menu_item.price for item in cart.cartitems.all()
    )
    cart.save()
