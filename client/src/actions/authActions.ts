import axiosInstance from '../utils/axios';
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from './types';

export const login = (email: string, password: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axiosInstance.post('/api/login/', {
      username: email,
      password,
    });

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error.message ? error.message : 'Incorrect credentials.',
    });
  }
};
