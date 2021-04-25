from django.views.decorators.csrf import csrf_exempt

from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'pregunta', views.PreguntaViewSet)
router.register(r'respuesta', views.RespuestaConAudio, 'respuesta')

app_name = 'auditoria'

urlpatterns = [
    path('', include(router.urls))
]
