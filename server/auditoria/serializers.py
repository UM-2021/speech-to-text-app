from rest_framework import serializers
from api.models import Usuario, Auditoria, Pregunta, Respuesta, Media


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


class RespuestaMultimediaSerializer(serializers.Serializer):
    texto = serializers.CharField(style={'base_template': 'textarea.html'})
    audio = serializers.FileField(max_length=255)
    validez = serializers.ChoiceField(choices=(('JR', 'Junior'), ('MID', 'Mid-level'), ('SR', 'Senior')))
    auditoria_id = serializers.PrimaryKeyRelatedField(queryset=Auditoria.objects.all())
    pregunta_id = serializers.PrimaryKeyRelatedField(queryset=Pregunta.objects.all())
    usuario_id = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    tipo = serializers.ChoiceField(choices=(('JR', 'Junior'), ('MID', 'Mid-level'), ('SR', 'Senior')))
    lista_url = serializers.ListField(
        child=serializers.URLField(max_length=255)
    )
