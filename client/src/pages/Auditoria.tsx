import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { fetchAuditoriaDetails, fetchPreguntas, fetchRespuestas } from '../actions/auditoriasActions';
import { RESPUESTAS_RESET } from '../actions/types';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PageWrapper from '../components/PageWrapper';
import RespuestasAuditoriaList from '../components/RespuestasAuditoriaList';

const Auditoria: React.FC = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	let { id } = useParams<{ id: string }>();
	const sucursalId = id;

	const { auditoria, loading: loadingAuditoria, success, error: errorAuditoria } = useSelector(
		(state: any) => state.auditoriaDetails
	);
	const { preguntas, loading: loadingPreguntas, error: errorPreguntas } = useSelector(
		(state: any) => state.preguntas
	);
	const { respuestas, loading: loadingRespuestas, error: errorRespuestas } = useSelector(
		(state: any) => state.respuestas
	);

	useEffect(() => {
		if (success && Object.keys(auditoria).includes('id')) {
			dispatch(fetchRespuestas(auditoria.id));
		}
	}, [dispatch, auditoria, success]);

	useEffect(() => {
		dispatch(fetchAuditoriaDetails(sucursalId));
		dispatch(fetchPreguntas());
		return () => {
			dispatch({ type: RESPUESTAS_RESET });
		};
	}, [dispatch, sucursalId]);

	return (
		<PageWrapper>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonButton
							color='secondary'
							onClick={() => {
								history.goBack();
							}}>
							<IonIcon icon={arrowBack} />
						</IonButton>
					</IonButtons>
					<IonTitle>Auditoría</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Auditoría</IonTitle>
					</IonToolbar>
				</IonHeader>
				{loadingAuditoria || loadingPreguntas || loadingRespuestas ? (
					<Loader />
				) : errorPreguntas ? (
					<Message color='danger'>{errorPreguntas}</Message>
				) : errorAuditoria ? (
					<Message color='danger'>{errorAuditoria}</Message>
				) : errorRespuestas ? (
					<Message color='danger'>{errorRespuestas}</Message>
				) : success ? (
					<RespuestasAuditoriaList
						preguntas={preguntas}
						respuestas={respuestas}
						auditoria={auditoria.id}
					/>
				) : (
					<Message color='warning'>Error inesperado.</Message>
				)}
			</IonContent>
		</PageWrapper>
	);
};

export default Auditoria;
