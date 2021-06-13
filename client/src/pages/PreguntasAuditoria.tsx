import React, { useEffect, useRef, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonButtons,
  IonButton,
  IonToast,
} from '@ionic/react';

import './PreguntasAuditoria.css';
import Pregunta from '../components/Pregunta';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAuditoria,
  fetchPreguntas,
  fetchRespuestas,
  postRespuestas,
} from '../actions/auditoriasActions';
import {
  CREATE_OR_GET_AUDITORIA_RESET,
  FETCH_PREGUNTAS_RESET,
  RESPUESTAS_RESET,
} from '../actions/types';
import PageWrapper from '../components/PageWrapper';
import RespuestasAuditoriaList from '../components/RespuestasAuditoriaList';
import Message from '../components/Message';

const PreguntasAuditoria: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const sucursalId = match.params.id;

  const {
    preguntas,
    loading: loadingPreguntas,
    error: errorPreguntas,
  } = useSelector((state: any) => state.preguntas);
  const {
    auditoria,
    loading: loadingAuditoria,
    success,
    error: errorAuditoria,
  } = useSelector((state: any) => state.auditoria);
  const {
    respuestas,
    loading: loadingRespuestas,
    error: errorRespuestas,
  } = useSelector((state: any) => state.respuestas);

  const [submitted, setSubmitted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (success) {
      dispatch(fetchRespuestas(auditoria.id));
    }
  }, [dispatch, auditoria, success]);

  useEffect(() => {
    dispatch(fetchAuditoria(sucursalId));
    dispatch(fetchPreguntas());
  }, [dispatch, sucursalId]);

  const onExit = () => {
    history.goBack();
    dispatch({ type: RESPUESTAS_RESET });
    dispatch({ type: FETCH_PREGUNTAS_RESET });
    dispatch({ type: CREATE_OR_GET_AUDITORIA_RESET });
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

  if (loadingPreguntas || loadingRespuestas || loadingAuditoria)
    return <Loader />;
  else
    return (
      <PageWrapper>
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
          {errorPreguntas ? (
            <Message color="danger">{errorPreguntas}</Message>
          ) : errorAuditoria ? (
            <Message color="danger">{errorAuditoria}</Message>
          ) : errorRespuestas ? (
            <Message color="danger">{errorRespuestas}</Message>
          ) : (
            <IonSlides
              pager={true}
              options={{
                initialSlide: 0,
                speed: 400,
              }}
            >
              {preguntas.map((p: any) => (
                <IonSlide key={p.id}>
                  <Pregunta
                    auditoriaId={auditoria.id}
                    pregunta={p.pregunta}
                    id={p.id}
                    tipo={p.tipo}
                    opciones={p.opciones}
                    categoria={p.categoria}
                    respuesta={
                      respuestas.filter((r: any) => r.pregunta === p.id)[0] ||
                      {}
                    }
                    respuestaCorrecta={p.respuesta_correcta}
                  />
                </IonSlide>
              ))}

              <IonSlide>
                {showLoader && success ? (
                  <Loader />
                ) : (
                  <div>
                    <RespuestasAuditoriaList
                      auditoria={auditoria.id}
                      preguntas={preguntas}
                      respuestas={respuestas}
                    />
                    <IonButton
                      expand="block"
                      color="primary"
                      onClick={onSubmit}
                    >
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
      </PageWrapper>
    );
};

export default PreguntasAuditoria;

function useTraceUpdate(props: any) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps: any, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}
