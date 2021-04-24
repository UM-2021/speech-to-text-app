from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

app_name = 'auditoria'

urlpatterns = [
    path('pregunta/', views.PreguntaViewSet),
    path('enviar-respuesta/', csrf_exempt(views.RespuestaConAudio.as_view()), name="enviar-respuesta")
]
