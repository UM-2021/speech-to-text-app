import { combineReducers } from 'redux';
import {
	preguntasReducer,
	auditoriaReducer,
	respuestasReducer,
	respuestaReducer,
	auditoriaDetailsReducer,
	sendRespuestasReducer
} from './auditoriasReducer';
import { authReducer } from './authReducer';
import { sucursalesReducer, sucursalReducer } from './sucursalesReducer';

export default combineReducers({
	sucursales: sucursalesReducer,
	sucursal: sucursalReducer,
	auditoria: auditoriaReducer,
	auditoriaDetails: auditoriaDetailsReducer,
	preguntas: preguntasReducer,
	respuestas: respuestasReducer,
	respuesta: respuestaReducer,
	sendRespuestas: sendRespuestasReducer,
	auth: authReducer
});
