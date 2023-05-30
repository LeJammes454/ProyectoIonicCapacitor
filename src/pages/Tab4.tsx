import { IonButton, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import React, { useState } from 'react';


const Tab4: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [appInfo, setAppInfo] = useState<any>(null);

  const getAppInfo = async () => {
    const info = await App.getInfo();
    setAppInfo(info);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const exitApp = () => {
    App.exitApp();
  };

  const openExternalUrl = () => {
    Browser.open({ url: 'https://www.example.com' });
  };

  const openAppUrl = () => {
    Browser.open({ url: 'myapp://example' })
      .then(() => {
        console.log('URL abierta en otra aplicación.');
      })
      .catch((error) => {
        console.log('No se puede abrir la URL en otra aplicación:', error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 4</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton onClick={getAppInfo}>Obtener información de la aplicación</IonButton>
        <IonButton onClick={exitApp}>Salir de la aplicación</IonButton>
        <IonButton onClick={openExternalUrl}>Abrir URL externa</IonButton>
        <IonButton onClick={openAppUrl}>Abrir otra aplicación</IonButton>

        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Información de la aplicación</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {appInfo && (
              <div>
                <p>Nombre: {appInfo.name}</p>
                <p>Versión: {appInfo.version}</p>
                <p>Identificador del paquete: {appInfo.packageName}</p>
                <p>Entorno de compilación: {appInfo.buildType}</p>
                {/* Agrega más propiedades según la información que desees mostrar */}
              </div>
            )}

            <IonButton onClick={closeModal}>Cerrar</IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
