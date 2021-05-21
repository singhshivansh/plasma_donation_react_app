from django.contrib import admin
from django.urls import path, include

from . import views

from rest_framework import routers
from rest_framework.authtoken.views import ObtainAuthToken

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
# router.register('donors', views.DonorViewSet.as_view())

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', ObtainAuthToken.as_view()),
    path('donors/', views.DonorView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('get_current_user/', views.Get_User.as_view()),
    #APIs
]