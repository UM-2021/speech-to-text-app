/** @format */

import {
  IonAvatar,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader
} from '@ionic/react';

import { navigateCircleOutline, storefrontOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSucursal } from '../actions/sucursalesActions';
import Loader from './Loader';

import './PerfilSucursal.css';

const PerfilSucursal: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { loading, error, sucursal } = useSelector((state: any) => state.sucursal);

  useEffect(() => {
    dispatch(fetchSucursal(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  else
    return (
      <div>
        <div className="center-content avatar-cont">
          <IonAvatar className="center-content avatar">
            <IonIcon color="primary" icon={storefrontOutline} />
          </IonAvatar>
        </div>
        <div className="center-content" style={{ marginBottom: '3rem' }}>
          <IonChip>
            <IonAvatar>
              <IonIcon
                color="primary"
                style={{ fontSize: '26px' }}
                icon={navigateCircleOutline}
              />
            </IonAvatar>
            <IonLabel>
              {sucursal.direccion}, {sucursal.ciudad}
            </IonLabel>
          </IonChip>
        </div>

        <IonList lines="none">
          <IonListHeader>
            <h3>
              <strong>Datos SAG</strong>
            </h3>
          </IonListHeader>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Nro de SAG
            </IonLabel>
            <IonLabel>5342</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Nombre de SAG
            </IonLabel>
            <IonLabel>{sucursal.nombre}</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Departamento
            </IonLabel>
            <IonLabel>{sucursal.ciudad}</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Teléfono
            </IonLabel>
            <IonLabel>{sucursal.telefono}</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Último responsable
            </IonLabel>
            <IonLabel>Lea</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Celular
            </IonLabel>
            <IonLabel>098 435 328</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Razón social
            </IonLabel>
            <IonLabel>JC S.A</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              R.U.T
            </IonLabel>
            <IonLabel>1122332255330016</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Tipo de negocio anexo
            </IonLabel>
            <IonLabel>Cambio</IonLabel>
          </IonItem>
          <IonItem className="">
            <IonLabel color="medium" slot="start">
              Acceso al local
            </IonLabel>
            <IonLabel>Desde la calle</IonLabel>
          </IonItem>
        </IonList>
      </div>
    );
};

export default PerfilSucursal;
