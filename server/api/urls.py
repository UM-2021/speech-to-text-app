from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path

from api.views import SucursalViewSet

urlpatterns = [
    path('sucursal/', SucursalViewSet.as_view(), name='sucursal'),
]
