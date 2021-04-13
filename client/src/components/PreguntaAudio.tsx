import { IonButton, IonIcon, IonSegment } from '@ionic/react';
import { cameraOutline, keypadOutline, micOutline } from 'ionicons/icons';
import React from 'react';

import './PreguntaAudio.css';

const PreguntaAudio: React.FC = () => {
	return (
		<IonSegment className='ion-justify-content-between bg-color'>
			<IonButton color='light' className='rounded '>
				<IonIcon icon={cameraOutline} />
			</IonButton>
			<IonButton className='rounded'>
				<IonIcon icon={micOutline} />
			</IonButton>
			<IonButton color='light' className='rounded'>
				<IonIcon icon={keypadOutline} />
			</IonButton>
		</IonSegment>
	);
};

export default PreguntaAudio;
