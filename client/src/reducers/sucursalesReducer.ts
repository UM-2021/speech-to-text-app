/** @format */

import {
  FETCH_SUCURSALES_FAILED,
  FETCH_SUCURSALES_REQUEST,
  FETCH_SUCURSALES_SUCCESS,
  FETCH_SUCURSAL_FAILED,
  FETCH_SUCURSAL_REQUEST,
  FETCH_SUCURSAL_SUCCESS
} from '../actions/types';

export const sucursalesReducer = (state = { sucursales: [] }, action: any) => {
  switch (action.type) {
    case FETCH_SUCURSALES_REQUEST:
      return { loading: true };
    case FETCH_SUCURSALES_SUCCESS:
      return { loading: false, sucursales: [...action.payload] };
    case FETCH_SUCURSALES_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const sucursalReducer = (state = { sucursal: {} }, action: any) => {
  switch (action.type) {
    case FETCH_SUCURSAL_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUCURSAL_SUCCESS:
      return { ...state, loading: false, sucursal: action.payload };
    case FETCH_SUCURSAL_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
