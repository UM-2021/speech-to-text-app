import {
  IonAvatar,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';

import { navigateCircleOutline } from 'ionicons/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const RespuestasAuditoria: React.FC = () => {
  const { loading, preguntas } = useSelector((state: any) => state.preguntas);
  const { loading: sucursalLoading, sucursal } = useSelector(
    (state: any) => state.sucursal
  );
  const respuestas = useSelector((state: any) => state.respuestas);

  if (loading || sucursalLoading) return <Loader />;
  return (
    <>
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
            {sucursal!.direccion}, {sucursal!.ciudad}
          </IonLabel>
        </IonChip>
      </div>
      <h6>{sucursal.nombre}</h6>

      <IonList lines="none">
        <IonListHeader>
          <h6>
            <strong>Datos Auditoría</strong>
          </h6>
        </IonListHeader>
        {preguntas.map((pregunta: any, index: number) => (
          <IonItem>
            <IonLabel color="medium" slot="start" style={{ flexGrow: 2 }}>
              {pregunta.pregunta}
            </IonLabel>
            {respuestas.length === preguntas.length && (
              <IonLabel slot="end">{respuestas[index].respuesta}</IonLabel>
            )}
          </IonItem>
        ))}
        {preguntas.map((pregunta: any, index: number) => (
          <div>
            <IonLabel color="medium" slot="start" style={{ flexGrow: 2 }}>
              {pregunta.pregunta}
            </IonLabel>
            <br />
            {respuestas.length === preguntas.length && (
              <IonLabel>{respuestas[index].respuesta}</IonLabel>
            )}
          </div>
        ))}
      </IonList>
    </>
  );
};

export default RespuestasAuditoria;
