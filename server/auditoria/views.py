import uuid
from datetime import datetime

from django.core.files.base import ContentFile
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models import Pregunta, Auditoria, Respuesta, Media, Incidente
from auditoria.serializers import PreguntaSerializer, AuditoriaSerializer, RespuestaSerializer, \
    MediaSerializer, RespuestaMultimediaSerializer, IncidenteSerializer
from base64 import b64decode
from django.forms.models import model_to_dict

# Recordar que fue seteada la autenticacion por token por default rest_framework.permissions.IsAuthenticated


class AuditoriaViewSet(viewsets.ModelViewSet):
    queryset = Auditoria.objects.all()
    serializer_class = AuditoriaSerializer


    def create(self, request):
        datosSerializados = AuditoriaSerializer(data=request.data)
        if request.data.get("sucursal") != None:
            if datosSerializados.is_valid():
                if not Auditoria.objects.filter(sucursal__exact=datosSerializados.validated_data.get('sucursal')) is None:#existe auditoria de esa sucursal
                    ultimaAuditoria=Auditoria.objects.filter(sucursal__exact=datosSerializados.validated_data.get('sucursal')).order_by('-fecha_creacion')[0]
                    if not ultimaAuditoria.finalizada: #si la ultima no esta finalizada
                        dict=model_to_dict(ultimaAuditoria)
                        dict['id']=ultimaAuditoria.id    #a ver si esta wea funciona NO FUNCIONA
                        return Response(dict,status=status.HTTP_206_PARTIAL_CONTENT)
                datosSerializados.save()
                return Response(datosSerializados.data, status=status.HTTP_201_CREATED)  #todo fijarse ese serialize
            return Response(datosSerializados.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(datosSerializados.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True)
    def respuestas(self, request, pk=None):
        Respuestas = Respuesta.objects.filter(auditoria__exact=pk)
        Responses =[]

        for respuesta in Respuestas:
            dic=model_to_dict(respuesta)
            dic.pop('audio')
            respuestaSerializada=RespuestaSerializer(data=dic)

            if not respuestaSerializada.is_valid():

                return Response(respuestaSerializada.errors, status=status.HTTP_400_BAD_REQUEST)
            if  respuestaSerializada.is_valid():
                Responses.append(dic)
        return Response(Responses,status=status.HTTP_200_OK)


class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer

    def create(self, request):
        datosSerializados = PreguntaSerializer(data=request.data)
        if request.data.get("pregunta") != None or request.data.get("seccion") != None or request.data.get("categoria") != None or request.data.get("tipo") != None:
            if request.data.get("tipo") == 'opci':
                if request.data.get("opciones") == None:
                    return Response(datosSerializados.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    datos = request.data.copy()
                    datos["opciones"] = request.data.get("opciones").replace(" ", "") #Las opciones que se muestren e las respuestas las sacamos solo separando por coma
                    datosSerializados = PreguntaSerializer(data=datos)
            return Response(datosSerializados.data, status=status.HTTP_201_CREATED)
        return Response(datosSerializados.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True)
    def seccion(self, request,pk=None):
        Preguntas =Pregunta.objects.filter(seccion__exact=pk)
        return Response([(Pregunta.pregunta, Pregunta.id) for Pregunta in Preguntas])


class RespuestaViewSet(viewsets.ModelViewSet):
    queryset = Respuesta.objects.all()
    serializer_class = RespuestaSerializer



    def create(self,request):
        audio1=request.data.get("audio")
        if audio1 != None:
            audio_received = audio1
            clear_audio_data = audio_received.replace('data:audio/mpeg;base64,', '')
            audio_data = b64decode(clear_audio_data)
            nombreAudio= str(datetime.now()) #todo cambiar nombre
            datos=request.data.copy()
            datos['audio']=ContentFile(content=audio_data, name=nombreAudio + '.mp3')
            respuestaSerializada = RespuestaSerializer(data=datos)
        else:
            respuestaSerializada = RespuestaSerializer(data=request.data)

        if respuestaSerializada.is_valid():
            respuestaSerializada.save()
            return Response(respuestaSerializada.data,status=status.HTTP_201_CREATED)
        return Response(respuestaSerializada.errors, status=status.HTTP_400_BAD_REQUEST)




class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer


class IncidenteViewSet(viewsets.ModelViewSet):
    queryset = Incidente.objects.all()
    serializer_class = IncidenteSerializer

    def create(self, request):
        datosSerializados = AuditoriaSerializer(data=request.data)
        if request.data.get("reporta") != None or request.data.get("asignado") != None or request.data.get("pregunta") != None or request.data.get("accion") != None:
            return Response(datosSerializados.data, status=status.HTTP_201_CREATED)
        return Response(datosSerializados.errors, status=status.HTTP_400_BAD_REQUEST)



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


# class IncidenteViewSet(viewsets.ModelViewSet):
#     queryset = Incidente.objects.all()
#     serializer_class = IncidenteSerializer
