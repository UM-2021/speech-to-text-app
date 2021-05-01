import { IonSpinner } from '@ionic/react';
import React from 'react';

const Loader = () => {
	return (
		<div
			style={{
				minHeight: '75vh',
				minWidth: '100vw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			<IonSpinner style={{ width: '50px', height: '50px' }} name='crescent' />
		</div>
	);
};

export default Loader;
