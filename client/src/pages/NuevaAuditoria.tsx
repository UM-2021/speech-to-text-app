import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonItem,
	IonList,
	IonPage,
	IonSearchbar,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import React from 'react';
import { useHistory, Link } from 'react-router-dom';

const NuevaAuditoria: React.FC = () => {
	let history = useHistory();
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
		},
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
		},
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
		},
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
		},
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
			<IonHeader translucent>
				<IonToolbar className='toolbar'>
					<IonButtons slot='start'>
						<IonButton color='light' onClick={() => history.goBack()}>Cancelar</IonButton>
					</IonButtons>
					<IonTitle size='large'>Nueva Auditoría</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Nueva Auditoría</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonSearchbar
					placeholder='Busca una sucursal...'
					showCancelButton='focus'
					showClearButton='focus'></IonSearchbar>

				<IonList>
					{sucursales.map(s => (
						<Link to={`/auditoria/formulario/${s.id}`} style={{ textDecoration: 'none' }}>
							<IonItem>{s.title}</IonItem>
						</Link>
					))}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default NuevaAuditoria;
