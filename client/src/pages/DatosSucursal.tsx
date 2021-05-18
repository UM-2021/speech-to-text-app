/** @format */

import React from 'react';
import {
  IonContent,
  IonButton,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter
} from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import './DatosSucursal.css';
import PerfilSucursal from '../components/PerfilSucursal';

const DatosSucursal: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nueva Auditoría</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nueva Auditoría</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PerfilSucursal id={match.params.id} />
      </IonContent>
      <IonFooter className="center-content">
        <IonButton color="danger" className="block-btn" onClick={() => history.goBack()}>
          Cancelar
        </IonButton>
        <IonButton
          color="primary"
          className="block-btn"
          onClick={() => history.push(`/auditoria/${match.params.id}`)}>
          Comenzar
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default DatosSucursal;
