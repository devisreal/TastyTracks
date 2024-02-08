from django.contrib import admin
from users.models import User, Customer, Restaurant


@admin.register(User)
class UserAdmin(admin.ModelAdmin):    
    list_display = ('username','first_name', 'last_name', 'email', 'is_staff', 'is_customer', 'is_owner', 'is_verified')    
    list_filter = ['first_name', 'last_name', 'date_joined', 'is_active']
    search_fields = ['first_name','last_name', 'email']
    ordering = ['id', '-first_name']

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    
    list_display = ['id', 'get_firstname', 'get_lastname', 'get_email', ]
    list_filter = ['id', 'user__first_name', 'user__last_name', 'user__date_joined', 'user__is_active']
    search_fields = ['user__first_name','user__last_name']
    ordering = ['id', '-user__first_name']

    def get_firstname(self, obj):
        return obj.user.first_name
    get_firstname.admin_order_field  = 'firstname'
    get_firstname.short_description = 'Customer First name'

    def get_lastname(self, obj):
        return obj.user.first_name
    get_lastname.admin_order_field  = 'lastname'
    get_lastname.short_description = 'Customer Last name'

    def get_email(self, obj):
        return obj.user.email
    get_email.admin_order_field  = 'firstname'
    get_email.short_description = 'Customer Email'

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'get_email', )
    list_filter = ['id', 'name', 'user__date_joined', 'user__is_active']
    search_fields = ['name','location']
    ordering = ['id', '-name']
    
    def get_email(self, obj):
        return obj.user.email
    get_email.admin_order_field  = 'firstname'
    get_email.short_description = 'Restaurant Email'

    # def get_lastname(self, obj):
    #     return obj.user.first_name
    # get_lastname.admin_order_field  = 'lastname'
    # get_lastname.short_description = 'Customer Last name'

    