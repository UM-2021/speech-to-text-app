from django.urls import path
from . import views

urlpatterns = [
    path('', views.LoginAuthToken.as_view(), name='login')
]
