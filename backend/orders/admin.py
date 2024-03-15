from django.contrib import admin
from orders.models import *

admin.site.register(CartItem)
# admin.site.register(Cart)


@admin.register(Cart)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "get_fullname",
        "total_price",
        "completed",
    )
    list_filter = ["completed", "user"]

    list_editable = ("completed",)

    # ordering = ["id", "-first_name"]
    def get_fullname(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

    get_fullname.short_description = "User Fullname"
