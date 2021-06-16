import base64
import uuid
from datetime import datetime
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Pregunta, Auditoria, Respuesta, Media, Incidente, Sucursal
from audio.natural_language_processing import split
from auditoria.serializers import PreguntaSerializer, AuditoriaSerializer, RespuestaSerializer, \
    MediaSerializer, RespuestaMultimediaSerializer, IncidenteSerializer, MinRespuestaSerializer
from base64 import b64decode
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404
from audio.speech_to_text import get_transcription
from server.storage_backends import PrivateMediaStorage
from django.core.files.storage import default_storage, FileSystemStorage

# Recordar que fue seteada la autenticacion por token por default rest_framework.permissions.IsAuthenticated
from server import settings


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
                auditoria = Auditoria.objects.filter(sucursal__exact=sucursal).order_by('-fecha_creacion').first()
                serializer2 = AuditoriaSerializer(auditoria, many=False)
                return Response(serializer2.data, status=status.HTTP_201_CREATED)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # todo fijarse ese serialize
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['GET'], detail=True)
    def respuestas(self, request, pk):
        # Check if Auditoria exists.
        auditoria = get_object_or_404(Auditoria, id=pk)

        respuestas = Respuesta.objects.filter(auditoria=auditoria)
        serializer = MinRespuestaSerializer(respuestas, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['GET'], detail=True)
    def resultado(self, request, pk):
        # Check if Auditoria exists.
        auditoria = get_object_or_404(Auditoria, id=pk)

        respuestas = Respuesta.objects.filter(auditoria=auditoria)
        preguntas = Pregunta.objects.all()

        auditoria.finalizada = len(preguntas) == len(respuestas)

        preguntas_digefe = [p for p in preguntas if p.categoria == 'DIGEFE']

        aprobada = True
        for preg in preguntas_digefe:
            respuesta = next((r for r in respuestas if r.pregunta.id == preg.id), None)
            if not respuesta or str(preg.respuesta_correcta).lower() != str(respuesta.respuesta).lower():
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
        serializer = RespuestaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True,)
    def transcribir(self, request, pk=None):
        audio = request.data.get("audio")
        if not audio:
            return Response({"detail": "Bad Request."}, status=status.HTTP_400_BAD_REQUEST)

        audio = audio.replace('data:audio/mpeg;base64,', '')
        audio += '======='
        audio_data = b64decode(audio)
        nombre_audio = "audio_" + str(datetime.now()) + '.mp3'
        file = ContentFile(content=audio_data, name=nombre_audio)

        if settings.DEBUG == 1:
            if settings.USE_S3:
                instance = PrivateMediaStorage()
                path = instance.save(f'audios/debug/{nombre_audio}', file)
            else:
                path = default_storage.save('files/audios/', file)

        try:
            resVector = split(get_transcription(file))
        except:  # no se puedo transcripibr el audio
            return Response("No se puedo procesar el audio", status=status.HTTP_418_IM_A_TEAPOT)

        if settings.USE_S3:
            instance = PrivateMediaStorage()
            path = instance.save(f'audios/{nombre_audio}', file)
        else:
            path = default_storage.save('files/audios/', file)

        if resVector['note'] is not None:
            return Response({'respuesta': resVector['response'], 'notas': resVector['note'], 'url_path': path}, status=status.HTTP_200_OK)
        return Response({'respuesta': resVector['response'], 'url_path': path}, status=status.HTTP_200_OK)


class ImagenView(APIView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(ImagenView, self).dispatch(request, *args, **kwargs)

    @csrf_exempt
    def post(self, request, pk):
        queryset = Respuesta.objects.all()
        respuesta = get_object_or_404(queryset, pk=pk)

        if respuesta.usuario != request.user:
            return Response({"detail": "Unauthorized."}, status=status.HTTP_401_UNAUTHORIZED)

        imagen = request.data.get("imagen")

        if not imagen:
            return Response({"detail": "Bad Request."}, status=status.HTTP_400_BAD_REQUEST)

        imagen = imagen.replace('data:image/jpeg;base64,', '')
        imagen += '======='
        imagen_data = b64decode(imagen)
        nombre_imagen = str(pk) + "_image_" + str(datetime.now()) + '.jpeg'
        file = ContentFile(content=imagen_data, name=nombre_imagen)
        if settings.USE_S3:
            instance = PrivateMediaStorage()
            path = instance.save(f'imagenes/{nombre_imagen}', file)
        else:
            path = default_storage.save('files/imagenes/', file)

        Media.objects.create(url=path, respuesta=respuesta, tipo='Image')
        return Response({'respuesta': path}, status=status.HTTP_200_OK)


class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer


class IncidenteViewSet(viewsets.ModelViewSet):
    queryset = Incidente.objects.all()
    serializer_class = IncidenteSerializer


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
