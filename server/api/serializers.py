from rest_framework import serializers
from models import AuditoriaEsquema,Pregunta

class AuditoriaEsquemsaSerializer(serializers.ModelSerializer):
    class Meta:
        model=AuditoriaEsquema

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Pregunta  