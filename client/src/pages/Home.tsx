import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonIcon,
	IonButton,
	IonList,
	IonItem,
	IonLabel
} from '@ionic/react';
import axios from 'axios';
import { add, storefrontOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

interface IBaseSucursal {
	id: string;
	nombre: string;
}

const Home: React.FC = () => {
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
					<IonTitle>Inicio</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Inicio</IonTitle>
					</IonToolbar>
				</IonHeader>
				<Link to='/auditoria/nueva'>
					<IonButton expand='block' size='large' className='ion-margin' color='primary'>
						<IonIcon icon={add} className='ion-float-start' />
						<span>Iniciar Auditoría</span>
					</IonButton>
				</Link>
				<div className='ion-margin list-container'>
					<h3 className='ion-margin list-header'>SAG Recientes</h3>
					<IonList lines='full' className='list'>
						{sucursales.map(a => (
							<Link
								key={a.id}
								to={`/sucursal/perfil/${a.id}`}
								style={{ textDecoration: 'none' }}>
								<IonItem className='list-item' button>
									<IonIcon slot='start' icon={storefrontOutline} />
									<IonLabel>
										<h3>{a.nombre}</h3>
									</IonLabel>
								</IonItem>
							</Link>
						))}
					</IonList>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
