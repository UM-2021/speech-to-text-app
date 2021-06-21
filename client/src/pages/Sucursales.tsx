import {
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonList,
	IonIcon,
	IonItem,
	IonLabel,
	IonSearchbar
} from '@ionic/react';
import { arrowForwardOutline, storefrontOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSucursales } from '../actions/sucursalesActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PageWrapper from '../components/PageWrapper';

const Sucursales: React.FC = () => {
	const dispatch = useDispatch();
	const { loading, error, sucursales } = useSelector((state: any) => state.sucursales);

	const [searchText, setSearchText] = useState<string>('');

	useEffect(() => {
		dispatch(fetchSucursales());
	}, [dispatch]);

	return (
		<PageWrapper>
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
					showClearButton='focus'
					value={searchText}
					onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
				{loading ? (
					<Loader />
				) : error ? (
					<Message color='danger'>{error}</Message>
				) : (
					<IonList lines='full'>
						{sucursales
							.filter((s: any) =>
								s.nombre.toLowerCase().includes(searchText.toLocaleLowerCase())
							)
							.map((s: any) => (
								<Link
									key={s.id}
									to={`/sucursal/${s.id}/perfil`}
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

export default Sucursales;
