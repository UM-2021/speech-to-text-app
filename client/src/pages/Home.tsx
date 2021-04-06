import { Redirect, Route } from 'react-router-dom';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonIcon,
	IonButton,
	IonList,
	IonItem,
	IonLabel,
	IonListHeader,
	IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { add, documentTextOutline } from 'ionicons/icons';
import React from 'react';
import Login from './Login';

import './Home.css';

const Home: React.FC = () => {
	const auditorias = [
		{
			title: '18 de julio esq. noseque',
			description: 'Este local fue auditado correctamente',
			color: '#E63135'
		},
		{
			title: 'Prado',
			description: 'The latest version of cascading stylesheets - the styling language of the web!',
			color: '#0CA9EA'
		},
		{
			title: 'Av. Brasil 2394',
			description: "The latest version of the web's markup language.",
			color: '#F46529'
		},
		{
			title: 'Ciudad vieja',
			description: 'One of the most popular programming languages on the Web!',
			color: '#FFD439'
		}
	];

  const showDetail = (title: string): void => {
    const tech = auditorias.find(a => a.title === title);
      // nav.push('nav-detail', { tech });
  }

	return (
		<IonReactRouter>
			<IonPage>
				<IonRouterOutlet>
					<Route exact path='/login'>
						<Login />
					</Route>
					<Route exact path='/'>
						<Redirect to='/home' />
					</Route>
				</IonRouterOutlet>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Inicio</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent fullscreen>
					<IonHeader collapse='condense'>
						<IonToolbar>
							<IonTitle size='large'>Inicio</IonTitle>
						</IonToolbar>
					</IonHeader>
					<IonButton expand='block' size='large' className='ion-margin' href='/login'>
						<IonIcon icon={add} className='ion-float-start' />
						<span className='ion-text-left'>Iniciar Auditoría</span>
					</IonButton>
			
			<IonList inset={true} lines="full" className="auditorias">
			<IonListHeader className="list-header">
				<IonLabel>Auditorías</IonLabel>
			</IonListHeader>
			{auditorias.map(a => (
							<IonItem onClick={() => showDetail(a.title)} className="list-item">
								<IonIcon icon={documentTextOutline} />
								<IonLabel>
									<h3>{a.title}</h3>
								</IonLabel>
							</IonItem>
						))}
			</IonList>   
				</IonContent>
			</IonPage>
		</IonReactRouter>
	);
};

export default Home;
