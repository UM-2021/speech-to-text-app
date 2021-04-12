import React, { useState } from 'react';
import { IonItem, IonRange, IonLabel, IonTitle, IonInput } from '@ionic/react';
import { RangeValue } from '@ionic/core';

interface Pregunta {
    pregunta: string;
}

const PreguntaNumerica: React.FC<Pregunta> = ({pregunta}) => {
    const [number, setNumber] = useState<number>();
    const [value, setValue] = useState(0);
    const [rangeValue, setRangeValue] = useState<{
        lower: number;
        upper: number;
    }>({ lower: 0, upper: 0 });

    return (
        <div>
            <IonTitle>{pregunta}</IonTitle>
            <IonItem className="ion-margin ion-padding" style={{ width: '100%' }}>
                <IonRange min={0} max={100} color="secondary" pin={true} value={value} disabled={false} onIonChange={e => setValue(e.detail.value as number)} >
                    <IonLabel slot="start">0</IonLabel>
                    <IonLabel slot="end">100</IonLabel>
                </IonRange>
            </IonItem>
            <IonItem>
                <IonInput type="number" value={number} placeholder="Enter Number" onIonChange={e => setNumber(parseInt(e.detail.value!, 10))}></IonInput>
          </IonItem>
        </div>
    )
}

export default PreguntaNumerica
