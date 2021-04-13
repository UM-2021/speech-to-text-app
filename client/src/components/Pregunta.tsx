import React from 'react';

import './Pregunta.css';

interface IPregunta {
	pregunta: string;
}

const Pregunta: React.FC<IPregunta> = ({ pregunta, children }) => {
	return (
		<div className='ion-padding flex ion-margin-vertical'>
			<div>
				<h3>{pregunta}</h3>
			</div>
			<div className='shrink'>{children}</div>
		</div>
	);
};

export default Pregunta;
