import React, { Fragment, useState } from 'react';
import { IonItem, IonInput, IonButton, IonIcon } from '@ionic/react';
import { arrowUpOutline, arrowDownOutline } from 'ionicons/icons';

import './PreguntaNumerica.css';
import { useDispatch } from 'react-redux';
import { ADD_RESPUESTA } from '../actions/types';

const PreguntaNumerica: React.FC<{ preguntaId: string }> = ({ preguntaId }) => {
	const dispatch = useDispatch();
	const [number, setNumber] = useState(0);

	const addAnswer = (value: Number) => {
		dispatch({ type: ADD_RESPUESTA, payload: { pregunta: preguntaId, respuesta: value } });
	};

	return (
		<Fragment>
			<IonItem>
				<IonInput
					type='number'
					value={number}
					placeholder='Enter Number'
					onIonChange={e => addAnswer(parseInt(e.detail.value!))}></IonInput>
				<IonButton onClick={() => setNumber(number + 1)} shape='round'>
					<IonIcon icon={arrowUpOutline} />
				</IonButton>
				<IonButton onClick={() => setNumber(number - 1)} shape='round'>
					<IonIcon icon={arrowDownOutline} />
				</IonButton>
			</IonItem>
		</Fragment>
	);
};

export default PreguntaNumerica;
