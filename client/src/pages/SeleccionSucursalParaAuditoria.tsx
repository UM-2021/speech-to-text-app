import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonList,
	IonPage,
	IonSearchbar,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import axios from 'axios';
import { arrowForwardOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

interface IBaseSucursal {
	id: string;
	nombre: string;
}

const SeleccionSucursalParaAuditoria: React.FC = () => {
	let history = useHistory();
	const [sucursales, setSucursales] = useState<IBaseSucursal[]>([]);
	useEffect(() => {
		const fetchSucursales = async () => {
			const { data } = await axios('http://localhost:8000/api/sucursales/');
			setSucursales(data);
		};
		fetchSucursales();
	}, []);
	return (
		<IonPage>
			<IonHeader translucent>
				<IonToolbar className='toolbar'>
					<IonButtons slot='start'>
						<IonButton size='small' color='light' onClick={() => history.goBack()}>Cancelar</IonButton>
					</IonButtons>
					<IonTitle size='large'>Nueva Auditoría</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Nueva Auditoría</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonSearchbar
					placeholder='Busca una sucursal...'
					showCancelButton='focus'
					showClearButton='focus'></IonSearchbar>

				<IonList>
					{sucursales.map(s => (
						<Link key={s.id} to={`/auditoria/datos/${s.id}`} style={{ textDecoration: 'none' }}>
							<IonItem>
								{s.nombre}
								<IonIcon slot='end' icon={arrowForwardOutline} />
							</IonItem>
						</Link>
					))}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default SeleccionSucursalParaAuditoria;
