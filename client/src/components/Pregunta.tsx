import { MediaObject } from '@ionic-native/media';
import React, { useState } from 'react';

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

const Pregunta: React.FC<IPregunta & { submitResponse: (payload: any) => void }> = ({
	id,
	tipo,
	pregunta,
	opciones,
	submitResponse
}) => {
	const [respuesta, setRespuesta] = useState('');
	const handleResponse = async (a: string, audio?: MediaObject) => {
		setRespuesta(a);
		const payload = {
			pregunta: id, 
			respuesta: a
		}
		submitResponse(payload);
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
				{tipo === 'opci' && <PreguntaOpciones opciones={opciones} submitResponse={handleResponse} />}
				{tipo === 'nume' && <PreguntaNumerica submitResponse={handleResponse} />}
				<PreguntaAudio submitResponse={handleResponse} />
			</div>
		</div>
	);
};

export default Pregunta;
