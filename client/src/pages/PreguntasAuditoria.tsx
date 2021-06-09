import React, { useEffect, useState } from 'react';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonSlides,
	IonSlide,
	IonButtons,
	IonButton,
	IonToast
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
import { RESPUESTAS_RESET } from '../actions/types';
import PageWrapper from '../components/PageWrapper';
import RespuestasAuditoriaList from '../components/RespuestasAuditoriaList';

interface IRespuesta {
	respuesta: string;
	notas?: string;
	auditoria: string;
	pregunta: string;
	// validez: boolean;
}

interface IPregunta {
	id: string;
	pregunta: string;
	tipo: string;
	opciones?: string[];
}

const PreguntasAuditoria: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
	let history = useHistory();
	const dispatch = useDispatch();
	const { loading, error, preguntas } = useSelector((state: any) => state.preguntas);
	const { loading: auditoriaLoading, auditoria, success } = useSelector((state: any) => state.auditoria);
	const { respuestas, loading: respuestasLoading } = useSelector((state: any) => state.respuestas);
	const [submitted, setSubmitted] = useState(false);
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		if (success) {
			dispatch(fetchRespuestas(auditoria.id));
		} else {
			dispatch(fetchAuditoria(match.params.id));
			dispatch(fetchPreguntas());
		}
	}, [dispatch, match.params.id, success, auditoria]);

  const onExit = () => {
    history.goBack();
    dispatch({ type: RESPUESTAS_RESET });
  };

	const onSubmit = (e: any) => {
		e.preventDefault();
		setShowLoader(true);
		dispatch(postRespuestas());
		setTimeout(() => {
			setSubmitted(true);
			setShowLoader(false);
			history.push('/home');
		}, 1500);
	};

	if (loading) return <Loader />;
	else
		return (
			<PageWrapper>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Nueva Auditoría</IonTitle>
						<IonButtons slot='end'>
							<IonButton color='danger' onClick={onExit}>
								Salir
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonToast
						isOpen={submitted}
						position='top'
						message='Auditoría guardada satisfactoriamente!'
						duration={3000}
					/>
					<IonHeader collapse='condense'>
						<IonToolbar>
							<IonTitle size='large'>Nueva Auditoría</IonTitle>
						</IonToolbar>
					</IonHeader>
					{auditoriaLoading ? (
						<Loader />
					) : (
						<IonSlides
							pager={true}
							options={{
								initialSlide: 0,
								speed: 400
							}}>
							{preguntas.map((p: any) => (
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

							<IonSlide>
								{showLoader ? (
									<Loader />
								) : (
									<div>
										<RespuestasAuditoriaList sucursal={match.params.id} />
										<IonButton expand='block' color='primary' onClick={onSubmit}>
											Enviar
										</IonButton>
										<IonButton expand='block' color='danger'>
											Cancelar
										</IonButton>
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
