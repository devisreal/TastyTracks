from rest_framework import permissions


class IsOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_owner)


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return bool(request.user and request.user.is_owner)


class IsCustomer(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_customer)

class IsCustomerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return bool(request.user and request.user.is_customer)

class IsAdminOrReadOnly(permissions.IsAdminUser):

    def has_permission(self, request, view):

        # admin_permission = bool(request.user and request.user.is_staff)
        # return request.method == "GET" or admin_permission

        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return bool(request.user and request.user.is_staff)


# class IsReviewUserOrReadOnly(permissions.BasePermission):

#    def has_object_permission(self, request, view, obj):
#       if request.method in permissions.SAFE_METHODS:
#          return True
#       else:
#          return obj.reviewer == request.user or request.user.is_staff
