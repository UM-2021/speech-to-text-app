from django.urls import path

from . import views

urlpatterns = [
    path('example-public', views.public),
    path('example-private', views.private)
]
