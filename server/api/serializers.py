from rest_framework import serializers
from server.api.models import Sucursal, Auditoria, AuditoriaEsquema, Pregunta


class SucursalSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = ('id', 'nombre', 'direccion', 'telefono', 'esta_habilitado', 'ciudad', 'coord_lat', 'coord_long')
        read_only_fields = ('id')


class AuditoriaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Auditoria
        fields = ('id', 'sucursal_id', 'usuario_id', 'fecha', 'esquema', 'puntuacion')
        read_only_fields = ('id')


class AuditoriaEsquemsaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditoriaEsquema
        fields = ('tipo', 'nombre')
        read_only_fields = ('tipo')


class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ('id', 'pregunta', 'audio', 'categoria', 'esquema_id')
        read_only_fields = ('id')
