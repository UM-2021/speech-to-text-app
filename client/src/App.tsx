import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { gridOutline, homeOutline, listOutline } from 'ionicons/icons';
import Home from './pages/Home';
import Sucursales from './pages/Sucursales';
import Auditorias from './pages/MisAuditorias';
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
import React from 'react';
import Auditoria from './pages/Auditoria';
import NuevaAuditoria from './pages/NuevaAuditoria';
import FormularioAuditoria from './pages/FormularioAuditoria';

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Route exact path='/home'>
						<Home />
					</Route>
					<Route exact path='/sucursales'>
						<Sucursales />
					</Route>
					<Route exact path='/auditorias'>
						<Auditorias />
					</Route>
					<Route exact path='/login'>
						<Login/>
					</Route>
					<Route exact path='/auditoria'>
						<Auditoria/>
					</Route>
					<Route exact path='/auditoria/new'>
						<NuevaAuditoria/>
					</Route>
					<Route exact path='/auditoria/formulario'>
						<FormularioAuditoria/>
					</Route>
					<Route exact path='/'>
						<Redirect to='/home' />
					</Route>
				</IonRouterOutlet>
				<IonTabBar slot='bottom' translucent={true}>
					<IonTabButton tab='home' href='/home'>
						<IonIcon icon={homeOutline} />
						<IonLabel>Inicio</IonLabel>
					</IonTabButton>
					<IonTabButton tab='sucursales' href='/sucursales'>
						<IonIcon icon={listOutline} />
						<IonLabel>Sucursales</IonLabel>
					</IonTabButton>
					<IonTabButton tab='auditorias' href='/auditorias'>
						<IonIcon icon={gridOutline} />
						<IonLabel>Auditorías</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
