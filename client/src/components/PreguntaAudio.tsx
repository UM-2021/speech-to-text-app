import { IonButton, IonIcon, IonSegment } from '@ionic/react';
import { cameraOutline, keypadOutline, micOutline } from 'ionicons/icons';
import React, { useState } from 'react';

import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Base64 } from '@ionic-native/base64';

import axios from 'axios';

import './PreguntaAudio.css';

const fs = require('fs');

const PreguntaAudio: React.FC<{
  submitResponse: (n: string, a?: string) => void;
}> = ({ submitResponse }) => {
  const [status, setStatus] = useState<string>('');

  const [path, setPath] = useState<string>('anterior');

  const [blob, setBlob] = useState<Blob>(new Blob());

  const [activeAudio, setActiveAudio] = useState<boolean>(false);

  const [myState, setMyState] = useState<any>({ file: null, base64URL: '' });

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
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL: string | ArrayBuffer | null;
      baseURL = '';
      let reader = new FileReader();
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

  const handleFileInputChange = (e: any) => {
    myState.file = null;
    let file = myState.file;
    file = e.target.files[0];
    getBase64(file)
      .then((result) => {
        file['base64'] = result;
        console.log('File Is', file);
        setMyState({
          base64URL: result,
          file,
        });
        submitResponse('Respuesta con audio', result as string);
      })
      .catch((err) => {
        console.log(err);
      });
    setMyState({
      file: e.target.files[0],
    });
  };

  return (
    <IonSegment className="ion-justify-content-between bg-color">
      <div>
        <input type="file" name="file" onChange={handleFileInputChange} />
      </div>
      <IonButton color="light" className="rounded ">
        <IonIcon icon={cameraOutline} />
      </IonButton>
      <IonButton
        className="rounded"
        onClick={recordAudio}
        color={activeAudio ? 'danger' : ''}
      >
        <IonIcon icon={micOutline} />
      </IonButton>
      <IonButton color="light" className="rounded">
        <IonIcon icon={keypadOutline} />
      </IonButton>
    </IonSegment>
  );
};

export default PreguntaAudio;
