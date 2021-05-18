/** @format */

import axios from 'axios';
import {
  CREATE_OR_GET_AUDITORIA_FAILED,
  CREATE_OR_GET_AUDITORIA_REQUEST,
  CREATE_OR_GET_AUDITORIA_SUCCESS,
  FETCH_PREGUNTAS_FAILED,
  FETCH_PREGUNTAS_REQUEST,
  FETCH_PREGUNTAS_SUCCESS,
  RESPUESTAS_RESET,
  SEND_RESPUESTAS_FAILED,
  SEND_RESPUESTAS_REQUEST,
  SEND_RESPUESTAS_SUCCESS
} from './types';

export const fetchPreguntas = () => async (
  dispatch: any,
  getState: any
): Promise<void> => {
  try {
    dispatch({ type: FETCH_PREGUNTAS_REQUEST });
    let preguntas = getState().preguntas.preguntas;

    if (!preguntas || preguntas.length === 0) {
      const { data } = await axios('http://localhost:8000/api/auditorias/pregunta/', {
        headers: { Authorization: `Token ${getState().auth.user.token ?? ''}` }
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
          : error.message
    });
  }
};

export const fetchAuditoria = (sucursal: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: CREATE_OR_GET_AUDITORIA_REQUEST });
    const { data } = await axios.post(
      'http://localhost:8000/api/auditorias/auditoria/',
      { sucursal },
      {
        headers: { Authorization: `Token ${getState().auth.user.token ?? ''}` }
      }
    );

    dispatch({ type: CREATE_OR_GET_AUDITORIA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_OR_GET_AUDITORIA_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const postRespuestas = () => (dispatch: any, getState: any) => {
  try {
    dispatch({ type: SEND_RESPUESTAS_REQUEST });

    const respuestas = getState().respuestas;

    respuestas.forEach(async (r: any) => {
      if (r.isAnswered)
        await axios.post(
          'http://localhost:8000/api/auditorias/respuesta/',
          {
            pregunta: r.pregunta,
            respuesta: r.respuesta,
            auditoria: r.auditoria,
            audio: r?.audio || null
          },
          {
            headers: { Authorization: `Token ${getState().auth.user.token ?? ''}` }
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
          : error.message
    });
  }
};
