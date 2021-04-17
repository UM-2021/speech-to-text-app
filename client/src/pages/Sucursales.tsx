import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonList,
	IonIcon,
	IonItem,
	IonLabel,
	IonSearchbar
} from '@ionic/react';
import { arrowForwardOutline, storefrontOutline } from 'ionicons/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const Sucursales: React.FC = () => {
	const sucursales = [
		{
			id: 1,
			title: '18 de julio esq. Calle',
			description: 'Este local fue auditado correctamente',
			color: '#E63135'
		},
		{
			id: 2,
			title: 'Prado',
			description: 'The latest version of cascading stylesheets - the styling language of the web!',
			color: '#0CA9EA'
		},
		{
			id: 3,
			title: 'Av. Brasil 2394',
			description: "The latest version of the web's markup language.",
			color: '#F46529'
		},
		{
			id: 4,
			title: 'Ciudad vieja',
			description: 'One of the most popular programming languages on the Web!',
			color: '#FFD439'
		}
	];

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Sucursales</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Sucursales</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonSearchbar
					placeholder='Busca una sucursal...'
					showCancelButton='focus'
					showClearButton='focus'></IonSearchbar>

				<IonList>
					{sucursales.map(a => (
						<Link key={a.id} to={`/sucursal/perfil/${a.id}`} style={{ textDecoration: 'none' }}>
							<IonItem button>
								<IonIcon slot='start' icon={storefrontOutline} />
								<IonLabel>{a.title}</IonLabel>
								<IonIcon slot='end' icon={arrowForwardOutline} />
							</IonItem>
						</Link>
					))}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Sucursales;
