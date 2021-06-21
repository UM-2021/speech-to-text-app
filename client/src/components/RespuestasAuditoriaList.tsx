import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { arrowForwardOutline, checkmark, close, helpCircleOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SET_RESPUESTA } from '../actions/types';

import './RespuestasAuditoriaList.css';

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
		pregunta.respuestas_correctas
			.map((r: any) => r.toString().toLowerCase())
			.includes(pregunta.respuesta.respuesta.toString().toLowerCase() ?? null);

	const colors: any = {
		DIGEFE: 'var(--ion-color-danger)',
		Informativa: 'var(--ion-color-success)',
		Extranormativa: 'var(--ion-color-warning)'
	};

	return (
		<IonList inset key='ukey' lines='full' className='list'>
			{newPreguntas.map((pregunta: any, index: number) => (
				<IonItem
					button
					key={index}
					onClick={() => setRespuesta(pregunta.pregunta, pregunta.respuesta)}>
					{pregunta?.respuesta && Object.keys(pregunta.respuesta).includes('respuesta') ? (
						<IonIcon
							slot='start'
							size='small'
							color={validateAnswer(pregunta) ? 'success' : 'danger'}
							icon={validateAnswer(pregunta) ? checkmark : close}
						/>
					) : (
						<IonIcon slot='start' size='small' icon={helpCircleOutline} />
					)}
					<IonLabel slot='start' style={{ flexGrow: 2 }}>
						{pregunta.pregunta}
						<div>
							<small style={{ color: colors[pregunta.categoria] }}>{pregunta.categoria}</small>
						</div>
					</IonLabel>
					<IonIcon slot='end' size='small' icon={arrowForwardOutline} />
				</IonItem>
			))}
		</IonList>
	);
};

export default RespuestasAuditoriaList;
