import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { Haptics } from '@capacitor/haptics';
import React from 'react';
import './Tab4.css';

const Tab4: React.FC = () => {
  const playHapticFeedback = () => {
    Haptics.vibrate();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Geolocalización</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="haptic-feedback-container">
          <h2>Retroalimentación Háptica</h2>
          <IonButton expand="full" onClick={playHapticFeedback}>
            Activar retroalimentación háptica
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;

