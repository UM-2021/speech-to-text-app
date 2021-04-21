import React, { useState } from 'react';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonSlides,
	IonSlide,
	IonItem,
	IonLabel,
	IonItemDivider,
	IonList,
	IonSelect,
	IonSelectOption,
	IonButtons,
	IonButton
} from '@ionic/react';

import './PreguntasAuditoria.css';
import PreguntaNumerica from '../components/PreguntaNumerica';
import Pregunta from '../components/Pregunta';
import PreguntaAudio from '../components/PreguntaAudio';

const PreguntasAuditoria: React.FC = () => {
	const slideOpts = {
		initialSlide: 0,
		speed: 400
	};

	const [hairColor, setHairColor] = useState<string>('brown');

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Nueva Auditoría</IonTitle>
					<IonButtons slot='end'>
						<IonButton color='danger'>Salir</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Nueva Auditoría</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonSlides className='slider' pager={true} options={slideOpts}>
					<IonSlide>
						<Pregunta pregunta='¿Cumple con los requisitos de la norma N-12?'>
							<PreguntaAudio />
						</Pregunta>
					</IonSlide>
					<IonSlide>
						<Pregunta pregunta='¿Cuantos vidrios blindadoy hay?'>
							<PreguntaNumerica />
						</Pregunta>
					</IonSlide>
					<IonSlide>
						<IonList>
							<IonLabel>Hair Color</IonLabel>
							<IonSelect
								value={hairColor}
								okText='Okay'
								cancelText='Dismiss'
								onIonChange={e => setHairColor(e.detail.value)}>
								<IonSelectOption value='brown'>Brown</IonSelectOption>
								<IonSelectOption value='blonde'>Blonde</IonSelectOption>
								<IonSelectOption value='black'>Black</IonSelectOption>
								<IonSelectOption value='red'>Red</IonSelectOption>
							</IonSelect>
							<IonItemDivider>Your Selections</IonItemDivider>
							<IonItem>Hair Color: {hairColor}</IonItem>
						</IonList>
					</IonSlide>
					<IonSlide>
						<h1>Slide 4</h1>
					</IonSlide>
				</IonSlides>
			</IonContent>
		</IonPage>
	);
};

export default PreguntasAuditoria;
