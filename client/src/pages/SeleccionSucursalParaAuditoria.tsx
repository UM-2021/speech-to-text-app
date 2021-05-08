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
import { arrowBack, arrowForwardOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchSucursales } from '../actions/sucursalesActions';

interface IBaseSucursal {
	id: string;
	nombre: string;
}

const SeleccionSucursalParaAuditoria: React.FC = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const { loading, error, sucursales } = useSelector((state: any) => state.sucursales);
	useEffect(() => {
		dispatch(fetchSucursales());
	}, [dispatch]);
	return (
		<IonPage>
			<IonHeader translucent>
				<IonToolbar className='toolbar'>
					<IonButtons slot='start'>
						<IonButton size='small' color='secondary' onClick={() => history.goBack()}>
							<IonIcon icon={arrowBack} />
						</IonButton>
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
					{sucursales.map((s: any) => (
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
