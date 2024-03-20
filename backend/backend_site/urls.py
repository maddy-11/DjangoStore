from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import *
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

router = routers.DefaultRouter()
router.register("products", ProductView, basename='product')
router.register("users", UserViewSet, basename='product')
router.register("categories", CategoryViewSet, basename='categories')
router.register("sub-categories", SubCategoryViewSet, basename='subcategories')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/account-confirm-email/<str:key>/', email_confirmation),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('reset/password/confirm/<int:uid>/<str:token>', reset_password_confirm, name="password_reset_confirm"),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('dj-rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('api/checking/', CheckView.as_view(), name='check'),
    path('api/', include(router.urls)),
    path('api/orders/', OrderView.as_view(), name='order-list'),
    path('api/orders/<int:pk>/', OrderUpdateView.as_view(), name='order-detail'),
    path('api/get-sub-categories/<int:id>/', SubcategoriesApiView.as_view(), name='sub-categories'),
    path('api/payment-intent/', PaymentIntentView.as_view(), name='payment_intent'),
    re_path(r'^accounts/', include('allauth.urls'), name='socialaccount_signup'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]
