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
import { checkmark, close } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import PageWrapper from '../components/PageWrapper';
import RespuestasAuditoriaList from '../components/RespuestasAuditoriaList';
import axiosInstance from '../utils/axios';

import './ResultadoAuditoria.css';

const ResultadoAuditoria: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
	let history = useHistory();
    const { user } = useSelector((state: any) => state.auth);
    // WIP
	const { preguntas } = useSelector((state: any) => state.preguntas);
	const { respuestas } = useSelector((state: any) => state.respuestas);

	const [result, setResult] = useState({ aprobada: false, finalizada: false });

	useEffect(() => {
		const fetchResult = async (id: any) => {
			const { data } = await axiosInstance(`/api/auditorias/auditoria/${match.params.id}`, {
				headers: {
					Authorization: `Token ${user.token}`
				}
			});
			setResult(data);
		};
		fetchResult(match.params.id);
	}, [match.params.id, user]);

	return (
		<PageWrapper>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='end'>
						<IonButton
							color='secondary'
							onClick={() => {
								history.push('/home');
							}}>
							Terminar
						</IonButton>
					</IonButtons>
					<IonTitle>Resultado Auditoría</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className='center-content avatar-cont'>
					{result.aprobada ? (
						<IonAvatar className='center-content avatar avatar-success'>
							<IonIcon color='white' icon={checkmark} />
						</IonAvatar>
					) : (
						<IonAvatar className='center-content avatar avatar-danger'>
							<IonIcon color='white' icon={close} />
						</IonAvatar>
					)}
				</div>

				<div className='center-content'>
					{!result.finalizada
						? 'Auditoria en curso'
						: result.aprobada
						? 'Local habilitado'
						: 'Local no habilitado'}
				</div>
				<RespuestasAuditoriaList
					auditoria={match.params.id}
					preguntas={preguntas}
					respuestas={respuestas}
				/>
			</IonContent>
		</PageWrapper>
	);
};

export default ResultadoAuditoria;
