from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.contrib.auth.models import User
from django.conf import settings
User = settings.AUTH_USER_MODEL

# Create your models here.
class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name="Email", null=True, unique=True, max_length=100)
    first_name = models.CharField(_("First Name"), max_length=100)
    last_name = models.CharField(_("Last Name"), max_length=100, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['first_name']

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email

class Product(models.Model):
    image = models.ImageField(upload_to='images', null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    description = models.TextField(null=True)
    quantity = models.IntegerField(null=True)
    sizes = models.JSONField(null=True)
    colors = models.JSONField(null=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    pid = models.ForeignKey(Product, on_delete=models.CASCADE)
    uid = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    color = models.CharField(max_length=100, null=True, blank = True)
    size = models.CharField(max_length=100, null=True, blank = True)
    quantity = models.IntegerField(null=True)
    total = models.IntegerField(null=True)
    def __str__(self):
        return self.pid.name

class OrderList(models.Model):
    oid = models.ForeignKey(Order, on_delete=models.CASCADE)
    uid = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.pid.name


class Category(models.Model):
    category = models.CharField(max_length=100, null=True, blank=True)
    class Meta:
        verbose_name_plural = "Categories"
    def __str__(self):
        return self.category

class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    sub_category = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.category.category} - {self.sub_category}"
