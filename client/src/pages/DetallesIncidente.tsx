import React, { useEffect } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  IonListHeader,
} from '@ionic/react';
import PageWrapper from '../components/PageWrapper';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { incidenteDetails } from '../actions/incidentesActions';
import { arrowBack } from 'ionicons/icons';
import axiosInstance from '../utils/axios';

export default function DetallesIncidente() {
  let history = useHistory();
  const dispatch = useDispatch();
  let { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: any) => state.auth);

  // useEffect(() => {
  //   dispatch(incidenteDetails(id));
  // }, [dispatch, id]);

  const incidente = {
    id: 1,
    title: '18 de julio esq. noseque',
    accion: 'Este local fue auditado correctamente',
    respuesta: 'No',
    reporta: 2,
    asignado: 1,
    status: 'Procesando',
    sucursal: 1,
  };

  const tomarIncidente = async () => {
    await axiosInstance.post(`/api/incidente/${id}/procesando/`, {
      headers: {
        Authorization: `Token ${user.token ?? ''}`,
      },
    });
    history.push('/incidentes');
  };

  const resolverIncidente = async () => {
    if (incidente.asignado === user.user_id)
      await axiosInstance.post(`/api/incidente/${id}/resolver/`, {
        headers: {
          Authorization: `Token ${user.token ?? ''}`,
        },
      });
    if (incidente.reporta === user.user_id)
      await axiosInstance.post(`/api/incidente/${id}/confirmar/`, {
        headers: {
          Authorization: `Token ${user.token ?? ''}`,
        },
      });
    history.push('/incidentes');
  };

  return (
    <PageWrapper>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Incidente</IonTitle>
          <IonIcon
            slot="start"
            size="large"
            icon={arrowBack}
            onClick={() => history.goBack()}
          ></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Incidente</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList lines="none">
          <IonListHeader>
            <h3>
              <strong>Datos Incidente</strong>
            </h3>
          </IonListHeader>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Estado
            </IonLabel>
            <IonLabel>Procesando</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Sucursal
            </IonLabel>
            <IonLabel>4</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Respuesta
            </IonLabel>
            <IonLabel>No</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Accion
            </IonLabel>
            <IonLabel>accion</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Responsable
            </IonLabel>
            <IonLabel>admin</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Email
            </IonLabel>
            <IonLabel>jm@test.com</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter className="center-content">
        <IonButton
          color="primary"
          className="block-btn"
          style={{ width: '45%' }}
          onClick={tomarIncidente}
        >
          Tomar
        </IonButton>
        <IonButton
          color="secondary"
          className="block-btn"
          style={{ width: '45%' }}
          onClick={resolverIncidente}
        >
          Confirmar
        </IonButton>
      </IonFooter>
    </PageWrapper>
  );
}
