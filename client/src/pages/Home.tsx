/** @format */

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
  IonLabel
} from '@ionic/react';
import { add, storefrontOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSucursales } from '../actions/sucursalesActions';
import Loader from '../components/Loader';

import './Home.css';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const { loading, error, sucursales } = useSelector((state: any) => state.sucursales);

  useEffect(() => {
    dispatch(fetchSucursales());
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inicio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Link to="/auditoria/nueva">
          <IonButton expand="block" size="large" className="ion-margin" color="primary">
            <IonIcon icon={add} className="ion-float-start" />
            <span>Iniciar Auditoría</span>
          </IonButton>
        </Link>
        <div className="ion-margin list-container">
          <h3 className="ion-margin list-header">SAG Recientes</h3>
          {loading ? (
            <Loader />
          ) : (
            <IonList lines="full" className="list">
              {sucursales.map((a: any) => (
                <Link
                  key={a.id}
                  to={`/sucursal/perfil/${a.id}`}
                  style={{ textDecoration: 'none' }}>
                  <IonItem className="list-item" button>
                    <IonIcon slot="start" icon={storefrontOutline} />
                    <IonLabel>
                      <h3>{a.nombre}</h3>
                    </IonLabel>
                  </IonItem>
                </Link>
              ))}
            </IonList>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
