import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide } from '@ionic/react';

const Auditoria: React.FC = () => {
    const slideOpts = {
        initialSlide: 1,
        speed: 400
      };

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
                <IonSlides pager={true} options={slideOpts} style={{height: '100%'}}>
                    <IonSlide>
                        <h1>Slide 1</h1>
                    </IonSlide>
                    <IonSlide>
                        <h1>Slide 2</h1>
                    </IonSlide>
                    <IonSlide>
                        <h1>Slide 3</h1>
                    </IonSlide>
                </IonSlides>
            </IonContent>
        </IonPage>
    );
};

export default Auditoria;