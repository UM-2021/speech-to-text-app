from django.views.decorators.csrf import csrf_exempt

from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('auditoria', views.AuditoriaViewSet)
router.register('pregunta', views.PreguntaViewSet)
router.register('respuesta', views.RespuestaViewSet)
router.register('media', views.MediaViewSet)
# router.register(r'usuario', views.UsuarioViewSet)
# router.register(r'enviar-respuesta', views.RespuestaConAudio)

app_name = 'auditoria'

urlpatterns = [
    path('', include(router.urls))
]
