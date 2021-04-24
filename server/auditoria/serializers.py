from rest_framework import serializers


from api.models import AuditoriaEsquema, Usuario, Auditoria, Pregunta, Respuesta, Media


class AuditoriaEsquemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditoriaEsquema
        fields = '__all__'
    """
    Representacion de lo que seria:
    
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
