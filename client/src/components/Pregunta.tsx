/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_RESPUESTA } from '../actions/types';

import './Pregunta.css';
import PreguntaAudio from './PreguntaAudio';
import PreguntaNumerica from './PreguntaNumerica';
import PreguntaOpciones from './PreguntaOpciones';

interface IPregunta {
  id: string;
  auditoriaId: string;
  pregunta: string;
  tipo: string;
  opciones?: any;
}

const Pregunta: React.FC<IPregunta> = ({ id, tipo, pregunta, opciones, auditoriaId }) => {
  const dispatch = useDispatch();

  const respuestas = useSelector((state: any) => state.respuestas);
  useEffect(() => {
    dispatch({
      type: ADD_RESPUESTA,
      payload: { pregunta: id, isAnswered: false, auditoria: auditoriaId }
    });
  }, [dispatch, id, auditoriaId]);

  return (
    <div className="ion-padding flex ion-margin-vertical">
      <div>
        <h3>{pregunta}</h3>
      </div>
      <div>
        <h5>
          <i>Respuesta: </i>
        </h5>
        <div>
          {respuestas.filter((r: any) => r.pregunta === parseInt(id) && r.isAnswered)[0]
            ?.respuesta || ''}
        </div>
      </div>

      <div className="shrink">
        {tipo === 'audi' && <div></div>}
        {tipo === 'opci' && <PreguntaOpciones opciones={opciones} preguntaId={id} />}
        {tipo === 'nume' && <PreguntaNumerica preguntaId={id} />}
        <PreguntaAudio preguntaId={id} />
      </div>
    </div>
  );
};

export default Pregunta;
