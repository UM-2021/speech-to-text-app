import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from './types';

export const login = (email: string, password: string) => async (dispatch: any, getState: any) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		// const { data } = await axios('http://localhost:8000/api/sucursales/');
		const payload = {
			email,
			token: '12345tgfdswq34rtfdw2345tgfds'
		};

		dispatch({ type: LOGIN_SUCCESS, payload });
	} catch (error) {
		dispatch({
			type: LOGIN_FAILED,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
		});
	}
};
