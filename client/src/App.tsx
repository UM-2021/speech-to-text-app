import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	IonApp,
	IonBadge,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { gridOutline, homeOutline, listOutline } from 'ionicons/icons';
import Home from './pages/Home';
import Sucursales from './pages/Sucursales';
import Incidentes from './pages/Incidentes';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';

import React from 'react';
import PreguntasAuditoria from './pages/PreguntasAuditoria';
import SeleccionSucursalParaAuditoria from './pages/SeleccionSucursalParaAuditoria';
import DatosSucursal from './pages/DatosSucursal';
import PerfilSucursalPage from './pages/PerfilSucursalPage';
import Auditoria from './pages/Auditoria';
import RespuestaAuditoria from './pages/RespuestaAuditoria';
import ResultadoAuditoria from './pages/ResultadoAuditoria';
import DetallesIncidente from './pages/DetallesIncidente';
import {
	CREATE_OR_GET_AUDITORIA_RESET,
	FETCH_INCIDENTES_RESET,
	GET_AUDITORIA_RESET,
	GET_INCIDENTE_RESET,
	RESPUESTAS_RESET,
	RESPUESTA_RESET,
	SEND_RESPUESTAS_RESET
} from './actions/types';

const App: React.FC = () => {
	const { user } = useSelector((state: any) => state.auth);
	const dispatch = useDispatch();
	const { incidentes, loading } = useSelector((state: any) => state.incidentes);

	const cleanup = () => {
		dispatch({ type: CREATE_OR_GET_AUDITORIA_RESET });
		dispatch({ type: SEND_RESPUESTAS_RESET });
		dispatch({ type: RESPUESTAS_RESET });
		dispatch({ type: RESPUESTA_RESET });
		dispatch({ type: GET_AUDITORIA_RESET });
		dispatch({ type: GET_INCIDENTE_RESET });
		dispatch({ type: FETCH_INCIDENTES_RESET });
	};

	const tabChange = (e: any) => {
		if (e.detail.tab === 'home') {
			cleanup();
		}
	};

	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path='/login'>
							<Login />
						</Route>
						<Route exact path='/home'>
							<Home />
						</Route>
						<Route exact path='/sucursal/:id/perfil'>
							<PerfilSucursalPage />
						</Route>
						<Route exact path='/sucursal/:id/auditoria'>
							<Auditoria />
						</Route>
						<Route exact path='/sucursal'>
							<Sucursales />
						</Route>
						<Route exact path='/respuesta'>
							<RespuestaAuditoria />
						</Route>
						<Route exact path='/incidentes'>
							<Incidentes />
						</Route>
						<Route exact path='/incidentes/:id'>
							<DetallesIncidente />
						</Route>
						<Route exact path='/auditoria/:id/datos'>
							<DatosSucursal />
						</Route>
						<Route exact path='/auditoria/:id/responder'>
							<PreguntasAuditoria />
						</Route>
						<Route exact path='/auditoria/:id/resultado'>
							<ResultadoAuditoria />
						</Route>
						<Route exact path='/auditoria'>
							<SeleccionSucursalParaAuditoria />
						</Route>
						<Redirect exact from='/' to='/home' />
					</IonRouterOutlet>
					{!user ? (
						<IonTabBar />
					) : (
						<IonTabBar slot='bottom' translucent={true} onIonTabsWillChange={tabChange}>
							<IonTabButton tab='home' href='/home' onClick={cleanup}>
								<IonIcon icon={homeOutline} />
								<IonLabel>Inicio</IonLabel>
							</IonTabButton>
							<IonTabButton tab='sucursales' href='/sucursal'>
								<IonIcon icon={listOutline} />
								<IonLabel>Sucursales</IonLabel>
							</IonTabButton>
							<IonTabButton tab='incidentes' href='/incidentes'>
								{!loading && incidentes.length > 0 && <IonBadge color='danger'></IonBadge>}
								<IonIcon icon={gridOutline} />
								<IonLabel>Incidentes</IonLabel>
							</IonTabButton>
						</IonTabBar>
					)}
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
