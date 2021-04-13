import {
	IonContent,
	IonFab,
	IonFabButton,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import { add, documentTextOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';

const MisAuditorias: React.FC = () => {
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
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Auditorías</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Mis auditorías</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonList>
					{auditorias.map(a => (
						<IonItem onClick={() => showDetail(a.title)}>
							<IonIcon icon={documentTextOutline} />
							<IonLabel>
								<h3>{a.title}</h3>
							</IonLabel>
						</IonItem>
					))}
				</IonList>
				<IonFab vertical='bottom' horizontal='end' slot='fixed'>
					<Link to='/auditoria/new'>
						<IonFabButton>
							<IonIcon icon={add} />
						</IonFabButton>
					</Link>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default MisAuditorias;
