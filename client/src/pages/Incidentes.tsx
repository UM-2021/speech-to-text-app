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
  IonTabBar,
  IonTabButton,
  IonBadge,
  IonButton,
} from '@ionic/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alertCircleOutline, arrowForwardOutline } from 'ionicons/icons';
import PageWrapper from '../components/PageWrapper';
import { fetchIncidentes } from '../actions/incidentesActions';

const Incidentes: React.FC = () => {
  const [showAsignados, setShowAsignados] = useState<boolean>(true);
  const incidentes = [
    {
      id: 1,
      title: '18 de julio esq. noseque',
      accion: 'Este local fue auditado correctamente',
      respuesta: 'Si',
      reporta: 2,
      asignado: 1,
      status: 'Resuelto',
      sucursal: 1,
    },
    {
      id: 2,
      title: 'Prado',
      accion:
        'The latest version of cascading stylesheets - the styling language of the web!',
      respuesta: 'No',
      reporta: 2,
      asignado: 1,
      status: 'Procesando',
      sucursal: 1,
    },
    {
      id: 3,
      title: 'Av. Brasil 2394',
      accion: "The latest version of the web's markup language.",
      respuesta: 'No',
      reporta: 1,
      asignado: 2,
      status: 'Pendiente',
      sucursal: 1,
    },
    {
      id: 4,
      title: 'Ciudad vieja',
      accion: 'One of the most popular programming languages on the Web!',
      respuesta: 'No',
      reporta: 1,
      asignado: 2,
      status: 'Confirmado',
      sucursal: 1,
    },
  ];
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  //   const { loading, error, incidentes } = useSelector(
  //     (state: any) => state.incidentes
  //   );
  //   useEffect(() => {
  //     dispatch(fetchIncidentes());
  //   }, [dispatch]);
  const incidentesAsignados = incidentes.filter(
    (incidente) => incidente.asignado === user.user_id
  );
  const incidentesReportados = incidentes.filter(
    (incidente) => incidente.reporta === user.user_id
  );

  return (
    <PageWrapper>
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
          <IonBadge color="danger">{incidentesAsignados.length}</IonBadge>
        </IonButton>
        <IonButton
          onClick={() => setShowAsignados(!showAsignados)}
          style={{ width: '50%', margin: '0' }}
          fill={!showAsignados ? 'solid' : 'outline'}
          color="secondary"
        >
          <IonLabel>REPORTADOS</IonLabel>
          <IonBadge color="danger">{incidentesReportados.length}</IonBadge>
        </IonButton>
        {showAsignados && (
          <IonList>
            {incidentesAsignados.map((i) => (
              <Link
                to={`/incidentes/${i.id}`}
                style={{ textDecoration: 'none' }}
              >
                <IonItem button key={i.title}>
                  <IonIcon slot="start" icon={alertCircleOutline} />
                  <IonLabel>
                    <h4>SAG: {i.sucursal}</h4>
                  </IonLabel>
                  <IonLabel>
                    <h4>{i.accion}</h4>
                  </IonLabel>
                  <IonIcon slot="end" icon={arrowForwardOutline} />
                </IonItem>
              </Link>
            ))}
          </IonList>
        )}
        {!showAsignados && (
          <IonList>
            {incidentesReportados.map((i) => (
              <Link
                to={`/incidentes/${i.id}`}
                style={{ textDecoration: 'none' }}
              >
                <IonItem button key={i.title}>
                  <IonIcon slot="start" icon={alertCircleOutline} />
                  <IonLabel>
                    <h4>SAG: {i.sucursal}</h4>
                  </IonLabel>
                  <IonLabel>
                    <h4>{i.accion}</h4>
                  </IonLabel>
                  <IonIcon slot="end" icon={arrowForwardOutline} />
                </IonItem>
              </Link>
            ))}
          </IonList>
        )}
      </IonContent>
    </PageWrapper>
  );
};

export default Incidentes;
