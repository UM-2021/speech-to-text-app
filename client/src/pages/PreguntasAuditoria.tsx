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
  IonToast,
} from '@ionic/react';

import './PreguntasAuditoria.css';
import Pregunta from '../components/Pregunta';
import RespuestasAuditoria from '../components/RespuestasAuditoria';
import axios from 'axios';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAuditoria,
  fetchPreguntas,
  postRespuestas,
} from '../actions/auditoriasActions';
import { RESPUESTAS_RESET } from '../actions/types';
import PageWrapper from '../components/PageWrapper';

interface IRespuesta {
  respuesta: string;
  notas?: string;
  auditoria: string;
  pregunta: string;
  // validez: boolean;
}

interface IPregunta {
  id: string;
  pregunta: string;
  tipo: string;
  opciones?: string[];
}

const PreguntasAuditoria: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, preguntas } = useSelector(
    (state: any) => state.preguntas
  );
  const { loading: auditoriaLoading, auditoria } = useSelector(
    (state: any) => state.auditoria
  );
  const [submitted, setSubmitted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    dispatch(fetchAuditoria(match.params.id));
    dispatch(fetchPreguntas());
  }, [dispatch, match.params.id]);

  const handleSubmit = () => {
    // 	respuestas.map(async r => {
    // 		await axios.post('http://localhost:8000/api/auditorias/respuesta/', r);
    // 	});
    // 	// setLoading(false);
    // 	setSubmitted(true);
    // 	setTimeout(() => history.push('/'), 3000);
  };

  const submitResponse = (payload: any) => {
    // 	// WORKAROUND: We have to improve it.
    // 	// Delete record of that question.
    // 	const auxArray = respuestas.filter(r => r.pregunta !== payload.pregunta);
    // 	// Add the updated one.
    // 	auxArray.push({ ...payload, auditoria });
    // 	setRespuestas([...auxArray]);
  };

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
          {auditoriaLoading ? (
            <Loader />
          ) : (
            <IonSlides
              className="slider"
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
                    categoria={p.categoria}
                    opciones={p.opciones}
                  />
                </IonSlide>
              ))}

              <IonSlide>
                {showLoader ? (
                  <Loader />
                ) : (
                  <div>
                    <RespuestasAuditoria />
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
