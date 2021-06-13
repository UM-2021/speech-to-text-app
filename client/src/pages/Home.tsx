import {
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonIcon,
	IonButton,
	IonList,
	IonItem,
	IonLabel
} from '@ionic/react';
import { add, storefrontOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSucursales } from '../actions/sucursalesActions';
import {
	CREATE_OR_GET_AUDITORIA_RESET,
	FETCH_SUCURSAL_RESET,
	RESPUESTAS_RESET,
	SEND_RESPUESTAS_RESET
} from '../actions/types';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PageWrapper from '../components/PageWrapper';

import './Home.css';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const { loading, error, sucursales } = useSelector((state: any) => state.sucursales);
	const { user } = useSelector((state: any) => state.auth);

	useEffect(() => {
		dispatch(fetchSucursales());
		dispatch({ type: CREATE_OR_GET_AUDITORIA_RESET });
		dispatch({ type: RESPUESTAS_RESET });
		dispatch({ type: FETCH_SUCURSAL_RESET });
		dispatch({ type: SEND_RESPUESTAS_RESET });
	}, [dispatch]);

	return (
		<PageWrapper>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Inicio</IonTitle>
				</IonToolbar>
			</IonHeader>
			{loading ? (
				<Loader />
			) : error ? (
				<Message color='danger'>{error}</Message>
			) : (
				<IonContent fullscreen>
					<IonHeader collapse='condense'>
						<IonToolbar>
							<IonTitle size='large'>Inicio</IonTitle>
						</IonToolbar>
					</IonHeader>
					{user && (
						<div className='ion-margin'>
							<h1>
								¡Hola, <strong>{user.username}</strong>!{' '}
							</h1>
						</div>
					)}
					<Link to='/auditoria'>
						<IonButton expand='block' size='large' className='ion-margin' color='primary'>
							<IonIcon icon={add} slot='start' />
							<span slot='end'>Iniciar Auditoría</span>
						</IonButton>
					</Link>
					<div className='ion-margin list-container'>
						<h3 className='ion-margin list-header'>SAG Recientes</h3>
						<IonList lines='full' className='list'>
							{sucursales.map((s: any) => (
								<Link
									key={s.id}
									to={`/sucursal/${s.id}/perfil`}
									style={{ textDecoration: 'none' }}>
									<IonItem className='list-item' button>
										<IonIcon slot='start' icon={storefrontOutline} />
										<IonLabel>
											<h3>{s.nombre}</h3>
										</IonLabel>
									</IonItem>
								</Link>
							))}
						</IonList>
					</div>
				</IonContent>
			)}
		</PageWrapper>
	);
};

export default Home;
