import { IonButton, IonIcon, IonSegment } from '@ionic/react';
import { cameraOutline, keypadOutline, micOutline } from 'ionicons/icons';
import React, { useState }  from 'react';

import {File} from '@ionic-native/file';
import {Media, MediaObject} from '@ionic-native/media';

import './PreguntaAudio.css';

const PreguntaAudio: React.FC = () => {
	const [status, setStatus] = useState<string>('');

	const audioFile: MediaObject = Media.create(File.externalRootDirectory + '/audiofile.mp3'); 

	const recordAudio = () => {
		audioFile.startRecord();
		setStatus("recording...");
	}
	const stopRecording = () => {
		audioFile.stopRecord();
		setStatus("stopped");
	}

	return (
		<IonSegment className='ion-justify-content-between bg-color ion-margin-top'>
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
