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
  IonListHeader
} from '@ionic/react';
import { add } from 'ionicons/icons';

const Home: React.FC = () => {
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
				<IonButton expand='block' size='large' className='ion-margin'>
					<IonIcon icon={add} className='ion-float-start' />
					<span className='ion-text-left'>Iniciar Auditoría</span>
				</IonButton>
        
        <IonList inset={true} lines="full">
          <IonListHeader>
            <IonLabel>Auditorias</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Auditoria de aquella vez</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Auditoria de aquella vez</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Auditoria de aquella vez</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Auditoria de aquella vez</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Auditoria de aquella vez</IonLabel>
          </IonItem>
        </IonList>
        
			</IonContent>
		</IonPage>
	);
};

export default Home;
