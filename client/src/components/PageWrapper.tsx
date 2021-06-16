import React from 'react'
import { IonPage } from '@ionic/react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'

const PageWrapper: React.FC = ({ children }) => {
    const { user } = useSelector((state: any) => state.auth);
    
    if (!user) return <Redirect to='/login'/>;
    return (
        <IonPage>
            {children}
        </IonPage>
    )
}

export default PageWrapper;
