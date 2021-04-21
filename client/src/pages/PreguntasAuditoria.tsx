import React, { useEffect, useState } from 'react';
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
import PreguntaOpciones from '../components/PreguntaOpciones';

const PreguntasAuditoria: React.FC = () => {
	const [preguntas, setPreguntas] = useState<{ pregunta: string; tipo: string; opciones?: string[] }[]>([]);

	useEffect(() => {
		const fetchPreguntas = async () => {
			console.log('Fetch preguntas');
			setPreguntas([
				{
					pregunta: '¿Cumple con los requisitos de la norma N-12?',
					tipo: 'Audio'
				},
				{
					pregunta: '¿Cuenta con vidrios blindados de 32mm?',
					tipo: 'Opciones',
					opciones: ['Si', 'No', 'Capaz', 'No corresponde', 'Otra opcion mas larga mas larga']
				},
				{
					pregunta: '¿Cuantos siniestro ha tenido?',
					tipo: 'Numerica'
				}
			]);
		};

		fetchPreguntas();
	}, []);

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
				<IonSlides
					className='slider'
					pager={true}
					options={{
						initialSlide: 0,
						speed: 400
					}}>
					{preguntas.map(p => (
						<IonSlide>
							<Pregunta pregunta={p.pregunta}>
								{p.tipo === 'Opciones' && <PreguntaOpciones opciones={p.opciones} />}
								{p.tipo === 'Numerica' && <PreguntaNumerica />}
								<PreguntaAudio />
							</Pregunta>
						</IonSlide>
					))}
				</IonSlides>
			</IonContent>
		</IonPage>
	);
};

export default PreguntasAuditoria;
