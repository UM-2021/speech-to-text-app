from django.urls import include, path
from . import views

app_name = 'sucursal'

urlpatterns = [
    path('sucursal/', views.SucursalViewSet)
]
