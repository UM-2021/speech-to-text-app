import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItemDivider, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { RESPUESTA_RESET } from '../actions/types';
import PageWrapper from '../components/PageWrapper';

const RespuestaAuditoria: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
	let history = useHistory();
	const dispatch = useDispatch();

	const { respuesta } = useSelector((state: any) => state.respuesta);

	const goBack = () => {
		history.goBack();
		dispatch({ type: RESPUESTA_RESET });
	};

	return (
		<PageWrapper>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonButton color='secondary' onClick={() => goBack()}>
							<IonIcon icon={arrowBack} />
						</IonButton>
					</IonButtons>
					<IonTitle>{`Pregunta #${respuesta.pregunta}`}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>{respuesta.preguntaText}</IonTitle>
					</IonToolbar>
				</IonHeader>
				<div className='ion-margin'>
					<h2>Pregunta:</h2>
					<div>{respuesta.preguntaText}</div>
					<IonItemDivider />
					<h2>Respuesta:</h2>
					<div>{respuesta?.respuesta || 'N/A'}</div>
					<IonItemDivider />
					<h2>Notas:</h2>
					<div>{respuesta?.notas || 'No hay notas'}</div>
				</div>
			</IonContent>
		</PageWrapper>
	);
};

export default RespuestaAuditoria;
