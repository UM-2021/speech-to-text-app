import {
	IonButton,
	IonIcon,
	IonSegment,
	IonModal,
	IonPopover,
	IonCard,
	IonCardContent,
	IonRange,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonContent,
	IonTextarea,
	IonAlert
} from '@ionic/react';
import {
	cameraOutline,
	micOutline,
	checkmarkOutline,
	playCircle,
	pauseCircle,
	createOutline,
	close,
	closeCircle
} from 'ionicons/icons';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_RESPUESTA_FIELD } from '../actions/types';
import { File, FileEntry } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Base64 } from '@ionic-native/base64';
import Loader from '../components/Loader';

// import { NativeAudio } from '@ionic-native/native-audio/';
import { Plugins, CameraResultType } from '@capacitor/core';

import './PreguntaAudio.css';
import axiosInstance from '../utils/axios';
import { setTimeout } from 'timers';

const { Camera } = Plugins;

const PreguntaAudio: React.FC<{ preguntaId: string }> = ({ preguntaId }) => {
	const dispatch = useDispatch();
	const { preguntas } = useSelector((state: any) => state.preguntas);
	const { user } = useSelector((state: any) => state.auth);

	const [activeAudio, setActiveAudio] = useState<boolean>(false);
	const [photo, setPhoto] = useState<any>('');
	const [showModal, setShowModal] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [notes, setNotes] = useState('');

	const [processingAudio, setProcessingAudio] = useState<boolean>(false);
	const [file, setFile] = useState<FileEntry | null>(null);
	const [recording, setRecording] = useState<MediaObject | null>(null);
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [popoverState, setShowPopover] = useState({
		showPopover: false,
		event: undefined
	});
	let timeout: any = useRef(setTimeout(() => {}, 0));
	let isPopover = useRef(true);

	const addAnswer = (respuesta: string, notas: string) => {
		const tipo = preguntas.find((p: any) => p.id === preguntaId).tipo;
		if (tipo === 'Opciones' || tipo === 'Numerica') {
			dispatch({
				type: ADD_RESPUESTA_FIELD,
				payload: { pregunta: preguntaId, notas }
			});
		} else {
			dispatch({
				type: ADD_RESPUESTA_FIELD,
				payload: { pregunta: preguntaId, respuesta, notas }
			});
		}
	};

	const addPhotoToAnswer = (photo: string) => {
		dispatch({
			type: ADD_RESPUESTA_FIELD,
			payload: { pregunta: preguntaId, photo }
		});
	};

	const recordAudio = async (e: any) => {
		if (!activeAudio) {
			const fileCreated = await File.createFile(
				File.externalApplicationStorageDirectory,
				'myaudio.m4a',
				true
			);
			setFile(fileCreated);
			const mediaObj: MediaObject = Media.create(
				File.externalApplicationStorageDirectory + 'myaudio.m4a'
			);
			mediaObj.startRecord();
			setRecording(mediaObj);
		} else {
			recording!.stopRecord();
			recording!.release();
			e.persist();
			setShowPopover({ showPopover: true, event: e });
			isPopover.current = true;
		}

		setActiveAudio(!activeAudio);
	};

	const takePhoto = async () => {
		const image = await Camera.getPhoto({
			quality: 50,
			allowEditing: false,
			resultType: CameraResultType.Base64
		});
		var imageBase64 = image.base64String;
		addPhotoToAnswer(imageBase64 as string);
		setPhoto(imageBase64);
	};

	const processAudio = async () => {
		setProcessingAudio(true);
		try {
			// const base64 = await Base64.encodeFile(File.externalApplicationStorageDirectory + 'myaudio.m4a');
			// const { data } = await axiosInstance.post(
			// 	`/api/auditorias/respuesta/${1}/transcribir/`,
			// 	{
			// 		audio: base64
			// 	},
			// 	{
			// 		headers: {
			// 			Authorization: `Token ${user.token ?? ''}`
			// 		}
			// 	}
			// );
			// addAnswer(data.respuesta as string, data.notas as string);

			const data = {
				respuesta: 'Si',
				notas:
					'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur laborum architecto omnis possimus et amet! Quos, nulla magnam aut repudiandae tempora alias veniam illo maiores reprehenderit quidem rem eum magni.'
			};
			setNotes(notes.concat('\n', data.notas as string));
		} catch (err) {
			console.log(err);
		}
		setProcessingAudio(false);
		setShowPopover({ showPopover: false, event: undefined });
		isPopover.current = false;
	};

	const playAudio = () => {
		if (isPlaying) recording!.pause();
		else {
			recording!.play();
			updateProgress();
		}
		setIsPlaying(!isPlaying);
	};

	const updateProgress = useCallback(() => {
		recording!.getCurrentPosition().then(current => {
			// As the interval u[dates every 100ms, I'm checking the end of file
			// by seeing if it is in last 250ms just to be sure.
			if (!isPopover.current || recording!.getDuration() - current < 0.25) {
				setIsPlaying(false);
				setProgress(0);
				recording!.seekTo(0);
				clearTimeout(timeout.current);
			} else {
				setProgress((current / recording!.getDuration()) * 100 || 0);
				timeout.current = setTimeout(updateProgress, 90);
			}
		});
	}, [recording]);

	const onPopoverDismiss = () => {
		isPopover.current = false;
		setShowPopover({ showPopover: false, event: undefined });
	};

	return (
		<IonSegment className='ion-justify-content-between bg-color'>
			<IonButton
				color={photo ? 'success' : 'light'}
				className='rounded '
				onClick={async () => await takePhoto()}>
				<IonIcon icon={cameraOutline} />
				{photo && <IonIcon icon={checkmarkOutline} />}
			</IonButton>
			<IonButton className='rounded' onClick={recordAudio} color={activeAudio ? 'danger' : ''}>
				<IonIcon icon={micOutline} />
			</IonButton>
			<IonButton color='light' className='rounded' onClick={() => setShowModal(true)}>
				<IonIcon icon={createOutline} />
			</IonButton>
			<IonAlert
				isOpen={showAlert}
				onDidDismiss={() => setShowAlert(false)}
				header={'¿Estas seguro?'}
				message={'El audio se perderá.'}
				buttons={[
					{
						text: 'Cancelar',
						role: 'cancel',
						handler: () => setShowAlert(false)
					},
					{
						text: 'Sí!',
						handler: () => {
							onPopoverDismiss();
						}
					}
				]}
			/>
			<IonPopover
				backdropDismiss={false}
				cssClass='my-custom-class'
				event={popoverState.event}
				isOpen={popoverState.showPopover}
				onDidDismiss={onPopoverDismiss}>
				<IonCard className='card'>
					<IonCardContent className='card-content'>
						<IonIcon
							icon={isPlaying ? pauseCircle : playCircle}
							size='large'
							slot='start'
							onClick={playAudio}
						/>
						<IonRange
							value={progress}
							disabled
							className='ion-padding range'
							color='medium'
							min={0}
							max={100}
							slot='end'></IonRange>
					</IonCardContent>
				</IonCard>
				<div className='action-btns'>
					<IonButton color='danger' onClick={() => setShowAlert(true)}>
						Cancelar
					</IonButton>
					<IonButton onClick={() => processAudio()}>
						{processingAudio ? <Loader /> : 'Procesar'}
					</IonButton>
				</div>
			</IonPopover>
			<IonModal isOpen={showModal}>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot='end'>
							<IonButton color='medium' onClick={() => setShowModal(false)}>
								<IonIcon icon={close} />
							</IonButton>
						</IonButtons>
						<IonTitle>Notas</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonTextarea
						autofocus
						rows={20}
						placeholder='Agrega una nota...'
						className='textarea'
						value={notes}
						onIonChange={e => setNotes(e.detail.value!)}
					/>
				</IonContent>
			</IonModal>
		</IonSegment>
	);
};

export default PreguntaAudio;
