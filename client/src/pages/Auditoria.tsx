import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { fetchAuditoria, fetchPreguntas, fetchRespuestas } from '../actions/auditoriasActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PageWrapper from '../components/PageWrapper';
import RespuestasAuditoriaList from '../components/RespuestasAuditoriaList';

const Auditoria: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
	let history = useHistory();
	const dispatch = useDispatch();
	const sucursalId = match.params.id;

	const { auditoria, loading: loadingAuditoria, success, error: errorAuditoria } = useSelector(
		(state: any) => state.auditoria
	);
	const { preguntas, loading: loadingPreguntas, error: errorPreguntas } = useSelector(
		(state: any) => state.preguntas
	);
	const { respuestas, loading: loadingRespuestas, error: errorRespuestas } = useSelector(
		(state: any) => state.respuestas
	);

	useEffect(() => {
		if (success) {
			dispatch(fetchRespuestas(auditoria.id));
		}
	}, [dispatch, auditoria, success]);

	useEffect(() => {
		dispatch(fetchAuditoria(sucursalId));
		dispatch(fetchPreguntas());
	}, [dispatch, sucursalId]);

	if (loadingAuditoria || loadingPreguntas || loadingRespuestas) return <Loader />;
	return (
		<PageWrapper>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonButton color='secondary' onClick={() => history.goBack()}>
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
				{errorPreguntas && <Message color='danger'>{errorPreguntas}</Message>}
				{errorAuditoria && <Message color='danger'>{errorAuditoria}</Message>}
				{errorRespuestas && <Message color='danger'>{errorRespuestas}</Message>}
				{success && (
					<RespuestasAuditoriaList
						preguntas={preguntas}
						respuestas={respuestas}
						auditoria={auditoria.id}
					/>
				)}
			</IonContent>
		</PageWrapper>
	);
};

export default Auditoria;
