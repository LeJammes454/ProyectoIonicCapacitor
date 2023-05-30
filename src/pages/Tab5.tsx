import { IonButton, IonContent, IonHeader, IonList, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Device } from '@capacitor/device';
import React, { useEffect, useState } from 'react';

const Tab5: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    getDeviceInfo();
  }, []);

  const getDeviceInfo = async () => {
    try {
      const deviceInfo = await Device.getInfo();
      setDeviceInfo(deviceInfo);
    } catch (error) {
      console.log('Error al obtener la información del dispositivo:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Información del Dispositivo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={getDeviceInfo}>Obtener información del dispositivo</IonButton>

        {deviceInfo && (
          <IonList>
            <IonItem>
              <IonLabel>Modelo del dispositivo:</IonLabel>
              <IonLabel>{deviceInfo.model}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Fabricante:</IonLabel>
              <IonLabel>{deviceInfo.manufacturer}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Versión del sistema operativo:</IonLabel>
              <IonLabel>{deviceInfo.osVersion}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Identificador del dispositivo:</IonLabel>
              <IonLabel>{deviceInfo.uuid}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Nombre de la aplicación:</IonLabel>
              <IonLabel>{deviceInfo.appName}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Identificador de la aplicación:</IonLabel>
              <IonLabel>{deviceInfo.appId}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Versión de la aplicación:</IonLabel>
              <IonLabel>{deviceInfo.appVersion}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Código de versión de la aplicación:</IonLabel>
              <IonLabel>{deviceInfo.appBuild}</IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab5;
