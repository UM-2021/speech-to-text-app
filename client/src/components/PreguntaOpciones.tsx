import { IonButton, IonSegment } from '@ionic/react';
import React, { Fragment, useEffect, useState } from 'react';

import './PreguntaOpciones.css';

const PreguntaOpciones: React.FC<{ opciones: string[] | undefined }> = ({ opciones }) => {
	const [answer, setAnswer] = useState('');

	useEffect(() => {
		// TODO: Hacer la request
	}, [answer]);

	return (
		<Fragment>
			<h3>{answer}</h3>
			<IonSegment className='bg-color grid'>
				{opciones!.map(o => (
					<IonButton key={o} className='grid-btn' onClick={() => setAnswer(o)}>
						{o}
					</IonButton>
				))}
			</IonSegment>
		</Fragment>
	);
};

export default PreguntaOpciones;
