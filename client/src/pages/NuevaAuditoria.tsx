import {
	IonContent,
	IonHeader,
	IonItem,
	IonList,
	IonPage,
	IonSearchbar,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import React from 'react';

const NuevaAuditoria: React.FC = () => {
	return (
		<IonPage>
			<IonHeader translucent>
				<IonToolbar>
					<IonTitle size='large'>Nueva Auditoría</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Nueva Auditoría</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonSearchbar></IonSearchbar>

				<IonList>
					<IonItem>Sucursal 1</IonItem>
					<IonItem>Sucursal 2</IonItem>
					<IonItem>Sucursal 3</IonItem>
					<IonItem>Sucursal 4</IonItem>
					<IonItem>Sucursal 5</IonItem>
					<IonItem>Sucursal 6</IonItem>
					<IonItem>Sucursal 7</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default NuevaAuditoria;
