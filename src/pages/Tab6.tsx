import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal, IonInput, IonText } from '@ionic/react';
import { Share } from '@capacitor/share';
import React, { useState } from 'react';

const Tab6: React.FC = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(true);

  const shareContent = async () => {
    try {
      await Share.share({
        title: title,
        text: text,
        url: url,
        dialogTitle: 'Compartir'
      });
    } catch (error) {
      console.log('Error al compartir:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Compartir</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent>
            <IonText>
              <h2>Plugin @capacitor/share</h2>
              <p>El plugin @capacitor/share permite compartir contenido desde tu aplicación a través de las capacidades de intercambio de dispositivos nativos.</p>
              <p>Esta función te permite compartir texto, enlaces, imágenes u otros tipos de contenido utilizando aplicaciones o servicios disponibles en tu dispositivo.</p>
            </IonText>
            <IonButton expand="full" onClick={() => setShowModal(false)}>
              Comenzar
            </IonButton>
          </IonContent>
        </IonModal>

        <IonButton expand="full" onClick={() => setShowModal(true)}>
          Informacion de @Capacitor/Share
        </IonButton>

        <IonInput
          placeholder="Ingresa el Titulo"
          value={title}
          onIonChange={(e) => setTitle(e.detail.value!)}
        ></IonInput>
        <IonInput
          placeholder="Ingresa el texto"
          value={text}
          onIonChange={(e) => setText(e.detail.value!)}
        ></IonInput>
        <IonInput
          placeholder="Ingresa la url "
          value={url}
          onIonChange={(e) => setUrl(e.detail.value!)}
        ></IonInput>

        <IonButton expand="full" onClick={shareContent}>
          Compartir
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab6;

