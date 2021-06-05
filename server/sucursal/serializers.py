from rest_framework import serializers
from api.models import Sucursal


class SucursalSerializer(serializers.ModelSerializer):
    ultimo_responsable = serializers.ReadOnlyField(source='ultimo_responsable.username')
    class Meta:
        model = Sucursal
        fields = '__all__'
