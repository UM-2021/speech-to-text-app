from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


from upload.views import image_upload

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", image_upload, name="upload"),
    path('api/sucursales/', include('sucursal.urls')),
    path('api/auditorias/', include('auditoria.urls')),
    path('api/login/', include('api.urls'))
]

if bool(settings.DEBUG):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)