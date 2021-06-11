import {
  IonAvatar,
  IonChip,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';

import { navigateCircleOutline } from 'ionicons/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const RespuestasAuditoria: React.FC = () => {
  const { loading, preguntas } = useSelector((state: any) => state.preguntas);
  const { loading: sucursalLoading, sucursal } = useSelector(
    (state: any) => state.sucursal
  );
  const {respuestas} = useSelector((state: any) => state.respuestas);

  if (loading || sucursalLoading) return <Loader />;
  return (
    <>
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
      <h6>{sucursal.nombre}</h6>

      <IonList lines="none">
        <IonListHeader>
          <h6>
            <strong>Datos Auditoría</strong>
          </h6>
        </IonListHeader>
        {preguntas.map((pregunta: any, index: number) => (
          <div key={index}>
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
