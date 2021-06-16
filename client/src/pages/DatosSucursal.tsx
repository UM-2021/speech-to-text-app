import React from 'react';
import { IonContent, IonButton, IonHeader, IonTitle, IonToolbar, IonFooter } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';

import './DatosSucursal.css';
import PerfilSucursal from '../components/PerfilSucursal';
import PageWrapper from '../components/PageWrapper';

const DatosSucursal: React.FC = () => {
	let history = useHistory();
	let { id } = useParams<{ id: string }>();

	return (
		<PageWrapper>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Nueva Auditoría</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Nueva Auditoría</IonTitle>
					</IonToolbar>
				</IonHeader>
				<PerfilSucursal id={id} />
			</IonContent>
			<IonFooter className='center-content'>
				<IonButton color='danger' className='block-btn' onClick={() => history.goBack()}>
					Cancelar
				</IonButton>
				<IonButton
					color='primary'
					className='block-btn'
					onClick={() => history.replace(`/auditoria/${id}/responder`)}>
					Comenzar
				</IonButton>
			</IonFooter>
		</PageWrapper>
	);
};

export default DatosSucursal;
