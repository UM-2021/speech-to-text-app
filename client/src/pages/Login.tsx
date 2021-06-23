import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonLabel,
  IonIcon,
  IonGrid,
  IonButton,
  IonToast,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { login } from '../actions/authActions';
import Loader from '../components/Loader';

const Login: React.FC<any> = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { user, loading, error: errorLogin } = useSelector(
    (state: any) => state.auth
  );

	useEffect(() => {
		if (errorLogin) setError(true);
		if (user) history.replace('/home');
	}, [user, history, errorLogin]);

	const onSubmit = (e: any) => {
		e.preventDefault();
		dispatch(login(username, password));
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Iniciar Sesión</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonToast
					isOpen={error}
					message={errorLogin}
					position='top'
					duration={3000}
					onDidDismiss={() => setError(false)}
				/>
				{loading ? (
					<Loader />
				) : (
					<form onSubmit={onSubmit}>
						<IonHeader collapse='condense'>
							<IonToolbar>
								<IonTitle size='large'>Iniciar Sesión</IonTitle>
							</IonToolbar>
						</IonHeader>
						<IonGrid>
							<IonRow>
								<IonCol className='ion-text-center'>
									<IonIcon
										color='primary'
										style={{ fontSize: '30vw' }}
										icon={personCircle}
									/>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<IonItem>
										<IonLabel position='floating'>Nombre de usuario</IonLabel>
										<IonInput
											value={username}
											onIonChange={(e: any) => setUsername(e.detail.value)}
										/>
									</IonItem>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<IonItem>
										<IonLabel position='floating'>Contraseña</IonLabel>
										<IonInput
											type='password'
											value={password}
											onIonChange={(e: any) => setPassword(e.detail.value)}
										/>
									</IonItem>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<IonButton type='submit' expand='block'>
										Iniciar Sesión
									</IonButton>
								</IonCol>
							</IonRow>
						</IonGrid>
					</form>
				)}
			</IonContent>
		</IonPage>
	);
};

export default Login;
