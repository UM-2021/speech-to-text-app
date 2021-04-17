from rest_framework import serializers
from server.api.models import Sucursal, Auditoria

class SucursalSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = ('id', 'nombre', 'direccion', 'telefono', 'esta_habilitado', 'ciudad', 'coord_lat','coord_ing')
        read_only_fields = ('id')

class AuditoriaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Auditoria
        fields = ('id', 'sucursal_id', 'usuario_id', 'fecha', 'esquema', 'puntuacion')
        read_only_fields = ('id')
