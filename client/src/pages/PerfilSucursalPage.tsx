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
import { eyeOutline } from 'ionicons/icons';
import React from 'react';
import PerfilSucursal from '../components/PerfilSucursal';

const PerfilSucursalPage: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>SAG</IonTitle>
					<IonButtons slot='end'>
						<IonButton color='primary'>Ver Auditoría</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{/* <IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>SAG</IonTitle>
						<IonButtons slot='end'>
							<IonButton color='primary'>Ver Auditoría</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader> */}
				<PerfilSucursal />
			</IonContent>
		</IonPage>
	);
};

export default PerfilSucursalPage;
