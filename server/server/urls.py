from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sucursales/', include('sucursal.urls')),
    path('api/auditorias/', include('auditoria.urls')),
    path('api/login/', include('api.urls'))
]
