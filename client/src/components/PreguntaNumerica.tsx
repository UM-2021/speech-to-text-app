import React, { useState } from 'react';
import { IonItem, IonRange, IonLabel, IonTitle, IonInput, IonButton, IonIcon} from '@ionic/react';
import { RangeValue } from '@ionic/core';
import { arrowUpOutline, arrowDownOutline, addOutline, removeOutline } from 'ionicons/icons';

interface Pregunta {
    pregunta: string;
}

const PreguntaNumerica: React.FC<Pregunta> = ({pregunta}) => {
    const [number, setNumber] = useState(0);
    const [value, setValue] = useState(0);
    const [rangeValue, setRangeValue] = useState<{
        lower: number;
        upper: number;
    }>({ lower: 0, upper: 0 });

    const incrementItem = (): void => {
        setNumber(number+1);
    }

    const decrementItem = (): void => {
        if (number-1 >= 0 ){
            setNumber(number-1);
        }
    }

    return (
        <div>
            <h1>{pregunta}</h1>
            <IonItem className="ion-margin ion-padding" style={{ width: '100%' }}>
                <IonRange min={0} max={100} color="secondary" pin={true} value={value} disabled={false} onIonChange={e => setValue(e.detail.value as number)} >
                    <IonLabel slot="start">0</IonLabel>
                    <IonLabel slot="end">100</IonLabel>
                </IonRange>
            </IonItem>
            <IonItem  className="ion-margin ion-padding">
                <IonInput type="number" value={number} placeholder="Enter Number" onIonChange={e => setNumber(parseInt(e.detail.value!, 10))}></IonInput>
                <IonButton onClick={incrementItem} shape="round">
                    <IonIcon icon={arrowUpOutline} />
                </IonButton>
                <IonButton onClick={decrementItem} shape="round">
                <IonIcon icon={arrowDownOutline} />
                </IonButton>
          </IonItem>
        </div>
    )
}

export default PreguntaNumerica
