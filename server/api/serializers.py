from rest_framework import serializers

from api.models import Sucursal, AuditoriaEsquema, Usuario, Auditoria, Pregunta, Respuesta, Media


class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

    """
    Representation:
    
    SucursalSerializers():
        id = IntegerField(label='ID', read_only=True)
        nombre = CharField(max_length=50, style={'base_template': 'textarea.html'})
        direccion = CharField(max_length=100, style={'base_template': 'textarea.html'})
        telefono = CharField(max_length=50, style={'base_template': 'textarea.html'}, validators=[<UniqueValidator(queryset=Sucursal.objects.all())>])
        esta_habilitado = BooleanField(required=False)
        ciudad = CharField(max_length=40, style={'base_template': 'textarea.html'})
        coord_lat = FloatField(allow_null=True, required=False)
        coord_ing = FloatField(allow_null=True, required=False)
        fecha_creacion = DateTimeField(read_only=True)
        fecha_modificacion = DateTimeField(read_only=True)
    """


class AuditoriaEsquemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditoriaEsquema
        fields = '__all__'
    """
    Representation:
    
    AuditoriaEsquemaSerializers():
        id = IntegerField(label='ID', read_only=True)
        nombre = CharField(max_length=255, style={'base_template': 'textarea.html'})
        fecha_creacion = DateTimeField(read_only=True)
        fecha_modificacion = DateTimeField(read_only=True)
        tipo = IntegerField()
    """


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class AuditoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auditoria
        fields = '__all__'


class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = '__all__'


class RespuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respuesta
        fields = '__all__'


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'
