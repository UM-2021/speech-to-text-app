import {
	IonAvatar,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import { alert, checkmark, close } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
	CREATE_OR_GET_AUDITORIA_RESET,
	FETCH_SUCURSAL_RESET,
	RESPUESTAS_RESET,
	RESPUESTA_RESET,
	SEND_RESPUESTAS_RESET,
	GET_AUDITORIA_RESET
} from '../actions/types';
import PageWrapper from '../components/PageWrapper';
import RespuestasAuditoriaList from '../components/RespuestasAuditoriaList';
import axiosInstance from '../utils/axios';

import './ResultadoAuditoria.css';

const ResultadoAuditoria: React.FC = () => {
	let history = useHistory();
	let { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();

	const { user } = useSelector((state: any) => state.auth);
	const { preguntas } = useSelector((state: any) => state.preguntas);
	const { respuestas } = useSelector((state: any) => state.respuestas);

	const [result, setResult] = useState<any>({});

	const cleanup = () => {
		dispatch({ type: FETCH_SUCURSAL_RESET });
		dispatch({ type: CREATE_OR_GET_AUDITORIA_RESET });
		dispatch({ type: SEND_RESPUESTAS_RESET });
		dispatch({ type: RESPUESTAS_RESET });
		dispatch({ type: RESPUESTA_RESET });
		dispatch({ type: GET_AUDITORIA_RESET });
		history.replace('/home');
	};

	useEffect(() => {
		const fetchResult = async () => {
			const { data } = await axiosInstance(`/api/auditorias/auditoria/${id}/resultado/`, {
				headers: {
					Authorization: `Token ${user.token}`
				}
			});
			setResult(data);
		};

		if (Object.keys(result).length === 0) fetchResult();
	}, [id, user, result]);

	return (
		<PageWrapper>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='end'>
						<IonButton color='secondary' onClick={cleanup}>
							Terminar
						</IonButton>
					</IonButtons>
					<IonTitle>Resultado Auditoría</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className='center-content avatar-cont'>
					{result.digefe_aprobada && result.extra_aprobada ? (
						<IonAvatar className='center-content avatar avatar-success'>
							<IonIcon style={{ color: 'white' }} icon={checkmark} />
						</IonAvatar>
					) : result.digefe_aprobada && !result.extra_aprobada ? (
						<IonAvatar className='center-content avatar avatar-warning'>
							<IonIcon style={{ color: 'white' }} icon={alert} />
						</IonAvatar>
					) : (
						<IonAvatar className='center-content avatar avatar-danger'>
							<IonIcon style={{ color: 'white' }} icon={close} />
						</IonAvatar>
					)}
				</div>

				<div className='center-content'>
					{!result.finalizada
						? 'Auditoria en curso'
						: result.digefe_aprobada && !result.extra_aprobada
						? 'DIGEFE Aprobado'
						: result.extra_aprobada
						? 'Local habilitado'
						: 'Local no habilitado'}
				</div>
				<RespuestasAuditoriaList auditoria={id} preguntas={preguntas} respuestas={respuestas} />
			</IonContent>
		</PageWrapper>
	);
};

export default ResultadoAuditoria;
