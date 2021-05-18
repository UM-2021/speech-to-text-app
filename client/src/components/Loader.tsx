/** @format */

import React from 'react';
import { IonSpinner } from '@ionic/react';

const Loader = () => {
  return (
    <div
      style={{
        minHeight: '75%',
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <IonSpinner style={{ width: '50px', height: '50px' }} name="crescent" />
    </div>
  );
};

export default Loader;
