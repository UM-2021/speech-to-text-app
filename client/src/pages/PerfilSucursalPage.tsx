import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { fetchAuditoriaDetails } from '../actions/auditoriasActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PageWrapper from '../components/PageWrapper';
import PerfilSucursal from '../components/PerfilSucursal';

const PerfilSucursalPage: React.FC = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	let { id } = useParams<{ id: string }>();

	const { auditoria, loading, error } = useSelector((state: any) => state.auditoriaDetails);

	useEffect(() => {
		dispatch(fetchAuditoriaDetails(id));
	}, [dispatch, id]);

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
						<Link to={`/sucursal/${id}/auditoria`}>
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
							<Link to={`/sucursal/${id}/auditoria`}>
								<IonButton color='secondary'>Ver Auditoría</IonButton>
							</Link>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				{loading ? (
					<Loader />
				) : error ? (
					<div style={{ position: 'absolute' }}>
						<Message color='danger'>{error}</Message>
					</div>
				) : Object.keys(auditoria).length === 0 ? (
					<div style={{ position: 'absolute' }}>
						<Message color='light'>Local no auditado</Message>
					</div>
				) : auditoria.digefe_aprobada && auditoria.extra_aprobada ? (
					<div style={{ position: 'absolute', width: '100%' }}>
						<Message color='success'>Auditoria finalizada: Local habilitado</Message>
					</div>
				) : auditoria.digefe_aprobada && !auditoria.extra_aprobada ? (
					<div style={{ position: 'absolute', width: '100%' }}>
						<Message color='warning'>Auditoria finalizada: DIGEFE aprobado</Message>
					</div>
				) : auditoria.finalizada && !auditoria.digefe_aprobada ? (
					<div style={{ position: 'absolute', width: '100%' }}>
						<Message color='danger'>Auditoria finalizada: Local no habilitado</Message>
					</div>
				) : !auditoria.finalizada ? (
					<div style={{ position: 'absolute', width: '100%' }}>
						<Message color='primary'>Auditoria en curso</Message>
					</div>
				) : null}

				<PerfilSucursal id={id} />
			</IonContent>
		</PageWrapper>
	);
};

export default PerfilSucursalPage;
