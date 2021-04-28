import { IonButton, IonIcon, IonInput, IonSegment } from '@ionic/react';
import { cameraOutline, keypadOutline, micOutline } from 'ionicons/icons';
import React, { useState } from 'react';

import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';

import './PreguntaAudio.css';

const PreguntaAudio: React.FC<{ submitResponse: (s: string) => void }> = ({ submitResponse }) => {
	const audioFile: MediaObject = Media.create(File.externalRootDirectory + '/audiofile.mp3');
	const [text, setText] = useState('');

	const recordAudio = () => {
		audioFile.startRecord();
	};
	const stopRecording = () => {
		audioFile.stopRecord();
	};

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
