import { IonCol, IonIcon, IonRow, IonChip } from '@ionic/react';
import { checkmark, close } from 'ionicons/icons';
import React from 'react';

import './Pregunta.css';
import PreguntaAudio from './PreguntaAudio';
import PreguntaNumerica from './PreguntaNumerica';
import PreguntaOpciones from './PreguntaOpciones';

interface IPregunta {
	id: string;
	auditoriaId: string;
	pregunta: string;
	tipo: string;
	opciones?: any;
	categoria: string;
	respuesta: any;
	respuestaCorrecta: string | number;
}

const Pregunta: React.FC<IPregunta> = ({
	id,
	tipo,
	pregunta,
	opciones,
	auditoriaId,
	respuesta,
	respuestaCorrecta,
	categoria
}) => {
	const validateAnswer = () => respuestaCorrecta === respuesta?.respuesta.toString() ?? null;

	const colors: any = {
		DIGEFE: 'danger',
		Informativa: 'success',
		Extranormativa: 'warning'
	};

	return (
		<div className='ion-padding flex ion-margin-vertical'>
			<div className='flex-int'>
				<IonChip className='ion-align-self-start' outline color={colors[categoria]}>
					{categoria}
				</IonChip>
				<h3>{pregunta}</h3>
				<h5>
					<i>Respuesta: </i>
				</h5>
				<IonRow>
					<IonCol className='ion-align-items-center'>{respuesta.respuesta}</IonCol>
					<IonCol className='ion-align-items-center'>
						{Object.keys(respuesta).includes('respuesta') && (
							<IonIcon
								className={`${validateAnswer() ? 'answer-icon' : 'answer-icon2'}`}
								size='large'
								color={validateAnswer() ? 'success' : 'danger'}
								icon={validateAnswer() ? checkmark : close}
							/>
						)}
					</IonCol>
				</IonRow>
			</div>
			<div className='shrink'>
				{tipo === 'Audio' && <div></div>}
				{tipo === 'Opciones' && <PreguntaOpciones opciones={opciones} preguntaId={id} />}
				{tipo === 'Numerica' && <PreguntaNumerica preguntaId={id} />}
				<PreguntaAudio preguntaId={id} />
			</div>
		</div>
	);
};

export default Pregunta;
