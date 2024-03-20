from django.shortcuts import render, redirect
from rest_framework import viewsets, status
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import *
from . serializers import *
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import stripe

User = get_user_model()
stripe.api_key = settings.STRIPE_SECRET_KEY

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:8000/"
    client_class = OAuth2Client

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class CheckView(APIView):
    def get(self, request):
        user = request.user
        print(user)
        return Response({"user": request.user.email})

def email_confirmation(request, key):
    return redirect(f"http://localhost:8000/dj-rest-auth/registration/account-confirm-email/{key}")

def reset_password_confirm(request, uid, token):
    return redirect(f"http://localhost:8000/reset-password/confirm/{uid}/{token}")

# apis

class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

class OrderView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        orders = Order.objects.filter(uid = user).order_by('-id')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        product = Product.objects.filter(id = request.data['pid']).first()
        price = product.price
        request.data['total'] = int(request.data['quantity']) * price
        serializer = OrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uid=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderUpdateView(APIView):
    def post(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
            serializer = OrderCreateSerializer(instance=order, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Order.DoesNotExist:
            return Response({"message": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

class SubcategoriesApiView(APIView):
    def get(self, request, id, *args, **kwargs):
        category = Category.objects.filter(id=id).first()
        sub_categories = SubCategory.objects.filter(category=category)
        serializer = SubCategorySerializer(sub_categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PaymentIntentView(APIView):
    def post(self, request, *args, **kwargs):
        amount = request.data.get('amount')
        try:
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='usd'
            )
            return Response({'clientSecret': intent.client_secret})
        except Exception as e:
            return Response({'error': str(e)}, status=500)
