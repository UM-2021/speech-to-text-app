/** @format */
/* eslint-disable no-unused-vars */

import { IonButton, IonIcon, IonInput, IonSegment } from '@ionic/react';
import { cameraOutline, keypadOutline, micOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_RESPUESTA_FIELD } from '../actions/types';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Base64 } from '@ionic-native/base64';
import fs from 'fs';

import './PreguntaAudio.css';

const PreguntaAudio: React.FC<{ preguntaId: string }> = ({ preguntaId }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState<string>('');
  const [path, setPath] = useState<string>('anterior');
  const [activeAudio, setActiveAudio] = useState<boolean>(false);
  const [audioFileHandler, setAudioFileHandler] = useState<any>({
    file: null,
    base64URL: ''
  });

  const addAnswer = (value: string) => {
    dispatch({
      type: ADD_RESPUESTA_FIELD,
      payload: { pregunta: preguntaId, audio: value }
    });
  };

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
    //   setStatus('recording...');
    //   mediaObj.startRecord();
    // } else {
    //   setStatus('stopped');
    //   mediaObj.stopRecord();
    //   mediaObj.release();
    //   Base64.encodeFile(path)
    //     .then((base64File: string) => {
    //       setStatus(base64File);
    //     })
    //     .catch((err) => setStatus('FALSO TODO'));
    //   // // await Base64.encodeFile(path);
    // }
    // setActiveAudio(!activeAudio);
  };

  const getBase64 = (file: any) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL: string | ArrayBuffer | null;

      baseURL = '';
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log('Called', reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const handleFileInputChange = async (e: any) => {
    // TODO: Change to get file from device storage.
    setAudioFileHandler({ ...audioFileHandler, file: e.target.files[0] });

    // let file = audioFileHandler.file;
    const result = await getBase64(e.target.files[0]);
    setAudioFileHandler({ base64URL: result, ...audioFileHandler });

    addAnswer(String(result));
  };

  return (
    <IonSegment className="ion-justify-content-between bg-color">
      {/* <div>
				<input type='file' name='file' onChange={handleFileInputChange} />
			</div> */}
      <IonButton color="light" className="rounded ">
        <IonIcon icon={cameraOutline} />
      </IonButton>
      <IonButton
        className="rounded"
        onClick={recordAudio}
        color={activeAudio ? 'danger' : ''}>
        <IonIcon icon={micOutline} />
      </IonButton>
      <IonButton color="light" className="rounded">
        {/* TODO: Can send text response. */}
        {/* <IonInput className='keypad' onIonChange={e => addAnswer(e.detail.value!)} /> */}
        <IonIcon icon={keypadOutline} />
      </IonButton>
    </IonSegment>
  );
};

export default PreguntaAudio;
