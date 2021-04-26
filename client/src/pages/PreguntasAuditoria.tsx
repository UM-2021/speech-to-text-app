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
import axios from 'axios';
import { useHistory } from 'react-router';

interface IPregunta {
	id: string;
	pregunta: string;
	tipo: string;
	opciones?: string[];
}

const PreguntasAuditoria: React.FC = () => {
	let history = useHistory();
	const [preguntas, setPreguntas] = useState<IPregunta[]>([]);

	useEffect(() => {
		const fetchPreguntas = async () => {
			const { data } = await axios('http://localhost:8000/api/auditorias/pregunta');
			setPreguntas(data);
		};

		fetchPreguntas();
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Nueva Auditoría</IonTitle>
					<IonButtons slot='end'>
						<IonButton color='danger' onClick={() => history.goBack()}>
							Salir
						</IonButton>
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
						<IonSlide key={p.id}>
							<Pregunta pregunta={p.pregunta}>
								{p.tipo === 'audi' && <div></div>}
								{p.tipo === 'opci' && <PreguntaOpciones opciones={p.opciones} />}
								{p.tipo === 'nume' && <PreguntaNumerica />}
								<PreguntaAudio />
							</Pregunta>
						</IonSlide>
					))}
					<IonSlide>
						<Pregunta pregunta='¿Enviar auditoría?'>
							<div>
								<IonButton expand='block' color='primary'>
									Enviar
								</IonButton>
								<IonButton expand='block' color='danger'>
									Cancelar
								</IonButton>
							</div>
						</Pregunta>
					</IonSlide>
				</IonSlides>
			</IonContent>
		</IonPage>
	);
};

export default PreguntasAuditoria;
