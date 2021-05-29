import { IonButton, IonSegment } from '@ionic/react';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_RESPUESTA_FIELD } from '../actions/types';

import './PreguntaOpciones.css';

const PreguntaOpciones: React.FC<{ opciones: string[] | undefined; preguntaId: string }> = ({
	opciones,
	preguntaId
}) => {
	const dispatch = useDispatch();

	const addAnswer = (value: string) => {
		dispatch({ type: ADD_RESPUESTA_FIELD, payload: { pregunta: preguntaId, respuesta: value } });
	};

	return (
		<Fragment>
			<IonSegment className='bg-color grid'>
				{opciones!.map(o => (
					<IonButton key={o} className='grid-btn' onClick={() => addAnswer(o)}>
						{o}
					</IonButton>
				))}
			</IonSegment>
		</Fragment>
	);
};

export default PreguntaOpciones;
