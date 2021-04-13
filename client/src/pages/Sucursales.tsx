import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonFabButton, IonIcon, IonItem, IonLabel, IonFab } from '@ionic/react';
import { add, storefrontOutline } from 'ionicons/icons';

const Sucursales: React.FC = () => {
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
		}
	];

  const showDetail = (title: string): void => {
    // const tech = sucursales.find(a => a.title === title);
      // nav.push('nav-detail', { tech });
  }

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
				<IonList>
					{sucursales.map(a => (
						<IonItem onClick={() => showDetail(a.title)}>
							<IonIcon icon={storefrontOutline} />
							<IonLabel>
								<h3>{a.title}</h3>
							</IonLabel>
						</IonItem>
					))}
				</IonList>
				<IonFab vertical='bottom' horizontal='end' slot='fixed'>
					<IonFabButton>
						<IonIcon icon={add} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
  );
};

export default Sucursales;
