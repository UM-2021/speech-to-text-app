import { combineReducers } from 'redux';
import { sucursalesReducer, sucursalReducer } from './sucursalesReducer';

export default combineReducers({
	sucursales: sucursalesReducer,
	sucursal: sucursalReducer
});
