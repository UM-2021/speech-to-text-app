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
