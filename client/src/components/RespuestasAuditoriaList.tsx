import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { arrowForwardOutline, checkmark, close } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchAuditoria, fetchPreguntas, fetchRespuestas } from '../actions/auditoriasActions';
import {
	CREATE_OR_GET_AUDITORIA_RESET,
	FETCH_PREGUNTAS_RESET,
	RESPUESTAS_RESET,
	SET_RESPUESTA
} from '../actions/types';
import Loader from './Loader';

const RespuestasAuditoriaList: React.FC<{
	auditoria: string;
	preguntas: any;
	respuestas: any;
}> = ({ auditoria, preguntas, respuestas }) => {
	let history = useHistory();
	const dispatch = useDispatch();

	const [newPreguntas, setPreguntas] = useState([]);

	useEffect(() => {
		if (preguntas && preguntas.length > 0 && respuestas) {
			const newPreguntas = preguntas.map((p: any) => {
				p.respuesta = {};
				respuestas.forEach((r: any) => {
					if (p.id === r.pregunta) p.respuesta = r;
				});
				return p;
			});
			setPreguntas(newPreguntas);
		}
	}, [preguntas, respuestas, dispatch, auditoria]);

	const setRespuesta = (pregunta: string, respuesta: any) => {
		if (respuesta.pregunta) {
			dispatch({ type: SET_RESPUESTA, payload: { preguntaText: pregunta, ...respuesta } });
			history.push('/respuesta');
		}
	};

	const validateAnswer = (pregunta: any) =>
		pregunta.respuesta_correcta === pregunta.respuesta?.respuesta.toString() ?? null;

	return (
		<IonList inset>
			{newPreguntas.map((pregunta: any, index: number) => (
				<IonItem key={index} onClick={() => setRespuesta(pregunta.pregunta, pregunta.respuesta)}>
					<IonLabel color='medium' slot='start' style={{ flexGrow: 2 }}>
						{pregunta.pregunta}
					</IonLabel>
					{pregunta?.respuesta && Object.keys(pregunta.respuesta).includes('respuesta') && (
						<IonIcon
							size='small'
							color={validateAnswer(pregunta) ? 'success' : 'danger'}
							icon={validateAnswer(pregunta) ? checkmark : close}
						/>
					)}
					<IonIcon slot='end' icon={arrowForwardOutline} />
				</IonItem>
			))}
		</IonList>
	);
};

export default RespuestasAuditoriaList;
