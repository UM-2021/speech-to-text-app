/** @format */

import {
  CREATE_OR_GET_AUDITORIA_REQUEST,
  CREATE_OR_GET_AUDITORIA_SUCCESS,
  CREATE_OR_GET_AUDITORIA_FAILED,
  FETCH_PREGUNTAS_FAILED,
  FETCH_PREGUNTAS_REQUEST,
  FETCH_PREGUNTAS_SUCCESS,
  ADD_RESPUESTA,
  ADD_RESPUESTA_FIELD,
  RESPUESTAS_RESET
} from '../actions/types';

export const preguntasReducer = (state = { preguntas: [] }, action: any) => {
  switch (action.type) {
    case FETCH_PREGUNTAS_REQUEST:
      return { loading: true };
    case FETCH_PREGUNTAS_SUCCESS:
      return { loading: false, preguntas: [...action.payload] };
    case FETCH_PREGUNTAS_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const auditoriaReducer = (state = { auditoria: {} }, action: any) => {
  switch (action.type) {
    case CREATE_OR_GET_AUDITORIA_REQUEST:
      return { loading: true };
    case CREATE_OR_GET_AUDITORIA_SUCCESS:
      return { loading: false, auditoria: action.payload };
    case CREATE_OR_GET_AUDITORIA_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const respuestasReducer = (state = [], action: any) => {
  switch (action.type) {
    case ADD_RESPUESTA:
      return [...state, action.payload];
    case ADD_RESPUESTA_FIELD:
      return state.map((r: any) => {
        if (r.pregunta === action.payload.pregunta)
          return { ...r, ...action.payload, isAnswered: true };
        return r;
      });
    case RESPUESTAS_RESET:
      return [];

    default:
      return state;
  }
};
