import {
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import { alertCircleOutline, arrowForwardOutline } from 'ionicons/icons';
import PageWrapper from '../components/PageWrapper';

const Incidentes: React.FC = () => {
	const incidentes = [
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

	return (
		<PageWrapper>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Incidentes asignados</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Incidentes asignados</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonList>
					{incidentes.map(i => (
						<IonItem button key={i.title}>
							<IonIcon slot='start' icon={alertCircleOutline} />
							<IonLabel>
								<h3>{i.title}</h3>
							</IonLabel>
							<IonIcon slot='end' icon={arrowForwardOutline} />
						</IonItem>
					))}
				</IonList>
			</IonContent>
		</PageWrapper>
	);
};

export default Incidentes;
