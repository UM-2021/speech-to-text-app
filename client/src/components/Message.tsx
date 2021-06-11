import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';

const Message: React.FC<{color: string}> = ({color, children }) => {
	return (
		<div>
			<IonCard color={color}>
				<IonCardContent>
					{children}
				</IonCardContent>
			</IonCard>
		</div>
	);
};

export default Message;
