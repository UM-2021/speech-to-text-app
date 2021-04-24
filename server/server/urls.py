from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sucursal/', include('sucursal.urls')),
    path('api/auditoria/', include('auditoria.urls')),
]
