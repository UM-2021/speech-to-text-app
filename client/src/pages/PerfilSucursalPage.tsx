import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import PerfilSucursal from '../components/PerfilSucursal';

const PerfilSucursalPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
	let history = useHistory();

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
				<PerfilSucursal id={match.params.id} />
			</IonContent>
		</PageWrapper>
	);
};

export default PerfilSucursalPage;
