import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonList,
	IonIcon,
	IonItem,
	IonLabel,
	IonSearchbar
} from '@ionic/react';
import axios from 'axios';
import { arrowForwardOutline, storefrontOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface IBaseSucursal {
	id: string;
	nombre: string;
}

const Sucursales: React.FC = () => {
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
			<IonHeader>
				<IonToolbar>
					<IonTitle>Sucursales</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Sucursales</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonSearchbar
					placeholder='Busca una sucursal...'
					showCancelButton='focus'
					showClearButton='focus'></IonSearchbar>

				<IonList>
					{sucursales.map(s => (
						<Link key={s.id} to={`/sucursal/perfil/${s.id}`} style={{ textDecoration: 'none' }}>
							<IonItem button>
								<IonIcon slot='start' icon={storefrontOutline} />
								<IonLabel>{s.nombre}</IonLabel>
								<IonIcon slot='end' icon={arrowForwardOutline} />
							</IonItem>
						</Link>
					))}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Sucursales;
