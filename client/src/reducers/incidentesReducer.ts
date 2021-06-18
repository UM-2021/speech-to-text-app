import {
  FETCH_INCIDENTES_FAILED,
  FETCH_INCIDENTES_REQUEST,
  FETCH_INCIDENTES_SUCCESS,
  GET_INCIDENTE_REQUEST,
  GET_INCIDENTE_SUCCESS,
  GET_INCIDENTE_FAILED,
  GET_INCIDENTE_RESET,
} from '../actions/types';

export const incidentesReducer = (state = { incidentes: [] }, action: any) => {
  switch (action.type) {
    case FETCH_INCIDENTES_REQUEST:
      return { loading: true };
    case FETCH_INCIDENTES_SUCCESS:
      return { loading: false, incidentes: [...action.payload] };
    case FETCH_INCIDENTES_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const incidenteDetailsReducer = (
  state = { incidente: {} },
  action: any
) => {
  switch (action.type) {
    case GET_INCIDENTE_REQUEST:
      return { loading: true };
    case GET_INCIDENTE_SUCCESS:
      return { loading: false, success: true, incidente: action.payload };
    case GET_INCIDENTE_FAILED:
      return { loading: false, success: false, error: action.payload };
    case GET_INCIDENTE_RESET:
      return { incidente: {} };
    default:
      return state;
  }
};
