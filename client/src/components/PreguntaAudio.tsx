import { IonButton, IonIcon, IonSegment } from '@ionic/react';
import { cameraOutline, keypadOutline, micOutline } from 'ionicons/icons';
import React, { useState }  from 'react';

import {File} from '@ionic-native/file';
import {Media, MediaObject} from '@ionic-native/media';

import axios from 'axios';

import './PreguntaAudio.css';

const PreguntaAudio: React.FC = () => {
	const [status, setStatus] = useState<string>("");
	const [availableAudio, setAvailableAudio] = useState<boolean>(true);
	const [mediaObj, setMediaObj] = useState<MediaObject>(Media.create(File.externalRootDirectory));

	const recordAudio = () => {
		setStatus("recording...");
		mediaObj.startRecord();
	}
	
	const stopRecording = () => {
		setStatus("stopped");
		mediaObj.stopRecord();
		mediaObj.release();
	}


	// const sendAudio = () => {
	// 	// const reader = new FileReader();
	// 	// reader.onload = () => {
	// 	//   const formData = new FormData();
	// 	//   // formData.append("file", new Blob([reader.result]), file.name);  // Found both online
	// 	//   formData.append("file", new Blob([reader.result]));  // Tested both with same behavior.
	
	// 	//   const url = "http://"; // server
	// 	//   axios.post(url, {
	// 	// 	headers: {
	// 	// 	  "Content-Type": `multipart/form-data;`, // boundary=${dat._boundary}`,
	// 	// 	},
	// 	// 	data: formData,
	// 	// 	}
	// 	//   ).then((res) => {
	// 	// 	console.log(res);
	// 	//   });
	// 	// }
	// 	// reader.readAsArrayBuffer(audioFile);

	// 	//eliminar el audio
	// }

	return (
		<IonSegment className='ion-justify-content-between bg-color'>
			<h1>{status}</h1>
			<IonButton color='light' className='rounded '>
				<IonIcon icon={cameraOutline} />
			</IonButton>
			<IonButton className='rounded' onClick={recordAudio}>
				<IonIcon icon={micOutline} />
			</IonButton>
			<IonButton color='light' className='rounded' onClick={stopRecording}>
				<IonIcon icon={keypadOutline} />
			</IonButton>
		</IonSegment>
	);
};

export default PreguntaAudio;
