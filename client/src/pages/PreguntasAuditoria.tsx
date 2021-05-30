/** @format */

import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonButtons,
  IonButton,
  IonToast
} from '@ionic/react';

import './PreguntasAuditoria.css';
import Pregunta from '../components/Pregunta';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAuditoria,
  fetchPreguntas,
  postRespuestas
} from '../actions/auditoriasActions';
import { RESPUESTAS_RESET } from '../actions/types';

const PreguntasAuditoria: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { loading, error, preguntas } = useSelector((state: any) => state.preguntas);
  const { loading: auditoriaLoading, auditoria } = useSelector(
    (state: any) => state.auditoria
  );
  const [submitted, setSubmitted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    dispatch(fetchAuditoria(match.params.id));
    dispatch(fetchPreguntas());
  }, [dispatch, match.params.id]);

  const onExit = () => {
    history.goBack();
    dispatch({ type: RESPUESTAS_RESET });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setShowLoader(true);
    dispatch(postRespuestas());
    setTimeout(() => {
      setSubmitted(true);
      setShowLoader(false);
      history.push('/home');
    }, 1500);
  };

  if (loading) return <Loader />;
  else
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Nueva Auditoría</IonTitle>
            <IonButtons slot="end">
              <IonButton color="danger" onClick={onExit}>
                Salir
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonToast
            isOpen={submitted}
            position="top"
            message="Auditoría guardada satisfactoriamente!"
            duration={3000}
          />
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Nueva Auditoría</IonTitle>
            </IonToolbar>
          </IonHeader>
          {auditoriaLoading ? (
            <Loader />
          ) : (
            <IonSlides
              className="slider"
              pager={true}
              options={{
                initialSlide: 0,
                speed: 400
              }}>
              {preguntas.map((p: any) => (
                <IonSlide key={p.id}>
                  <Pregunta
                    auditoriaId={auditoria.id}
                    pregunta={p.pregunta}
                    id={p.id}
                    tipo={p.tipo}
                    opciones={p.opciones}
                  />
                </IonSlide>
              ))}

              <IonSlide>
                {showLoader ? (
                  <Loader />
                ) : (
                  <div>
                    <IonButton expand="block" color="primary" onClick={onSubmit}>
                      Enviar
                    </IonButton>
                    <IonButton expand="block" color="danger">
                      Cancelar
                    </IonButton>
                  </div>
                )}
              </IonSlide>
            </IonSlides>
          )}
        </IonContent>
      </IonPage>
    );
};

export default PreguntasAuditoria;
