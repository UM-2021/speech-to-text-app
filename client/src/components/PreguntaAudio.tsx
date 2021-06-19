import {
  IonButton,
  IonIcon,
  IonSegment,
  IonModal,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonItem,
} from '@ionic/react';
import {
  cameraOutline,
  keypadOutline,
  micOutline,
  checkmarkOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_RESPUESTA_FIELD } from '../actions/types';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Base64 } from '@ionic-native/base64';
import Loader from '../components/Loader';

// import { NativeAudio } from '@ionic-native/native-audio/';
import { Plugins, CameraResultType } from '@capacitor/core';

import './PreguntaAudio.css';
import axiosInstance from '../utils/axios';

const fs = require('fs');
const { Camera } = Plugins;

const PreguntaAudio: React.FC<{ preguntaId: string }> = ({ preguntaId }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const [path, setPath] = useState<string>('anterior');
  const [activeAudio, setActiveAudio] = useState<boolean>(false);
  const [audioFileHandler, setAudioFileHandler] = useState<any>({
    file: null,
    base64URL: '',
  });
  const [photo, setPhoto] = useState<any>('');
  const [showModal, setShowModal] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const { preguntas } = useSelector((state: any) => state.preguntas);
  const [processingAudio, setProcessingAudio] = useState<boolean>(false);

  const addAnswer = (respuesta: string, notas: string) => {
    const tipo = preguntas.find((p: any) => p.id === preguntaId).tipo;
    if (tipo === 'Opciones' || tipo === 'Numerica') {
      dispatch({
        type: ADD_RESPUESTA_FIELD,
        payload: { pregunta: preguntaId, notas },
      });
    } else {
      dispatch({
        type: ADD_RESPUESTA_FIELD,
        payload: { pregunta: preguntaId, respuesta, notas },
      });
    }
  };

  const addPhotoToAnswer = (photo: string) => {
    dispatch({
      type: ADD_RESPUESTA_FIELD,
      payload: { pregunta: preguntaId, photo },
    });
  };

  // ESTO SE COMENTA PORQUE EN BROWSER NO COMPILA SI NO
  const file = File.createFile(
    File.externalRootDirectory,
    'myaudio.mp3',
    true
  ).then((file) => {
    setPath(file.toInternalURL());
  });
  const [mediaObj, setMediaObj] = useState<MediaObject>(
    Media.create(
      File.externalRootDirectory.replace(/^file:\/\//, '') + 'myaudio.mp3'
    )
  );

  const recordAudio = async () => {
    if (!activeAudio) {
      mediaObj.startRecord();
    } else {
      mediaObj.stopRecord();
      mediaObj.release();
      Base64.encodeFile(path)
        .then((base64File: string) => {
          setStatus(base64File);
        })
        .catch((err) => setStatus(err));
      // await Base64.encodeFile(path);
    }
    setActiveAudio(!activeAudio);
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL: string | ArrayBuffer | null;
      baseURL = '';
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // console.log('Called', reader);
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = async (e: any) => {
    // TODO: Change to get file from device storage.
    setAudioFileHandler({
      ...audioFileHandler,
      file: e.target.files[0] as string,
    });
    const result = await getBase64(e.target.files[0]);
    setAudioFileHandler({ ...audioFileHandler, base64URL: result as string });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    var imageBase64 = image.base64String;
    addPhotoToAnswer(imageBase64 as string);
    setPhoto(imageBase64);
  };

  const processAudio = async (audio: string) => {
    setProcessingAudio(true);
    const { data } = await axiosInstance.post(
      `/api/auditorias/respuesta/transcribir/`,
      {
        audio,
      },
      {
        headers: {
          Authorization: `Token ${auth.user.token ?? ''}`,
        },
      }
    );
    addAnswer(data.respuesta as string, data.notas as string);
    setProcessingAudio(false);
  };

  return (
    <IonSegment className="ion-justify-content-between bg-color">
      <IonButton
        color={photo ? 'success' : 'light'}
        className="rounded "
        onClick={async () => await takePhoto()}
      >
        <IonIcon icon={cameraOutline} />
        {photo && <IonIcon icon={checkmarkOutline} />}
      </IonButton>
      <IonButton
        className="rounded"
        onClick={recordAudio}
        color={activeAudio ? 'danger' : ''}
      >
        <IonIcon icon={micOutline} />
      </IonButton>
      <IonButton color="light" className="rounded" onClick={openModal}>
        {/* TODO: Can send text response. */}
        {/* <IonInput className='keypad' onIonChange={e => addAnswer(e.detail.value!)} /> */}
        <IonIcon icon={keypadOutline} />
      </IonButton>
      <IonModal isOpen={showModal}>
        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>AUDIO ACTIONS</IonLabel>
          </IonItemDivider>

          <IonItem key="tit">
            <IonButton>Reproduce Audio</IonButton>
          </IonItem>
          <IonItem key="input">
            <div>
              <input type="file" name="file" onChange={handleFileInputChange} />
            </div>
          </IonItem>
          <IonItem key="process">
            {processingAudio ? (
              <Loader />
            ) : (
              <IonButton
                onClick={() => processAudio(audioFileHandler.base64URL)}
                style={{ width: '50%' }}
              >
                Send Audio to Process
              </IonButton>
            )}
          </IonItem>
        </IonItemGroup>
        <IonItem key="cancel">
          <IonButton
            color="danger"
            onClick={() => setShowModal(false)}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Go Back
          </IonButton>
        </IonItem>
      </IonModal>
    </IonSegment>
  );
};

export default PreguntaAudio;
