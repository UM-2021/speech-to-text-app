from django.conf.urls import url, include
from django.contrib import admin

from .views import (
    AuditoriaList,
    AuditoriaCreation,
    AuditoriaDetail,
    AuditoriaUpdate,
    AuditoriaDelete,
    SucursalList,
    SucursalCreation,
    SucursalDetail,
    SucursalUpdate,
    SucursalDelete,
)

urlpatterns = [

    url(r'^$', AuditoriaList.as_view(), name='list'),
    url(r'^(?P<pk>\d+)$', AuditoriaDetail.as_view(), name='detail'),
    url(r'^nuevo$', AuditoriaCreation.as_view(), name='new'),
    url(r'^editar/(?P<pk>\d+)$', AuditoriaUpdate.as_view(), name='edit'),
    url(r'^borrar/(?P<pk>\d+)$', AuditoriaDelete.as_view(), name='delete'),

    url(r'^$', SucursalList.as_view(), name='list'),
    url(r'^(?P<pk>\d+)$', SucursalDetail.as_view(), name='detail'),
    url(r'^nuevo$', SucursalCreation.as_view(), name='new'),
    url(r'^editar/(?P<pk>\d+)$', SucursalUpdate.as_view(), name='edit'),
    url(r'^borrar/(?P<pk>\d+)$', SucursalDelete.as_view(), name='delete'),

]