import { IonAvatar, IonChip, IonIcon, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';

import { navigateCircleOutline, storefrontOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSucursal } from '../actions/sucursalesActions';
import Loader from './Loader';
import Message from './Message';

import './PerfilSucursal.css';

const PerfilSucursal: React.FC<{ id: string }> = ({ id }) => {
	const dispatch = useDispatch();
	const { loading, error, sucursal } = useSelector((state: any) => state.sucursal);

	useEffect(() => {
		dispatch(fetchSucursal(id));
	}, [dispatch, id]);

	if (loading) return <Loader />;
	if (error) return <Message color='danger'>{error}</Message>;
	else
		return (
			<div>
				<div
					className='container avatar-cont-suc'
					style={{ backgroundImage: `url(${sucursal!.imagen})`, backgroundSize: 'cover'}}>
					<div>
						<IonAvatar className='center-content avatar-suc'>
							<IonIcon color='primary' icon={storefrontOutline} />
						</IonAvatar>
					</div>
					<div>
						<IonChip>
							<IonAvatar>
								<IonIcon
									color='primary'
									style={{ fontSize: '26px' }}
									icon={navigateCircleOutline}
								/>
							</IonAvatar>
							<IonLabel>
								{sucursal!.direccion}, {sucursal!.ciudad}
							</IonLabel>
						</IonChip>
					</div>
				</div>

				<IonList lines='none'>
					<IonListHeader>
						<h3>
							<strong>Datos SAG</strong>
						</h3>
					</IonListHeader>
					<IonItem className=''>
						<IonLabel color='medium' slot='start'>
							Nro de SAG
						</IonLabel>
						<IonLabel>{sucursal!.numero_de_sag}</IonLabel>
					</IonItem>
					<IonItem className=''>
						<IonLabel color='medium' slot='start'>
							Nombre de SAG
						</IonLabel>
						<IonLabel>{sucursal!.nombre}</IonLabel>
					</IonItem>
					<IonItem className=''>
						<IonLabel color='medium' slot='start'>
							Departamento
						</IonLabel>
						<IonLabel>{sucursal!.ciudad}</IonLabel>
					</IonItem>
					<IonItem className=''>
						<IonLabel color='medium' slot='start'>
							Teléfono
						</IonLabel>
						<IonLabel>{sucursal!.telefono}</IonLabel>
					</IonItem>
					<IonItem className=''>
						<IonLabel color='medium' slot='start'>
							Último responsable
						</IonLabel>
						<IonLabel>{sucursal!.ultimo_responsable}</IonLabel>
					</IonItem>
					<IonItem className=''>
						<IonLabel color='medium' slot='start'>
							Celular
						</IonLabel>
						<IonLabel>{sucursal!.celular}</IonLabel>
					</IonItem>
					<IonItem className=''>
						<IonLabel color='medium' slot='start'>
							Razón social
						</IonLabel>
						<IonLabel>{sucursal!.razon_social}</IonLabel>
					</IonItem>
					<IonItem className=''>
						<IonLabel color='medium' slot='start'>
							R.U.T
						</IonLabel>
						<IonLabel>{sucursal!.rut}</IonLabel>
					</IonItem>
					<IonItem className=''>
						<IonLabel color='medium' slot='start'>
							Tipo de negocio anexo
						</IonLabel>
						<IonLabel>{sucursal!.negocio_anexo}</IonLabel>
					</IonItem>
					<IonItem className=''>
						<IonLabel color='medium' slot='start'>
							Acceso al local
						</IonLabel>
						<IonLabel>{sucursal!.tipo_de_acceso}</IonLabel>
					</IonItem>
				</IonList>
			</div>
		);
};

export default PerfilSucursal;
