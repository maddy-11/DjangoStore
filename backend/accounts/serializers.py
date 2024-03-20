from rest_framework import serializers
from .models import *
from django.conf import settings

from django.contrib.auth import get_user_model
User = get_user_model()

class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model= Product
		fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model= User
		fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
	pid = ProductSerializer()
	uid = UserSerializer()

	class Meta:
		model = Order
		fields = '__all__'

class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class OrderListSerializer(serializers.ModelSerializer):
	class Meta:
		model= OrderList
		fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model= Category
		fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):
	class Meta:
		model= SubCategory
		fields = '__all__'