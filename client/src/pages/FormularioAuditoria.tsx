import React from 'react';
import {
	IonAvatar,
	IonChip,
	IonItem,
	IonContent,
	IonSegment,
	IonSegmentButton,
	IonListHeader,
	IonList,
	IonIcon,
	IonInput,
	IonButton,
	IonPage,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonSelect,
	IonSelectOption,
	IonFooter,
	IonLabel
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router-dom';

const FormularioAuditoria: React.FC<RouteComponentProps> = ({ match }) => {
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
				<IonAvatar className='ion-margin-start'>
					<IonIcon style={{ fontSize: '50px', color: '#0040ff' }} icon={personCircle} />
				</IonAvatar>

				<IonListHeader>Sucursal</IonListHeader>
				<IonChip className='ion-margin-start'>
					<IonAvatar>
						<IonIcon style={{ fontSize: '26px', color: '#0040ff' }} icon={personCircle} />
					</IonAvatar>
					<IonLabel>Av. Brasil 1891, Montevideo</IonLabel>
				</IonChip>

				<IonList>
					<IonListHeader>Datos Iniciales</IonListHeader>
					<IonItem className='ion-margin-horizontal'>
						<IonLabel position='floating'> Nro de SAG</IonLabel>
						<IonInput type='email'></IonInput>
					</IonItem>
					<IonItem className='ion-margin-horizontal'>
						<IonLabel position='floating'> Nombre de SAG</IonLabel>
						<IonInput type='email'></IonInput>
					</IonItem>
					<IonItem className='ion-margin'>
						<IonLabel>Departamento</IonLabel>
						<IonSelect interface='popover' slot='end'>
							<IonSelectOption value='montevideo'>Montevideo</IonSelectOption>
							<IonSelectOption value='artigas'>Artigas</IonSelectOption>
							<IonSelectOption value='salto'>Salto</IonSelectOption>
							<IonSelectOption value='canelones'>Canelones</IonSelectOption>
							<IonSelectOption value='maldonado'>Malodonado</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItem className='ion-margin-horizontal'>
						<IonLabel position='floating'> Teléfono</IonLabel>
						<IonInput type='email'></IonInput>
					</IonItem>
					<IonItem className='ion-margin-horizontal'>
						<IonLabel position='floating'> Reponsable</IonLabel>
						<IonInput type='email'></IonInput>
					</IonItem>
					<IonItem className='ion-margin-horizontal'>
						<IonLabel position='floating'> Celular</IonLabel>
						<IonInput type='email'></IonInput>
					</IonItem>
					<IonItem className='ion-margin-horizontal'>
						<IonLabel position='floating'> Razón Social</IonLabel>
						<IonInput type='email'></IonInput>
					</IonItem>
					<IonItem className='ion-margin-horizontal'>
						<IonLabel position='floating'>RUT</IonLabel>
						<IonInput type='email'></IonInput>
					</IonItem>
					<IonItem className='ion-margin-horizontal'>
						<IonLabel position='floating'> Tipo de negocio anexo</IonLabel>
						<IonInput type='email'></IonInput>
					</IonItem>
					<IonItem className='ion-margin'>
						<IonLabel> Tipo de acceso al local</IonLabel>
					</IonItem>
					<IonItem className='ion-margin-horizontal'>
						<IonSegment color='secondary'>
							<IonSegmentButton value='calle'>
								<IonLabel>calle</IonLabel>
							</IonSegmentButton>
							<IonSegmentButton value='área comercial'>
								<IonLabel>área comercial</IonLabel>
							</IonSegmentButton>
						</IonSegment>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonItem>
					<IonButton size='large' slot='start' color='danger' expand='block'>
						Cancel
					</IonButton>
					<IonButton size='large' slot='end' expand='block'>
						Guardar
					</IonButton>
				</IonItem>
			</IonFooter>
		</IonPage>
	);
};

export default FormularioAuditoria;
