import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const App: React.FC = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path='/login'>
							<Login />
						</Route>
						<Route exact path='/home' component={Home} />
						<Route exact path='/sucursal/:id/perfil' component={PerfilSucursalPage} />
						<Route exact path='/sucursal/:id/auditoria' component={Auditoria} />
						<Route exact path='/sucursal' component={Sucursales} />
						<Route exact path='/respuesta' component={RespuestaAuditoria} />
						<Route exact path='/incidentes' component={Incidentes} />
						<Route exact path='/auditoria/:id/datos' component={DatosSucursal} />
						<Route exact path='/auditoria/:id/responder' component={PreguntasAuditoria} />
						<Route exact path='/auditoria/:id/resultado' component={ResultadoAuditoria} />
						<Route exact path='/auditoria' component={SeleccionSucursalParaAuditoria} />
						<Route exact path='/'>
							<Redirect to='/home' />
						</Route>
					</IonRouterOutlet>
					{!user ? (
						<IonTabBar />
					) : (
						<IonTabBar slot='bottom' translucent={true}>
							<IonTabButton tab='home' href='/home'>
								<IonIcon icon={homeOutline} />
								<IonLabel>Inicio</IonLabel>
							</IonTabButton>
							<IonTabButton tab='sucursales' href='/sucursal'>
								<IonIcon icon={listOutline} />
								<IonLabel>Sucursales</IonLabel>
							</IonTabButton>
							<IonTabButton tab='incidentes' href='/incidentes'>
								<IonBadge color='danger'></IonBadge>
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
