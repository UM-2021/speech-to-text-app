from rest_framework import viewsets

from api.models import Pregunta
from auditoria.serializers import PreguntaSerializer


class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer
