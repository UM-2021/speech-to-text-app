import React, { useEffect, useState } from 'react';
import {
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonSlides,
	IonSlide,
	IonButtons,
	IonButton,
	IonToast,
	IonAlert
} from '@ionic/react';

import './PreguntasAuditoria.css';
import Pregunta from '../components/Pregunta';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAuditoria,
	fetchPreguntas,
	fetchRespuestas,
	postRespuestas
} from '../actions/auditoriasActions';
import PageWrapper from '../components/PageWrapper';
import RespuestasAuditoriaList from '../components/RespuestasAuditoriaList';
import Message from '../components/Message';
import {
	CREATE_OR_GET_AUDITORIA_RESET,
	FETCH_SUCURSAL_RESET,
	RESPUESTAS_RESET,
	SEND_RESPUESTAS_RESET
} from '../actions/types';

const PreguntasAuditoria: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
	let history = useHistory();
	const dispatch = useDispatch();
	const sucursalId = match.params.id;

	const { preguntas, loading: loadingPreguntas, error: errorPreguntas } = useSelector(
		(state: any) => state.preguntas
	);
	const { auditoria, loading: loadingAuditoria, success, error: errorAuditoria } = useSelector(
		(state: any) => state.auditoria
	);
	const { respuestas, loading: loadingRespuestas, error: errorRespuestas } = useSelector(
		(state: any) => state.respuestas
	);

	const {
		success: sendRespuestasSuccess,
		loading: loadingSendRespuestas,
		error: errorSendRespuestas
	} = useSelector((state: any) => state.sendRespuestas);

	const [showAlert, setShowAlert] = useState(false);

	useEffect(
		() => () => {
			dispatch({ type: CREATE_OR_GET_AUDITORIA_RESET });
			dispatch({ type: RESPUESTAS_RESET });
			dispatch({ type: FETCH_SUCURSAL_RESET });
			dispatch({ type: SEND_RESPUESTAS_RESET });
		},
		[dispatch]
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

	useEffect(() => {
		if (sendRespuestasSuccess) history.push(`/auditoria/${auditoria.id}/resultado`);
	}, [dispatch, sendRespuestasSuccess, history, auditoria]);

	const onExit = () => {
		history.push('/home');
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		dispatch(postRespuestas());
	};

	if (loadingPreguntas || loadingRespuestas || loadingAuditoria) return <Loader />;
	else
		return (
			<PageWrapper>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Nueva Auditoría</IonTitle>
						<IonButtons slot='end'>
							<IonButton color='danger' onClick={() => setShowAlert(true)}>
								Salir
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonAlert
						isOpen={showAlert}
						onDidDismiss={() => setShowAlert(false)}
						header={'¿Estas seguro?'}
						message={'Todos los cambios no guardados se perderan.'}
						buttons={[
							{
								text: 'Cancelar',
								role: 'cancel',
								cssClass: 'secondary'
							},
							{
								text: 'Sí!',
								handler: () => {
									onExit();
								}
							}
						]}
					/>
					<IonToast
						isOpen={sendRespuestasSuccess}
						position='top'
						message='Auditoría guardada satisfactoriamente!'
						duration={3000}
					/>
					<IonHeader collapse='condense'>
						<IonToolbar>
							<IonTitle size='large'>Nueva Auditoría</IonTitle>
							<IonButtons slot='end'>
								<IonButton color='danger' onClick={() => setShowAlert(true)}>
									Salir
								</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					{errorPreguntas ? (
						<Message color='danger'>{errorPreguntas}</Message>
					) : errorAuditoria ? (
						<Message color='danger'>{errorAuditoria}</Message>
					) : errorRespuestas ? (
						<Message color='danger'>{errorRespuestas}</Message>
					) : (
						<IonSlides
							key='slideruniquekey'
							pager
							options={{
								initialSlide: 0,
								speed: 400
							}}>
							{preguntas.length > 0 &&
								preguntas.map((p: any) => (
									<IonSlide key={p.id}>
										<Pregunta
											auditoriaId={auditoria.id}
											pregunta={p.pregunta}
											id={p.id}
											tipo={p.tipo}
											opciones={p.opciones}
											categoria={p.categoria}
											respuesta={
												respuestas.filter((r: any) => r.pregunta === p.id)[0] || {}
											}
											respuestaCorrecta={p.respuesta_correcta}
										/>
									</IonSlide>
								))}
							<IonSlide key='uniquekey'>
								{loadingSendRespuestas && success ? (
									<Loader />
								) : errorSendRespuestas ? (
									<Message color='danger'>{errorSendRespuestas}</Message>
								) : (
									<div className='flex-result ion-margin-vertical'>
										<IonButton
											expand='block'
											size='large'
											className='ion-margin'
											color='primary'
											onClick={onSubmit}>
											Enviar
										</IonButton>
										<RespuestasAuditoriaList
											auditoria={auditoria.id}
											preguntas={preguntas}
											respuestas={respuestas}
										/>
									</div>
								)}
							</IonSlide>
						</IonSlides>
					)}
				</IonContent>
			</PageWrapper>
		);
};

export default PreguntasAuditoria;
