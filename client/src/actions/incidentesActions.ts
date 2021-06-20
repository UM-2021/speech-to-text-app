import axiosInstance from '../utils/axios';
import {
  FETCH_INCIDENTES_FAILED,
  FETCH_INCIDENTES_REQUEST,
  FETCH_INCIDENTES_SUCCESS,
  GET_INCIDENTE_REQUEST,
  GET_INCIDENTE_SUCCESS,
  GET_INCIDENTE_FAILED,
} from './types';

export const fetchIncidentes = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: FETCH_INCIDENTES_REQUEST });
    const { data } = await axiosInstance('/api/auditorias/incidente/', {
      headers: { Authorization: `Token ${getState().auth.user.token ?? ''}` },
    });

    dispatch({ type: FETCH_INCIDENTES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_INCIDENTES_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const incidenteDetails = (id: any) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: GET_INCIDENTE_REQUEST });

    const { data } = await axiosInstance(`/api/auditorias/incidente/${id}/`, {
      headers: { Authorization: `Token ${getState().auth.user.token ?? ''}` },
    });

    dispatch({ type: GET_INCIDENTE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_INCIDENTE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
