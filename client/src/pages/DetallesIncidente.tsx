import React, { useEffect } from 'react';
import {
  IonButton,
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
import { MODIFY_INCIDENTE_STATE } from '../actions/types';

export default function DetallesIncidente() {
  let history = useHistory();
  const dispatch = useDispatch();
  let { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(incidenteDetails(id));
  }, [dispatch, id]);

  const { incidente, loading } = useSelector((state: any) => state.incidente);

  const tomarIncidente = async () => {
    await axiosInstance.post(
      `/api/auditorias/incidente/${id}/procesando/`,
      {},
      {
        headers: {
          Authorization: `Token ${user.token ?? ''}`,
        },
      }
    );
    dispatch({
      type: MODIFY_INCIDENTE_STATE,
      payload: { id, status: 'Procesando' },
    });
    history.push('/incidentes');
  };

  const resolverIncidente = async () => {
    if (incidente.incidente.asignado === user.user_id) {
      await axiosInstance.post(
        `/api/auditorias/incidente/${id}/resolver/`,
        {},
        {
          headers: {
            Authorization: `Token ${user.token ?? ''}`,
          },
        }
      );
      dispatch({
        type: MODIFY_INCIDENTE_STATE,
        payload: { id, status: 'Resuelto' },
      });
    }
    if (incidente.incidente.reporta === user.user_id) {
      await axiosInstance.post(
        `/api/auditorias/incidente/${id}/confirmar/`,
        {},
        {
          headers: {
            Authorization: `Token ${user.token ?? ''}`,
          },
        }
      );
      dispatch({
        type: MODIFY_INCIDENTE_STATE,
        payload: { id, status: 'Confirmado' },
      });
    }
    history.push('/incidentes');
  };

  return (
    <PageWrapper>
      {!loading && incidente.incidente && (
        <>
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
                <IonLabel>{incidente.incidente.status}</IonLabel>
              </IonItem>
              <IonItem className="">
                <IonLabel color="medium" slot="start">
                  Sucursal
                </IonLabel>
                <IonLabel>{incidente.nombre_sucursal}</IonLabel>
              </IonItem>
              <IonItem className="">
                <IonLabel color="medium" slot="start">
                  Respuesta
                </IonLabel>
                <IonLabel>{incidente.incidente.respuesta}</IonLabel>
              </IonItem>
              <IonItem className="">
                <IonLabel color="medium" slot="start">
                  Accion
                </IonLabel>
                <IonLabel>{incidente.incidente.accion}</IonLabel>
              </IonItem>
              <IonItem className="">
                <IonLabel color="medium" slot="start">
                  Responsable
                </IonLabel>
                <IonLabel>Id: {incidente.nombre_del_usuario_asignado}</IonLabel>
              </IonItem>
              <IonItem className="">
                <IonLabel color="medium" slot="start">
                  Email
                </IonLabel>
                <IonLabel>{incidente.email_del_usuario_asignado}</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
          <IonFooter className="center-content">
            {user.user_id !== incidente.incidente.reporta &&
              incidente.incidente.status === 'Pendiente' && (
                <IonButton
                  color="primary"
                  className="block-btn"
                  style={{ width: '45%' }}
                  onClick={tomarIncidente}
                >
                  Tomar
                </IonButton>
              )}

            <IonButton
              color="secondary"
              className="block-btn"
              style={{ width: '45%' }}
              onClick={resolverIncidente}
            >
              {user.user_id !== incidente.incidente.reporta
                ? 'Resolver'
                : 'Confirmar'}
            </IonButton>
          </IonFooter>
        </>
      )}
    </PageWrapper>
  );
}
