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
	IonLabel
} from '@ionic/react';
import { add, documentTextOutline } from 'ionicons/icons';
import React from 'react';

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
		},
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
		},
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
		// const tech = auditorias.find(a => a.title === title);
		// nav.push('nav-detail', { tech });
	};

	return (
		<IonPage>
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
				<IonButton
					expand='block'
					size='large'
					className='ion-margin'
					color='primary'
					href='/auditoria/new'>
					<IonIcon icon={add} className='ion-float-start' />
					<span>Iniciar Auditoría</span>
				</IonButton>
				<div className='ion-margin list-container'>
					<h3 className='ion-margin list-header'>Auditorías</h3>
					<IonList lines='full' className='list'>
						{auditorias.map(a => (
							<IonItem onClick={() => showDetail(a.title)} className='list-item' button>
								<IonIcon icon={documentTextOutline} />
								<IonLabel>
									<h3>{a.title}</h3>
								</IonLabel>
							</IonItem>
						))}
					</IonList>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
