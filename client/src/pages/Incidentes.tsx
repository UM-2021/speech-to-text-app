import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonBadge,
  IonButton,
} from '@ionic/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { alertCircleOutline, arrowForwardOutline } from 'ionicons/icons';
import PageWrapper from '../components/PageWrapper';
import { fetchIncidentes } from '../actions/incidentesActions';

const Incidentes: React.FC = () => {
  const [showAsignados, setShowAsignados] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { incidentes, loading } = useSelector((state: any) => state.incidentes);
  useEffect(() => {
    dispatch(fetchIncidentes());
  }, [dispatch]);

  return (
    <PageWrapper>
      {!loading && (
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Incidentes</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Incidentes</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonButton
              onClick={() => setShowAsignados(!showAsignados)}
              style={{ width: '50%', margin: '0' }}
              fill={showAsignados ? 'solid' : 'outline'}
              color="secondary"
            >
              <IonLabel>ASIGNADOS</IonLabel>
              <IonBadge color="danger">
                {
                  incidentes.filter(
                    (incidente: any) => incidente.asignado === user.user_id
                  ).length
                }
              </IonBadge>
            </IonButton>
            <IonButton
              onClick={() => setShowAsignados(!showAsignados)}
              style={{ width: '50%', margin: '0' }}
              fill={!showAsignados ? 'solid' : 'outline'}
              color="secondary"
            >
              <IonLabel>REPORTADOS</IonLabel>
              <IonBadge color="danger">
                {
                  incidentes.filter(
                    (incidente: any) => incidente.reporta === user.user_id
                  ).length
                }
              </IonBadge>
            </IonButton>
            {showAsignados && (
              <IonList>
                {incidentes
                  .filter(
                    (incidente: any) => incidente.asignado === user.user_id
                  )
                  .map((i: any) => (
                    <Link
                      to={`/incidentes/${i.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <IonItem button key={i.title}>
                        <IonIcon
                          slot="start"
                          icon={alertCircleOutline}
                          color={
                            i.status === 'Pendiente'
                              ? 'danger'
                              : i.status === 'Procesando'
                              ? 'primary'
                              : 'secondary'
                          }
                        />
                        <IonLabel>
                          SAG: {i.sucursal} - {i.accion}
                        </IonLabel>
                        <IonIcon slot="end" icon={arrowForwardOutline} />
                      </IonItem>
                    </Link>
                  ))}
              </IonList>
            )}
            {!showAsignados && (
              <IonList>
                {incidentes
                  .filter(
                    (incidente: any) => incidente.reporta === user.user_id
                  )
                  .map((i: any) => (
                    <Link
                      to={`/incidentes/${i.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <IonItem button key={i.title}>
                        <IonIcon
                          slot="start"
                          icon={alertCircleOutline}
                          color={
                            i.status === 'Pendiente'
                              ? 'danger'
                              : i.status === 'Procesando'
                              ? 'primary'
                              : 'secondary'
                          }
                        />
                        <IonLabel>
                          SAG: {i.sucursal} - {i.accion}
                        </IonLabel>
                        <IonIcon slot="end" icon={arrowForwardOutline} />
                      </IonItem>
                    </Link>
                  ))}
              </IonList>
            )}
          </IonContent>
        </>
      )}
    </PageWrapper>
  );
};

export default Incidentes;
