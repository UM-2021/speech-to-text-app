import React, { useEffect, useRef, useState } from 'react';
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
import { useHistory, useParams } from 'react-router-dom';
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

const PreguntasAuditoria: React.FC = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	let { id } = useParams<{ id: string }>();
	const sucursalId = id;

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
	const slider = useRef(document.createElement('ion-slides'));

	useEffect(() => {
		const currentSlider = slider.current;
		return () => {
			console.log('Workaround ...');
			const workaround = async () => {
				let swiper = await currentSlider.getSwiper();
				swiper.removeAllSlides();
				swiper.update();
			};
			workaround();
			dispatch({ type: CREATE_OR_GET_AUDITORIA_RESET });
			dispatch({ type: RESPUESTAS_RESET });
			dispatch({ type: FETCH_SUCURSAL_RESET });
			dispatch({ type: SEND_RESPUESTAS_RESET });
		};
	}, [dispatch]);

	useEffect(() => {
		console.log('Effect 2');
		if (success) {
			console.log('Effect 2 success');
			dispatch(fetchRespuestas(auditoria.id));
		}
	}, [dispatch, auditoria?.id, success]);

	useEffect(() => {
		console.log('Effect 3');
		dispatch(fetchAuditoria(sucursalId));
		dispatch(fetchPreguntas());
	}, [dispatch, sucursalId]);

	useEffect(() => {
		console.log('Effect 4');
		if (sendRespuestasSuccess) history.push(`/auditoria/${auditoria.id}/resultado`);
	}, [dispatch, sendRespuestasSuccess, history, auditoria?.id]);

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
								cssClass: 'secondary',
								handler: () => setShowAlert(false)
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
						position='bottom'
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
							ref={slider}
							key='slideruniquekey'
							pager
							options={{
								initialSlide: 0,
								speed: 400
							}}>
							{preguntas.length > 0 &&
								preguntas.map((p: any) => (
									<IonSlide key={`slide-${p.id}`}>
										<Pregunta
											key={`slide-${p.id}`}
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
