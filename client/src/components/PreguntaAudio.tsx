<<<<<<< HEAD
import { IonButton, IonIcon, IonSegment } from "@ionic/react";
import { cameraOutline, keypadOutline, micOutline } from "ionicons/icons";
import React, { useState } from "react";

import { File } from "@ionic-native/file";
import { Media, MediaObject } from "@ionic-native/media";
import { Base64 } from "@ionic-native/base64";

import axios from "axios";

import "./PreguntaAudio.css";

const fs = require("fs");

const PreguntaAudio: React.FC = () => {
  const [status, setStatus] = useState<string>("");

  const [path, setPath] = useState<string>("anterior");

  const [blob, setBlob] = useState<Blob>(new Blob());

  const [activeAudio, setActiveAudio] = useState<boolean>(false);

  const [myState, setMyState] = useState<Object>({ file: null, base64URL: "" });

  const file = File.createFile(
    File.externalRootDirectory,
    "myaudio.mp3",
    true
  ).then((file) => {
    setPath(file.toInternalURL());
  });
  const [mediaObj, setMediaObj] = useState<MediaObject>(
    Media.create(
      File.externalRootDirectory.replace(/^file:\/\//, "") + "myaudio.mp3"
    )
  );

  const recordAudio = async () => {
    if (!activeAudio) {
      setStatus("recording...");
      mediaObj.startRecord();
    } else {
      setStatus("stopped");
      mediaObj.stopRecord();
      mediaObj.release();
      Base64.encodeFile(path)
        .then((base64File: string) => {
          setStatus(base64File);
        })
        .catch((err) => setStatus("FALSO TODO"));
      // // await Base64.encodeFile(path);
    }
    setActiveAudio(!activeAudio);
  };

  //   function submitForm(contentType, data) {
  // 	axios({
  // 		url: 'http://localhost:8000/api/auditoria/respuesta',
  // 		method: 'POST',
  // 		data: data,
  // 		headers: {
  // 			'Content-Type': contentType
  // 		}
  // 	})
  //    }

  //   const sendAudio = () => {
  // 	const toBase64 = file => new Promise((resolve, reject) => {
  // 		const reader = new FileReader();
  // 		reader.readAsDataURL(file);
  // 		reader.onload = () => resolve(reader.result);
  // 		reader.onerror = error => reject(error);
  // 	});

  // 	const data = {
  // 		title: title,
  // 		file: await toBase64(file),
  // 		desc: desc
  // 	}

  // 	submitForm("application/json", data, (msg) => console.log(msg));

  // const reader = new FileReader();
  // reader.onload = () => {
  //   const formData = new FormData();
  //   // formData.append("file", new Blob([reader.result]), file.name);  // Found both online
  //   formData.append(mediaObj, new Blob([reader.result]));  // Tested both with same behavior.
  //   const url = "http://"; // server
  //   axios.post(url, {
  // 	headers: {
  // 	  "Content-Type": `multipart/form-data;`, // boundary=${dat._boundary}`,
  // 	},
  // 	data: formData,
  // 	}
  //   ).then((res) => {
  // 	console.log(res);
  //   });
  // }
  // reader.readAsArrayBuffer(mediaObj);
  // eliminar el audio

  // const config = {
  // 	encoding: LINEAR16,
  // 	sampleRateHertz: 16000,
  // 	languageCode: es-AR,
  // };
  // const audio = {
  // 	content: fs.readFileSync(filename).toString('base64'),
  // };

  // const request = {
  // 	config: config,
  // 	audio: audio,
  // 	// };

  //   };

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL: string | ArrayBuffer | null;
      baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const handleFileInputChange = (e: any) => {
    // console.log(e.target.files[0]);
    let file = myState.file;

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", file);
        setMyState({
          base64URL: result,
          file,
        });
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
        {status}
      </IonButton>
      <IonButton
        className="rounded"
        onClick={recordAudio}
        color={activeAudio ? "danger" : ""}
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
=======
import { IonButton, IonIcon, IonInput, IonSegment } from '@ionic/react';
import { cameraOutline, keypadOutline, micOutline } from 'ionicons/icons';
import React, { useState } from 'react';

import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';

import './PreguntaAudio.css';

const PreguntaAudio: React.FC<{ submitResponse: (s: string) => void }> = ({ submitResponse }) => {
	const [text, setText] = useState('');

	const [path, setPath] = useState<string>('anterior');

	const [blob, setBlob] = useState<Blob>(new Blob());

	const [availableAudio, setAvailableAudio] = useState<boolean>(true);

	// const file = File.createFile(File.externalRootDirectory, 'myaudio.mp3', true).then(file => {
	// 	setPath(file.toInternalURL());
	// });
	// const [mediaObj, setMediaObj] = useState<MediaObject>(
	// 	Media.create(File.externalRootDirectory.replace(/^file:\/\//, '') + 'myaudio.mp3')
	// );

	const recordAudio = () => {
		// mediaObj.startRecord();
	};

	const stopRecording = async () => {
		// mediaObj.stopRecord();
		// mediaObj.release();
		// await makeFileIntoBlob(path);
	};
	// const makeFileIntoBlob = (mypath: string) => {
	// 	return new Promise((resolve, reject) => {
	// 		let fileName,
	// 			fileExtension = '';
	// 		File.resolveLocalFilesystemUrl(mypath)
	// 			.then(fileEntry => {
	// 				let { name, nativeURL } = fileEntry;
	// 				// get the path..
	// 				let fnpath = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
	// 				fileName = name;
	// 				// if you already know the file extension, just assign it to           // variable below
	// 				fileExtension = '.mp3';
	// 				// we are provided the name, so now read the file into a buffer
	// 				return File.readAsArrayBuffer(fnpath, name);
	// 			})
	// 			.then((buffer: ArrayBuffer) => {
	// 				// get the buffer and make a blob to be saved
	// 				let medBlob = new Blob([buffer], {
	// 					type: `audio/${fileExtension}`
	// 				});
	// 				// pass back blob and the name of the file for saving
	// 				// into fire base
	// 				const opt = { replace: true };
	// 				File.writeFile(File.externalRootDirectory, 'myaudio.mp3', medBlob, opt);
	// 				setBlob(medBlob);
	// 				resolve({ blob: medBlob });
	// 			})
	// 			.catch(err => reject(err));
	// 	});
	// };
	return (
		<IonSegment className='ion-justify-content-between bg-color'>
			<IonButton color='light' className='rounded '>
				<IonIcon icon={cameraOutline} />
			</IonButton>
			<IonButton className='rounded' onClick={recordAudio}>
				<IonIcon icon={micOutline} />
			</IonButton>
			<IonButton color='light' className='rounded'>
				<IonInput className='keypad' onIonChange={e => submitResponse(e.detail.value!)} />
				<IonIcon icon={keypadOutline} />
			</IonButton>
		</IonSegment>
	);
};

export default PreguntaAudio;

//   function submitForm(contentType, data) {
// 	axios({
// 		url: 'http://localhost:8000/api/auditoria/respuesta',
// 		method: 'POST',
// 		data: data,
// 		headers: {
// 			'Content-Type': contentType
// 		}
// 	})
//    }

//   const sendAudio = () => {
// 	const toBase64 = file => new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.readAsDataURL(file);
// 		reader.onload = () => resolve(reader.result);
// 		reader.onerror = error => reject(error);
// 	});

// 	const data = {
// 		title: title,
// 		file: await toBase64(file),
// 		desc: desc
// 	}

// 	submitForm("application/json", data, (msg) => console.log(msg));

// const reader = new FileReader();
// reader.onload = () => {
//   const formData = new FormData();
//   // formData.append("file", new Blob([reader.result]), file.name);  // Found both online
//   formData.append(mediaObj, new Blob([reader.result]));  // Tested both with same behavior.
//   const url = "http://"; // server
//   axios.post(url, {
// 	headers: {
// 	  "Content-Type": `multipart/form-data;`, // boundary=${dat._boundary}`,
// 	},
// 	data: formData,
// 	}
//   ).then((res) => {
// 	console.log(res);
//   });
// }
// reader.readAsArrayBuffer(mediaObj);
// eliminar el audio

// const config = {
// 	encoding: LINEAR16,
// 	sampleRateHertz: 16000,
// 	languageCode: es-AR,
// };
// const audio = {
// 	content: fs.readFileSync(filename).toString('base64'),
// };

// const request = {
// 	config: config,
// 	audio: audio,
// 	// };

//   };
>>>>>>> 84c361ac3233bfd63b3b4897bb1fa680292b4441
