/** @format */

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import PerfilSucursal from '../components/PerfilSucursal';

const PerfilSucursalPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="secondary" onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>SAG</IonTitle>
          <IonButtons slot="end">
            <IonButton color="secondary">Ver Auditoría</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SAG</IonTitle>
            <IonButtons slot="end">
              <IonButton color="primary">Ver Auditoría</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <PerfilSucursal id={match.params.id} />
      </IonContent>
    </IonPage>
  );
};

export default PerfilSucursalPage;
