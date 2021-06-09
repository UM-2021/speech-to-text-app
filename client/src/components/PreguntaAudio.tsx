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
import { cameraOutline, keypadOutline, micOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_RESPUESTA_FIELD } from '../actions/types';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Base64 } from '@ionic-native/base64';

import { NativeAudio } from '@ionic-native/native-audio/';
import { Plugins, CameraResultType } from '@capacitor/core';

import './PreguntaAudio.css';
import axios from 'axios';

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
  const { auth } = useSelector((state: any) => state.auth);

  const addAnswer = (value: string) => {
    dispatch({
      type: ADD_RESPUESTA_FIELD,
      payload: { pregunta: preguntaId, audio: value },
    });
    //enrealidad esto se va a dar cuando vuelva el procesamiento del audio y va a hacer:
    // dispatch({
    //   type: ADD_RESPUESTA_FIELD,
    //   payload: { pregunta: preguntaId, respuesta, notas },
    // });
  };

  // ESTO SE COMENTA PORQUE EN BROWSER NO COMPILA SI NO
  // const file = File.createFile(
  //   File.externalRootDirectory,
  //   'myaudio.mp3',
  //   true
  // ).then((file) => {
  //   setPath(file.toInternalURL());
  // });
  // const [mediaObj, setMediaObj] = useState<MediaObject>(
  //   Media.create(
  //     File.externalRootDirectory.replace(/^file:\/\//, '') + 'myaudio.mp3'
  //   )
  // );

  const recordAudio = async () => {
    // if (!activeAudio) {
    //   mediaObj.startRecord();
    // } else {
    //   mediaObj.stopRecord();
    //   mediaObj.release();
    //   Base64.encodeFile(path)
    //     .then((base64File: string) => {
    //       setStatus(base64File);
    //     })
    //     .catch((err) => setStatus('FALSO TODO'));
    //   // await Base64.encodeFile(path);
    // }
    // setActiveAudio(!activeAudio);
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
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
    addAnswer(result as string);
  };

  const openModal = () => {
    setShowModal(true);
    // console.log(audioFileHandler);
    // NativeAudio.preloadSimple(
    //   'uniqueId1',
    //   'C:\\Users\\Usuario\\Desktop\\audiotest.mp3'
    // ).then();
  };

  // const [nativeAudio, setNativeAudio] = useState<typeof NativeAudio>(
  //   new NativeAudioOriginal()
  // );
  const reproduceNativeAudio = () => {
    // nativeAudio.preloadSimple('uniqueId1', audioFileHandler.file).then();
    // NativeAudio.play('uniqueId1').then();
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    var imageBase64 = image.base64String;
    console.log(imageBase64);
    setPhoto(imageBase64);
  };

  const processPhoto = async (photo: any) => {
    // aca se va poner la photo en base64 y agregarla a la repsuesta
    // const res = await getBase64(photo);
    // console.log(photo);
    // addAnswer(res.respuesta as string, res.notas as string);
  };

  const processAudio = async (audio: string) => {
    // dispatch de una accion que tenga el audio y la pregunta
    // const { data } = await axios.post(
    //   `http://10.0.2.2:8000/api/auditorias/respuesta/1/transcripcion`,
    //   {
    //     audio,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Token ${auth.user.token ?? ''}`,
    //     },
    //   }
    // );
    // console.log(data);
    console.log(photo);
    setShowModal(false);
  };

  return (
    <IonSegment className="ion-justify-content-between bg-color">
      <IonButton
        color="light"
        className="rounded "
        onClick={async () => await takePhoto()}
      >
        <IonIcon icon={cameraOutline} />
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
            <IonButton onClick={reproduceNativeAudio}>
              Reproduce Audio
            </IonButton>
          </IonItem>
          <IonItem key="input">
            <div>
              <input type="file" name="file" onChange={handleFileInputChange} />
            </div>
          </IonItem>
          <IonItem key="process">
            <IonButton
              onClick={() => processAudio(audioFileHandler.base64URL)}
              style={{ width: '50%' }}
            >
              Send Audio to Process
            </IonButton>
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
