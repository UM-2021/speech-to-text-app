import { IonSpinner } from '@ionic/react';

const Loader: React.FC<{ mini?: boolean }> = ({ mini }) => {
	const sizes = {
		width: mini ? '20px' : '50px',
		height: mini ? '20px' : '50px'
	};
	return (
		<div
			style={{
				minHeight: '75%',
				minWidth: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			<IonSpinner style={sizes} name='crescent' />
		</div>
	);
};

export default Loader;
