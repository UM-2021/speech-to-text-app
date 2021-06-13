import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonSearchbar,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import { arrowBack, arrowForwardOutline, storefrontOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchSucursales } from '../actions/sucursalesActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PageWrapper from '../components/PageWrapper';

const SeleccionSucursalParaAuditoria: React.FC = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const { loading, error, sucursales } = useSelector((state: any) => state.sucursales);
	const [searchText, setSearchText] = useState<string>('');

	useEffect(() => {
		dispatch(fetchSucursales());
	}, [dispatch]);

	return (
		<PageWrapper>
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
					showClearButton='focus'
					value={searchText}
					onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
				{loading ? (
					<Loader />
				) : error ? (
					<Message color='danger'>{error}</Message>
				) : (
					<IonList>
						{sucursales
							.filter((s: any) =>
								s.nombre.toLowerCase().includes(searchText.toLocaleLowerCase())
							)
							.map((s: any) => (
								<Link
									key={s.id}
									to={`/auditoria/${s.id}/datos`}
									style={{ textDecoration: 'none' }}>
									<IonItem button>
										<IonIcon slot='start' icon={storefrontOutline} />
										<IonLabel>{s.nombre}</IonLabel>
										<IonIcon slot='end' icon={arrowForwardOutline} />
									</IonItem>
								</Link>
							))}
					</IonList>
				)}
			</IonContent>
		</PageWrapper>
	);
};

export default SeleccionSucursalParaAuditoria;
