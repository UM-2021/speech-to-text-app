from django.shortcuts import render

# Create your views here.

from django.core.urlresolvers import reverse_lazy

from django.views.generic import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import (
    CreateView,
    UpdateView,
    DeleteView
)

from .models import AuditoriaEsquema, Pregunta


class AuditoriaEsquemaList(ListView):
    model = AuditoriaEsquema


class AuditoriaEsquemaDetail(DetailView):
    model = AuditoriaEsquema


class AuditoriaEsquemaCreation(CreateView):
    model =AuditoriaEsquema
    success_url = reverse_lazy('auditoria_esquema:list')
    fields = ['tipo', 'nombre']


class AuditoriaEsquemaUpdate(UpdateView):
    model = AuditoriaEsquema
    success_url = reverse_lazy('auditoria_esquema:list')
    fields = ['tipo','nombre']


class AuditoriaEsquemaDelete(DeleteView):
    model = AuditoriaEsquema
    success_url = reverse_lazy('auditoria_esquema:list')


class PreguntaList(ListView):
    model = Pregunta


class PreguntaDetail(DetailView):
    model = Pregunta


class PreguntaCreation(CreateView):
    model = Pregunta
    success_url = reverse_lazy('pregunta:list')
    fields = ['pregunta', 'categoria', 'esquema_id']


class PreguntaUpdate(UpdateView):
    model = Pregunta
    success_url = reverse_lazy('pregunta:list')
    fields = ['pregunta', 'categoria', 'esquema_id']


class PreguntaDelete(DeleteView):
    model = Pregunta
    success_url = reverse_lazy('pregunta:list')