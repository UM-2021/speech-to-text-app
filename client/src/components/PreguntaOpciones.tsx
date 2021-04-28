import { IonButton, IonSegment } from '@ionic/react';
import React, { Fragment } from 'react';

import './PreguntaOpciones.css';

const PreguntaOpciones: React.FC<{ opciones: string[] | undefined; submitResponse: (s: string) => void }> = ({
	opciones,
	submitResponse
}) => {
	return (
		<Fragment>
			<IonSegment className='bg-color grid'>
				{opciones!.map(o => (
					<IonButton key={o} className='grid-btn' onClick={() => submitResponse(o)}>
						{o}
					</IonButton>
				))}
			</IonSegment>
		</Fragment>
	);
};

export default PreguntaOpciones;
