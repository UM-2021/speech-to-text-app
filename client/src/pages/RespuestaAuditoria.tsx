import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonItemDivider,
	IonPopover,
	IonThumbnail,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PageWrapper from '../components/PageWrapper';

const RespuestaAuditoria: React.FC = () => {
	let history = useHistory();

	const { respuesta } = useSelector((state: any) => state.respuesta);

	const [popoverState, setShowPopover] = useState({
		showPopover: false,
		event: undefined
	});

	return (
		<PageWrapper>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonButton color='secondary' onClick={() => history.goBack()}>
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
					<IonItemDivider />
					<h2>Imagenes:</h2>
					{respuesta?.imagen && respuesta?.imagen.url ? (
						<IonThumbnail onClick={(e: any) => setShowPopover({ showPopover: true, event: e })}>
							<IonImg src={respuesta?.imagen.url} />
						</IonThumbnail>
					) : (
						'No hay imagenes'
					)}
				</div>
				{respuesta?.imagen && (
					<IonPopover
						event={popoverState.event}
						isOpen={popoverState.showPopover}
						onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}>
						<IonImg src={respuesta?.imagen.url} />
					</IonPopover>
				)}
			</IonContent>
		</PageWrapper>
	);
};

export default RespuestaAuditoria;
