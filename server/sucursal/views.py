from base64 import b64decode
from datetime import datetime

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404

from api.models import Sucursal, Auditoria
from rest_framework.decorators import action
from rest_framework.response import Response
from server import settings
from server.storage_backends import PrivateMediaStorage

from .serializers import SucursalSerializer


# Recordar que fue seteada la autenticacion por token por default rest_framework.permissions.IsAuthenticated


class SucursalViewSet(viewsets.ModelViewSet):
    """
    Un ejemplo de una ViewSet para ver, crear, editar y eliminar Sucursales.

    Comenté todo lo anterior porque esta clase es una gran simplificacion de mucho codigo de arriba.

    Para entender como se hace toda esta magia en tan pocas lineas de código, recomiendo leer lo siguiente:
    Primero esto: https://www.django-rest-framework.org/api-guide/generic-views/
    Segundo esto: https://www.django-rest-framework.org/api-guide/viewsets/

    Pero en criollo, las funciones predeterminadas para un modelo simple (CRUD), se pueden heredar de una combinacion
    particular de clases.
    Siempre se tiene que heredar de GenericAPIView, pero si junto GenericAPIView se hereda tambien de ListModelMixin,
    Se tiene la funcionalidad de llamar un GET para obtener todos los objetos guardados del modelo.
    Lo que es una ModelViewSet es una combinacion de varias MixinClasses, mas particularmente:
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyM odelMixin,
    mixins.ListModelMixin,
    y
    GenericViewSet

    Y esta hecho de forma generica, nosotros solo le pasamos el queryset y el serializer y se puede inferir el resto.

    Yo mañana explico mejor igual, pero de todas formas, lo mejor va a estar explicado en los links que les pase,
    lo lei de ahi y a huevo se entiende.

    Es probable que en el futuro tengamos que meter mano aca, modificar las manera que se crea o edita un modelo,
    pero para arrancar esta bien.
    """
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer

    @action(methods=['get'], detail=False)
    def get_ordering(self,request):
        ultimasAuditorias=Auditoria.objects.order_by('-fecha_modificacion')[:20]
        ultimasSucursales=[]
        for i in range(0,len(ultimasAuditorias)):
            print(ultimasAuditorias[i].sucursal)
            ultimasSucursales.append(ultimasAuditorias[i].sucursal)
        return Response([(Sucursal.nombre,Sucursal.id) for Sucursal in ultimasSucursales])

    @action(methods=['post'], detail=True,)
    def agregar_imagen(self, request, pk):
        queryset = Sucursal.objects.all()
        sucursal = get_object_or_404(queryset, pk=pk)

        imagen = request.data.get("imagen")

        if not imagen:
            return Response({"detail": "Bad Request."}, status=status.HTTP_400_BAD_REQUEST)

        imagen = imagen.replace('data:image/jpeg;base64,', '')
        imagen += '======='
        imagen_data = b64decode(imagen)
        nombre_imagen = "sucursal_" + str(pk) + "_image_" + str(datetime.now()) + '.jpeg'
        file = ContentFile(content=imagen_data, name=nombre_imagen)
        if settings.USE_S3:
            instance = PrivateMediaStorage()
            path = instance.save(f'sucursales/imagenes/{nombre_imagen}', file)
        else:
            path = default_storage.save('files/imagenes/', file)

        sucursal.path_imagen_url = path
        sucursal.save()
        return Response({'respuesta': path}, status=status.HTTP_200_OK)