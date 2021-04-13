import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonItem, IonLabel, IonItemDivider, IonList, IonSelect, IonSelectOption} from '@ionic/react';

import './Auditoria.css';
import PreguntaAudio from './PreguntaAudio';
import PreguntaNumerica from './PreguntaNumerica';

const Auditoria: React.FC = () => {
    const slideOpts = {
        initialSlide: 1,
        speed: 400
      };
    
    const [value, setValue] = useState(0);
    const [rangeValue, setRangeValue] = useState<{
    lower: number;
    upper: number;
    }>({ lower: 0, upper: 0 });

    const [hairColor, setHairColor] = useState<string>('brown');

    return (
        <IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Nueva Auditoría</IonTitle>
				</IonToolbar>
			</IonHeader>
            <IonContent>
                <IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Nueva Auditoría</IonTitle>
					</IonToolbar>
				</IonHeader>
                <IonSlides className="slider" pager={true} options={slideOpts} style={{height: '100%'}}>
                    <IonSlide>
                        <PreguntaAudio pregunta="Tiene vidrios blindados?"/>
                    </IonSlide>
                    <IonSlide>
                        <PreguntaNumerica pregunta="¿Cuantos vidrios blindados hay?"/>
                    </IonSlide>
                    <IonSlide>
                        <IonList>
                            <IonLabel>Hair Color</IonLabel>
                            <IonSelect value={hairColor} okText="Okay" cancelText="Dismiss" onIonChange={e => setHairColor(e.detail.value)}>
                                <IonSelectOption value="brown">Brown</IonSelectOption>
                                <IonSelectOption value="blonde">Blonde</IonSelectOption>
                                <IonSelectOption value="black">Black</IonSelectOption>
                                <IonSelectOption value="red">Red</IonSelectOption>
                            </IonSelect>                
                            <IonItemDivider>Your Selections</IonItemDivider>
                            <IonItem>Hair Color: {hairColor}</IonItem>
                        </IonList>
                    </IonSlide>
                    <IonSlide>
                        <h1>Slide 4</h1>
                    </IonSlide>
                </IonSlides>
            </IonContent>
        </IonPage>
    );
};

export default Auditoria;