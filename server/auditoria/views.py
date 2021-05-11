from rest_framework import viewsets, status
from rest_framework.response import Response
from api.models import Pregunta, Auditoria, Respuesta, Media, Incidente
from auditoria.serializers import PreguntaSerializer, AuditoriaSerializer, RespuestaSerializer, \
    MediaSerializer, RespuestaMultimediaSerializer, IncidenteSerializer

# Recordar que fue seteada la autenticacion por token por default rest_framework.permissions.IsAuthenticated


class AuditoriaViewSet(viewsets.ModelViewSet):
    queryset = Auditoria.objects.all()
    serializer_class = AuditoriaSerializer


class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer


class RespuestaViewSet(viewsets.ModelViewSet):
    queryset = Respuesta.objects.all()
    serializer_class = RespuestaSerializer


class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer


class IncidenteViewSet(viewsets.ModelViewSet):
    queryset = Incidente.objects.all()
    serializer_class = IncidenteSerializer


class RespuestaConAudio(RespuestaViewSet, viewsets.ModelViewSet):  #todo fIjarse si quedo bien(despues hacer los tests)
    def get_queryset(self):
        return super().get_queryset()

    def create(self, request):
        serializer_global = RespuestaMultimediaSerializer(data=request.data)

        if serializer_global.is_valid():
            # Primero se crea la respuesta
            respuesta_dict = {
                "texto": serializer_global.texto,
                "auditoria": serializer_global.auditoria_id,
                "pregunta": serializer_global.pregunta_id,
                "usuario": serializer_global.usuario_id,
                "validez": serializer_global.validez,
                "audio": serializer_global.audio
            }
            serializer_respuesta = RespuestaSerializer(data=respuesta_dict)
            if not serializer_respuesta.is_valid():
                return Response(serializer_respuesta.errors, status=status.HTTP_400_BAD_REQUEST)
            respuesta_reciente = serializer_respuesta.save()

            # Una vez la respuesta esta creada, hay que crear la media y asociarla a la respuesta recientemente creada.
            media_agregada = []
            for url in serializer_global.lista_url:
                media_dict = {
                    "url": url,
                    "respuesta": respuesta_reciente.id,
                    "tipo": serializer_global.tipo
                }
                serializer_media = MediaSerializer(data=media_dict)
                if not serializer_media.is_valid():
                    # En caso de que la media este mal, hay que eliminar la respuesta creada anteriormente y
                    # todos los onjetos Media anteriores.
                    Respuesta.objects.filter(id=respuesta_reciente.id).delete()
                    for media in media_agregada:
                        Media.objects.filter(id=media.id).delete()
                    return Response(serializer_respuesta.errors, status=status.HTTP_400_BAD_REQUEST)
                serializer_media.save()
                media_agregada.append(serializer_media.data)

            respuesta_con_audio_json = {
                "Detalle": "La siguiente respuesta junto con la correspondiente media fue persisitda correctamente",
                "Respuesta": serializer_respuesta.data,
                "Media": media_agregada,
            }
            return Response(respuesta_con_audio_json, status=status.HTTP_201_CREATED)

        return Response(serializer_global.errors, status=status.HTTP_400_BAD_REQUEST)


class IncidenteViewSet(viewsets.ModelViewSet):
    queryset = Incidente.objects.all()
    serializer_class = IncidenteSerializer
