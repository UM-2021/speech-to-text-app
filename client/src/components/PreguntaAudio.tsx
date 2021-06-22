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
	IonAlert,
	IonToast
} from '@ionic/react';
import {
  cameraOutline,
  micOutline,
  checkmarkOutline,
  playCircle,
  pauseCircle,
  createOutline,
  close,
} from 'ionicons/icons';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_RESPUESTA_FIELD } from '../actions/types';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Base64 } from '@ionic-native/base64';
import Loader from '../components/Loader';

import { Plugins, CameraResultType } from '@capacitor/core';

import './PreguntaAudio.css';
import axiosInstance from '../utils/axios';
import { setTimeout } from 'timers';

const { Camera } = Plugins;

const PreguntaAudio: React.FC<{ preguntaId: string; notas: string; imagen: any }> = ({
	preguntaId,
	notas,
	imagen
}) => {
	const dispatch = useDispatch();
	const { preguntas } = useSelector((state: any) => state.preguntas);
	const { user } = useSelector((state: any) => state.auth);

	const [activeAudio, setActiveAudio] = useState<boolean>(false);
	const [photo, setPhoto] = useState<any>('');
	const [showModal, setShowModal] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [notes, setNotes] = useState(notas || '');

	const [processingAudio, setProcessingAudio] = useState<boolean>(false);
	const [recording, setRecording] = useState<MediaObject | null>(null);
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [errorProcessingAudio, setErrorProcessingAudio] = useState(false);
	const [popoverState, setShowPopover] = useState({
		showPopover: false,
		event: undefined
	});
	let timeout: any = useRef(setTimeout(() => {}, 0));
	let isPopover = useRef(true);

	const addAnswer = (respuesta: string, notas: string) => {
		const tipo = preguntas.find((p: any) => p.id === preguntaId).tipo;
		if (tipo === 'Opciones' || tipo === 'Numerica' || !respuesta) {
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
      payload: { pregunta: preguntaId, photo },
    });
  };

	const recordAudio = async (e: any) => {
		if (!activeAudio) {
			await File.createFile(File.externalApplicationStorageDirectory, 'myaudio.mp3', true);
			const mediaObj: MediaObject = Media.create(
				File.externalApplicationStorageDirectory + 'myaudio.mp3'
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
      resultType: CameraResultType.Base64,
    });
    var imageBase64 = image.base64String;
    addPhotoToAnswer(imageBase64 as string);
    setPhoto(imageBase64);
  };

	const processAudio = async () => {
		setProcessingAudio(true);
		try {
			const base64 = await Base64.encodeFile(File.externalApplicationStorageDirectory + 'myaudio.mp3');
			const { data } = await axiosInstance.post(
				`/api/auditorias/respuesta/transcribir/`,
				{
					audio: base64
				},
				{
					headers: {
						Authorization: `Token ${user.token ?? ''}`
					}
				}
			);
			addAnswer(data.respuesta as string, notes.concat('\n', data.notas as string));
			setNotes(notes.concat('\n', data.notas as string));
		} catch (err) {
			console.log(err);
			setErrorProcessingAudio(true);
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
    recording!.getCurrentPosition().then((current) => {
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

	const addNotes = (e: any) => {
		setNotes(e.target.value);
		addAnswer('', e.target.value);
	};

	return (
		<IonSegment className='ion-justify-content-between bg-color'>
			<IonToast
				isOpen={errorProcessingAudio}
				position='top'
				message='Error al procesar el audio, inténtelo de nuevo.'
				duration={3000}
				onDidDismiss={() => setErrorProcessingAudio(false)}
			/>
			<IonButton
				color={photo || imagen?.url ? 'success' : 'light'}
				className='rounded '
				onClick={async () => await takePhoto()}>
				<IonIcon icon={cameraOutline} />
				{(photo || imagen?.url) && <IonIcon icon={checkmarkOutline} />}
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
						{processingAudio ? <Loader mini /> : 'Procesar'}
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
						onIonChange={addNotes}
					/>
				</IonContent>
			</IonModal>
		</IonSegment>
	);
};

export default PreguntaAudio;
