import { combineReducers } from 'redux';
import {
  preguntasReducer,
  auditoriaReducer,
  respuestasReducer,
  respuestaReducer,
  auditoriaDetailsReducer,
  sendRespuestasReducer,
<<<<<<< HEAD
=======
  getAuditoriasReducer,
>>>>>>> 749ff69236f92e5b2ddfcc15e474cc1fafb6e763
} from './auditoriasReducer';
import { authReducer } from './authReducer';
import { sucursalesReducer, sucursalReducer } from './sucursalesReducer';
import {
  incidentesReducer,
  incidenteDetailsReducer,
} from './incidentesReducer';

export default combineReducers({
  sucursales: sucursalesReducer,
  sucursal: sucursalReducer,
  auditoria: auditoriaReducer,
  auditoriaDetails: auditoriaDetailsReducer,
  preguntas: preguntasReducer,
  respuestas: respuestasReducer,
  respuesta: respuestaReducer,
  sendRespuestas: sendRespuestasReducer,
  auth: authReducer,
<<<<<<< HEAD
  incidentes: incidentesReducer,
  incidente: incidenteDetailsReducer,
=======
  auditorias: getAuditoriasReducer,
>>>>>>> 749ff69236f92e5b2ddfcc15e474cc1fafb6e763
});
