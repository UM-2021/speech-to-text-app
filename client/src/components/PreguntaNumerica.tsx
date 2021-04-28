import React, { Fragment, useState } from 'react';
import { IonItem, IonInput, IonButton, IonIcon } from '@ionic/react';
import { arrowUpOutline, arrowDownOutline } from 'ionicons/icons';

import './PreguntaNumerica.css';

const PreguntaNumerica: React.FC<{submitResponse: (n: string) => void}> = ({submitResponse}) => {
	const [number, setNumber] = useState(0);

	const incrementItem = (): void => {
		setNumber(number + 1);
		submitResponse((number + 1).toString())
	};

	const decrementItem = (): void => {
		if (number - 1 >= 0) {
			setNumber(number - 1);
		submitResponse((number - 1).toString());
		}
	};

	return (
		<Fragment>
			<IonItem>
				<IonInput
					type='number'
					value={number}
					placeholder='Enter Number'
					onIonChange={e => setNumber(parseInt(e.detail.value!, 10))}></IonInput>
				<IonButton onClick={incrementItem} shape='round'>
					<IonIcon icon={arrowUpOutline} />
				</IonButton>
				<IonButton onClick={decrementItem} shape='round'>
					<IonIcon icon={arrowDownOutline} />
				</IonButton>
			</IonItem>
		</Fragment>
	);
};

export default PreguntaNumerica;
