from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models import Sucursal, Auditoria
from .serializers import SucursalSerializer
from auditoria.serializers import AuditoriaSerializer


class SucursalViewSet(viewsets.ModelViewSet):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer


    @action(methods=['GET'], detail=True)
    def auditoria(self, request, pk):
        sucursal = get_object_or_404(Sucursal, id=pk)
        auditorias = Auditoria.objects.filter(sucursal=sucursal).order_by('-fecha_modificacion')

        if len(auditorias) == 0:
            return Response({})
        auditoria = auditorias[0]
        serializer = AuditoriaSerializer(auditoria, many=False)
        return Response(serializer.data)


    @action(methods=['get'], detail=False)
    def get_ordering(self, request):
        ultimasAuditorias = Auditoria.objects.order_by('-fecha_modificacion')[:20]
        ultimasSucursales = []
        for i in range(0, len(ultimasAuditorias)):
            print(ultimasAuditorias[i].sucursal)
            ultimasSucursales.append(ultimasAuditorias[i].sucursal)
        return Response([(Sucursal.nombre, Sucursal.id) for Sucursal in ultimasSucursales])
