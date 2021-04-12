import { IonButton, IonContent, IonIcon, IonSegment, IonTitle } from '@ionic/react'
import { cameraOutline, keypadOutline, micOutline } from 'ionicons/icons'
import React from 'react'

import './PreguntaAudio.css'

interface Pregunta {
    pregunta: string;
}

const PreguntaAudio: React.FC<Pregunta> = ({pregunta}) => {
    return (
        <div className="ion-align-items-around">
            <IonTitle>{pregunta}</IonTitle>
            <IonSegment className="ion-justify-content-between">
                <IonButton className="rounded"><IonIcon icon={micOutline}/></IonButton>
                <IonButton className="rounded"><IonIcon icon={cameraOutline}/></IonButton>
                <IonButton className="rounded"><IonIcon icon={keypadOutline}/></IonButton>
            </IonSegment>
        </div>
    )
}

export default PreguntaAudio