import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import Message from '../components/Message';
import PageWrapper from '../components/PageWrapper';
import PerfilSucursal from '../components/PerfilSucursal';

interface Auditoria {
	finalizada?: boolean;
	aprobada?: boolean;
}

const PerfilSucursalPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
	let history = useHistory();
	// For testing
	const auditoria: Auditoria = {
		finalizada: true,
		aprobada: false
	};

	return (
		<PageWrapper>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonButton color='secondary' onClick={() => history.goBack()}>
							<IonIcon icon={arrowBack} />
						</IonButton>
					</IonButtons>
					<IonTitle>SAG</IonTitle>
					<IonButtons slot='end'>
						<Link to={`/sucursal/${match.params.id}/auditoria`}>
							<IonButton color='secondary'>Ver Auditoría</IonButton>
						</Link>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>SAG</IonTitle>
						<IonButtons slot='end'>
							<IonButton color='primary'>Ver Auditoría</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				{Object.keys(auditoria).length === 0 ? (
					<Message color='light'>Local no auditado</Message>
				) : auditoria.aprobada ? (
					<Message color='success'>Auditoria finalizada: Local habilitado</Message>
				) : auditoria.finalizada && !auditoria.aprobada ? (
					<Message color='danger'>Auditoria finalizada: Local no habilitado</Message>
				) : !auditoria.finalizada ? (
					<Message color='primary'>Auditoria en curso</Message>
				) : null}

				<PerfilSucursal id={match.params.id} />
			</IonContent>
		</PageWrapper>
	);
};

export default PerfilSucursalPage;
