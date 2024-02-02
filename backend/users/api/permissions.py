from rest_framework import permissions


class IsOwner(permissions.BasePermission):   
   
   def has_permission(self, request, view):
      if request.method in permissions.SAFE_METHODS:
         return True
      else:
         return bool(request.user and request.user.is_owner)
      
class IsCustomer(permissions.BasePermission):   
   
   def has_permission(self, request, view):
      if request.method in permissions.SAFE_METHODS:
         return True
      else:
         return bool(request.user and request.user.is_customer)
      
      

      
      
