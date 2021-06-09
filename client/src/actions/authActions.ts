import axios from 'axios';
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from './types';

export const login = (email: string, password: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    // const { data } = await axios.post('http://10.0.2.2:8000/api/login/', {
    //   username: email,
    //   password,
    // });
    const { data } = await axios.post('http://localhost:8000/api/login/', {
      username: email,
      password,
    });

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: 'Incorrect credentials.',
    });
  }
};
