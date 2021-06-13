import {
	CREATE_OR_GET_AUDITORIA_REQUEST,
	CREATE_OR_GET_AUDITORIA_SUCCESS,
	CREATE_OR_GET_AUDITORIA_FAILED,
	CREATE_OR_GET_AUDITORIA_RESET,
	FETCH_PREGUNTAS_FAILED,
	FETCH_PREGUNTAS_REQUEST,
	FETCH_PREGUNTAS_SUCCESS,
	FETCH_PREGUNTAS_RESET,
	ADD_RESPUESTA,
	ADD_RESPUESTA_FIELD,
	RESPUESTAS_RESET,
	FETCH_RESPUESTAS_REQUEST,
	FETCH_RESPUESTAS_SUCCESS,
	FETCH_RESPUESTAS_FAILED,
	SET_RESPUESTA,
	RESPUESTA_RESET,
	GET_AUDITORIA_REQUEST,
	GET_AUDITORIA_SUCCESS,
	GET_AUDITORIA_FAILED,
	SEND_RESPUESTAS_REQUEST,
	SEND_RESPUESTAS_SUCCESS,
	SEND_RESPUESTAS_FAILED,
	SEND_RESPUESTAS_RESET,
	GET_AUDITORIA_RESET
} from '../actions/types';

export const preguntasReducer = (state = { preguntas: [] }, action: any) => {
	switch (action.type) {
		case FETCH_PREGUNTAS_REQUEST:
			return { loading: true };
		case FETCH_PREGUNTAS_SUCCESS:
			return { loading: false, preguntas: [...action.payload] };
		case FETCH_PREGUNTAS_FAILED:
			return { loading: false, error: action.payload };
		case FETCH_PREGUNTAS_RESET:
			return { preguntas: [] };
		default:
			return state;
	}
};

export const auditoriaReducer = (state = { auditoria: {} }, action: any) => {
	switch (action.type) {
		case CREATE_OR_GET_AUDITORIA_REQUEST:
			return { loading: true };
		case CREATE_OR_GET_AUDITORIA_SUCCESS:
			return { loading: false, success: true, auditoria: action.payload };
		case CREATE_OR_GET_AUDITORIA_FAILED:
			return { loading: false, success: false, error: action.payload };
		case CREATE_OR_GET_AUDITORIA_RESET:
			return { auditoria: {} };
		default:
			return state;
	}
};

export const respuestasReducer = (state = { respuestas: [] }, action: any) => {
	switch (action.type) {
		case FETCH_RESPUESTAS_REQUEST:
			return { loading: true };
		case FETCH_RESPUESTAS_SUCCESS:
			return { ...state, loading: false, respuestas: action.payload };
		case FETCH_RESPUESTAS_FAILED:
			return { ...state, loading: false, error: action.payload };
		case ADD_RESPUESTA:
			return { ...state, respuestas: [...state.respuestas, action.payload] };
		case ADD_RESPUESTA_FIELD:
			let answered = false;
			const newRespuestas = state.respuestas.map((r: any) => {
				if (r.pregunta === action.payload.pregunta) {
					answered = true;
					return { ...r, ...action.payload };
				}
				return r;
			});
			if (!answered) newRespuestas.push(action.payload);
			return {
				...state,
				respuestas: [...newRespuestas]
			};
		case RESPUESTAS_RESET:
			return { respuestas: [] };
		default:
			return state;
	}
};

export const respuestaReducer = (state = { respuesta: {} }, action: any) => {
	switch (action.type) {
		case SET_RESPUESTA:
			return { respuesta: action.payload };
		case RESPUESTA_RESET:
			return { respuesta: {} };
		default:
			return state;
	}
};

export const auditoriaDetailsReducer = (state = { auditoria: {} }, action: any) => {
	switch (action.type) {
		case GET_AUDITORIA_REQUEST:
			return { loading: true };
		case GET_AUDITORIA_SUCCESS:
			return { loading: false, success: true, auditoria: action.payload };
		case GET_AUDITORIA_FAILED:
			return { loading: false, success: false, error: action.payload };
		case GET_AUDITORIA_RESET:
			return { auditoria: {} };
		default:
			return state;
	}
};

export const sendRespuestasReducer = (state = {}, action: any) => {
	switch (action.type) {
		case SEND_RESPUESTAS_REQUEST:
			return { loading: true };
		case SEND_RESPUESTAS_SUCCESS:
			return { loading: false, success: true };
		case SEND_RESPUESTAS_FAILED:
			return { loading: false, success: false, error: action.payload };
		case SEND_RESPUESTAS_RESET:
			return {};
		default:
			return state;
	}
};
