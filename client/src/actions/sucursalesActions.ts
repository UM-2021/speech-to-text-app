import axiosInstance from '../utils/axios';
import {
  FETCH_SUCURSALES_FAILED,
  FETCH_SUCURSALES_REQUEST,
  FETCH_SUCURSALES_SUCCESS,
  FETCH_SUCURSAL_FAILED,
  FETCH_SUCURSAL_REQUEST,
  FETCH_SUCURSAL_SUCCESS,
} from './types';

export const fetchSucursales = () => async (dispatch: any, getState: any) => {
	try {
		dispatch({ type: FETCH_SUCURSALES_REQUEST });
		const { data } = await axiosInstance('/api/sucursales/', {
			headers: { Authorization: `Token ${getState().auth.user.token ?? ''}` }
		});

		dispatch({ type: FETCH_SUCURSALES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: FETCH_SUCURSALES_FAILED,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
		});
	}
};

export const fetchSucursal = (id: any) => async (dispatch: any, getState: any) => {
	try {
		dispatch({ type: FETCH_SUCURSAL_REQUEST });

		const { data } = await axiosInstance(`/api/sucursales/${id}/`, {
			headers: { Authorization: `Token ${getState().auth.user.token ?? ''}` }
		});

		dispatch({ type: FETCH_SUCURSAL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: FETCH_SUCURSAL_FAILED,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
		});
	}
};
