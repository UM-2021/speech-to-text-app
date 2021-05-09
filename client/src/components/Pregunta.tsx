import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_RESPUESTA } from '../actions/types';

import './Pregunta.css';
import PreguntaAudio from './PreguntaAudio';
import PreguntaNumerica from './PreguntaNumerica';
import PreguntaOpciones from './PreguntaOpciones';

interface IPregunta {
	id: string;
	pregunta: string;
	tipo: string;
	opciones?: any;
}

const Pregunta: React.FC<IPregunta> = ({ id, tipo, pregunta, opciones }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: ADD_RESPUESTA, payload: { pregunta: id, isAnswered: false } });
	}, [dispatch, id]);

	const [respuesta, setRespuesta] = useState('');
	const handleResponse = async (a: string, audio?: string) => {
		setRespuesta(a);
		const payload = {
			pregunta: id,
			respuesta: a,
			audio: audio ? audio : null
		};
	};

	return (
		<div className='ion-padding flex ion-margin-vertical'>
			<div>
				<h3>{pregunta}</h3>
			</div>
			<div>
				<h5>
					<i>Respuesta: </i>
				</h5>
				<div>{respuesta}</div>
			</div>
			<div className='shrink'>
				{tipo === 'audi' && <div></div>}
				{tipo === 'opci' && <PreguntaOpciones opciones={opciones} preguntaId={id} />}
				{tipo === 'nume' && <PreguntaNumerica preguntaId={id} />}
				<PreguntaAudio preguntaId={id} />
			</div>
		</div>
	);
};

export default Pregunta;
