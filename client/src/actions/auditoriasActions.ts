import axiosInstance from '../utils/axios';
import {
  CREATE_OR_GET_AUDITORIA_FAILED,
  CREATE_OR_GET_AUDITORIA_REQUEST,
  CREATE_OR_GET_AUDITORIA_SUCCESS,
  FETCH_PREGUNTAS_FAILED,
  FETCH_PREGUNTAS_REQUEST,
  FETCH_PREGUNTAS_SUCCESS,
  FETCH_RESPUESTAS_REQUEST,
  FETCH_RESPUESTAS_SUCCESS,
  FETCH_RESPUESTAS_FAILED,
  RESPUESTAS_RESET,
  SEND_RESPUESTAS_FAILED,
  SEND_RESPUESTAS_REQUEST,
  SEND_RESPUESTAS_SUCCESS,
} from './types';

export const fetchPreguntas = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: FETCH_PREGUNTAS_REQUEST });
    let preguntas = getState().preguntas.preguntas;

    if (!preguntas || preguntas.length === 0) {
      const { data } = await axiosInstance('/api/auditorias/pregunta/', {
        headers: {
          Authorization: `Token ${getState().auth.user.token ?? ''}`,
        },
      });
      preguntas = data;
    }

    dispatch({ type: FETCH_PREGUNTAS_SUCCESS, payload: preguntas });
  } catch (error) {
    dispatch({
      type: FETCH_PREGUNTAS_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchAuditoria = (sucursal: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: CREATE_OR_GET_AUDITORIA_REQUEST });
    const { data } = await axiosInstance.post(
      '/api/auditorias/auditoria/',
      { sucursal },
      {
        headers: { Authorization: `Token ${getState().auth.user.token ?? ''}` },
      }
    );

    dispatch({ type: CREATE_OR_GET_AUDITORIA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_OR_GET_AUDITORIA_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const postRespuestas = () => (dispatch: any, getState: any) => {
  try {
    dispatch({ type: SEND_RESPUESTAS_REQUEST });

    const respuestas = getState().respuestas;
    const user = getState().auth.user;
    const auditoria = getState().auditoria.auditoria.id;

    respuestas.respuestas.forEach(async (r: any) => {
      let resId;
      if (r.respuesta !== null || r.notas !== null) {
        const { data } = await axiosInstance.post(
          '/api/auditorias/respuesta/',
          {
            pregunta: r.pregunta,
            respuesta: r.respuesta,
            auditoria,
            notas: r.notas ? r.notas : null,
            usuario: user.user_id,
          },
          {
            headers: {
              Authorization: `Token ${getState().auth.user.token ?? ''}`,
            },
          }
        );
        resId = data.id;
      }
      if (r.photo !== null)
        await axiosInstance.post(
          `/api/auditorias/respuesta/${resId}/imagen/`,
          {
            imagen: r.photo,
          },
          {
            headers: {
              Authorization: `Token ${getState().auth.user.token ?? ''}`,
            },
          }
        );
    });

    dispatch({ type: SEND_RESPUESTAS_SUCCESS });
    dispatch({ type: RESPUESTAS_RESET });
  } catch (error) {
    dispatch({
      type: SEND_RESPUESTAS_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchRespuestas = (auditoria: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: FETCH_RESPUESTAS_REQUEST });
    const { data } = await axiosInstance(
      `/api/auditorias/auditoria/${auditoria}/respuestas/`,
      {
        headers: { Authorization: `Token ${getState().auth.user.token ?? ''}` },
      }
    );

    dispatch({ type: FETCH_RESPUESTAS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_RESPUESTAS_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
