from rest_framework import serializers
from models import AuditoriaEsquema, Pregunta


class AuditoriaEsquemsaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditoriaEsquema
        fields=('tipo','nombre')
        read_only_fields=('tipo')

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields=('id','pregunta','categoria','esquema_id')
        read_only_fields=('id')