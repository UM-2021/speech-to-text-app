import { IonButton, IonSegment } from '@ionic/react';
import React, { useEffect, useState } from 'react';

import './PreguntaOpciones.css';

const PreguntaOpciones: React.FC<{ opciones: string[] | undefined }> = ({ opciones }) => {
	const [answer, setAnswer] = useState('');

	useEffect(() => {
		// TODO: Hacer la request
	}, [answer]);

	return (
		<IonSegment className='bg-color grid'>
			{opciones!.map(o => (
				<IonButton className='grid-btn' color='light' onClick={() => setAnswer(o)}>
					{o}
				</IonButton>
			))}
		</IonSegment>
	);
};

export default PreguntaOpciones;
