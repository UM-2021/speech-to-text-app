import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonIcon,
  IonItem,
  IonLabel,
  IonSearchbar,
} from '@ionic/react';
import axios from 'axios';
import { arrowForwardOutline, storefrontOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSucursales } from '../actions/sucursalesActions';
import Loader from '../components/Loader';
import PageWrapper from '../components/PageWrapper';

interface IBaseSucursal {
  id: string;
  nombre: string;
}

const Sucursales: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, sucursales } = useSelector(
    (state: any) => state.sucursales
  );

  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    dispatch(fetchSucursales());
  }, [dispatch]);

  return (
    <PageWrapper>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sucursales</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sucursales</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSearchbar
          placeholder="Busca una sucursal..."
          showCancelButton="focus"
          showClearButton="focus"
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>
        {loading ? (
          <Loader />
        ) : (
          <IonList>
            {sucursales.map((s: any) => {
              if (
                s.nombre.toLowerCase().includes(searchText.toLocaleLowerCase())
              ) {
                return (
                  <Link
                    key={s.id}
                    to={`/sucursal/perfil/${s.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <IonItem button>
                      <IonIcon slot="start" icon={storefrontOutline} />
                      <IonLabel>{s.nombre}</IonLabel>
                      <IonIcon slot="end" icon={arrowForwardOutline} />
                    </IonItem>
                  </Link>
                );
              }
            })}
          </IonList>
        )}
      </IonContent>
    </PageWrapper>
  );
};

export default Sucursales;
