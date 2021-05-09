import { combineReducers } from 'redux';
import { preguntasReducer, auditoriaReducer, respuestasReducer } from './auditoriasReducer';
import { sucursalesReducer, sucursalReducer } from './sucursalesReducer';

export default combineReducers({
	sucursales: sucursalesReducer,
	sucursal: sucursalReducer,
	auditoria: auditoriaReducer,
	preguntas: preguntasReducer,
	respuestas: respuestasReducer
});
