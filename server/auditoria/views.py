import uuid
from datetime import datetime

from django.core.files.base import ContentFile
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models import Pregunta, Auditoria, Respuesta, Media, Incidente, Sucursal
from auditoria.serializers import PreguntaSerializer, AuditoriaSerializer, RespuestaSerializer, \
    MediaSerializer, RespuestaMultimediaSerializer, IncidenteSerializer, MinRespuestaSerializer
from base64 import b64decode
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404

# Recordar que fue seteada la autenticacion por token por default rest_framework.permissions.IsAuthenticated


class AuditoriaViewSet(viewsets.ModelViewSet):
    queryset = Auditoria.objects.all()
    serializer_class = AuditoriaSerializer

    def create(self, request):
        serializer = AuditoriaSerializer(data=request.data)
        if serializer.is_valid():
            sucursal = serializer.validated_data.get('sucursal')

            # Ultimo responsable cuando se hace la auditoria.
            sucursal = get_object_or_404(Sucursal, id=sucursal.id)
            sucursal.ultimo_responsable = request.user
            sucursal.save()

            is_auditoria = Auditoria.objects.filter(sucursal=sucursal, finalizada=False).exists()

            if is_auditoria:
                auditoria = Auditoria.objects.filter(sucursal__exact=sucursal) \
                                             .order_by('-fecha_creacion')[0]

                serializer2 = AuditoriaSerializer(auditoria, many=False)
                return Response(serializer2.data, status=status.HTTP_201_CREATED)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # todo fijarse ese serialize
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['GET'], detail=True)
    def respuestas(self, request, pk):
        # Check if Auditoria exists.
        auditoria = get_object_or_404(Auditoria, id=pk)

        respuestas = Respuesta.objects.filter(auditoria__exact=pk)
        serializer = MinRespuestaSerializer(respuestas, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['GET'], detail=True)
    def resultado(self, request, pk):
        # Check if Auditoria exists.
        auditoria = get_object_or_404(Auditoria, id=pk)

        respuestas = Respuesta.objects.filter(auditoria__exact=pk)
        preguntas = Pregunta.objects.all()

        auditoria.finalizada = len(preguntas) == len(respuestas)

        preguntas_digefe = [p for p in preguntas if p.categoria == 'DIGEFE']

        aprobada = True
        for preg in preguntas_digefe:
            respuesta = next((r for r in respuestas if r.pregunta.id == preg.id), None)
            if not respuesta or preg.respuesta_correcta != respuesta.respuesta:
                aprobada = False

        auditoria.aprobada = aprobada
        auditoria.save()

        serializer = AuditoriaSerializer(auditoria, many=False)
        return Response(serializer.data)


class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer

    @action(methods=['get'], detail=True)
    def seccion(self, request, pk=None):
        Preguntas = Pregunta.objects.filter(seccion__exact=pk)
        return Response([(Pregunta.pregunta, Pregunta.id) for Pregunta in Preguntas])


class RespuestaViewSet(viewsets.ModelViewSet):
    queryset = Respuesta.objects.all()
    serializer_class = RespuestaSerializer

    def create(self, request):
        audio = request.data.get("audio")
        data = request.data

        datos = data.copy()
        if audio is not None:
            audio = audio.replace('data:audio/mpeg;base64,', '')
            audio_data = b64decode(audio)
            nombre_audio = str(datetime.now())  # todo: cambiar nombre

            datos['audio'] = ContentFile(content=audio_data, name=f'{nombre_audio}.mp3')

        datos['usuario'] = request.user.id
        serializer = RespuestaSerializer(data=datos)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer


class IncidenteViewSet(viewsets.ModelViewSet):
    queryset = Incidente.objects.all()
    serializer_class = IncidenteSerializer

    def create(self, request):
        datosSerializados = IncidenteSerializer(data=request.data)
        datos = request.data.copy()
        datos["reporta"] = request.user.id
        datos["pregunta"] = request.data.get('pregunta') #obtiene de donde se manda la request
        datos["asignado"] = request.data.get('asignado') #obtiene del audio
        datos["accion"] = request.data.get('accion')   #obtiene del audio
        datos["sucursal"] = request.data.get('sucursal')   #obtiene de donde se manda la request
        return Response(datos.data, status=status.HTTP_201_CREATED)

    def update(self, request):
        datosSerializados = IncidenteSerializer(data=request.data)
        datos = request.data.copy()
        datos["reporta"] = request.data.get('reporta')
        datos["pregunta"] = request.data.get('pregunta')
        datos["asignado"] = request.data.get('asignado')
        datos["accion"] = request.data.get('accion')
        return Response(datos.data, status=status.HTTP_201_CREATED)

    def cerrarAuditoria(self):
            incidente = Incidente.objects.filter(id__exact=datosSerializados.validated_data.get('id')) # le van apegar a una url que sea auditoria/cierre/{id}, ese id que pasan va a ser por el cual se filtra
            incidente["aceptado"] = 1
            return #redirecciona a la url para responder la pregunta incidente["pregnta"] en la sucursal incidente["sucursal"]

class RespuestaConAudio(RespuestaViewSet, viewsets.ModelViewSet):
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
