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
import { add, storefrontOutline } from 'ionicons/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Home.css';

const Home: React.FC = () => {
	const sucursales = [
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

	// var suc;

	// const sucursalesGet = async () => {
	// 	try {
	// 		let res = await axios.get('/sucursales');
	// 		suc = res.data;
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

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
				<Link to='/auditoria/nueva'>
					<IonButton expand='block' size='large' className='ion-margin' color='primary'>
						<IonIcon icon={add} className='ion-float-start' />
						<span>Iniciar Auditoría</span>
					</IonButton>
				</Link>
				<div className='ion-margin list-container'>
					<h3 className='ion-margin list-header'>SAG Recientes</h3>
					<IonList lines='full' className='list'>
						{sucursales.map(a => (
							<IonItem onClick={() => showDetail(a.title)} className='list-item' button>
								<IonIcon slot='start' icon={storefrontOutline} />
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
