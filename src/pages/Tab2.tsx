import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonButton, IonModal } from '@ionic/react';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import React, { useEffect, useState } from 'react';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition()
      .then((position: GeolocationPosition) => {
        setCurrentLocation(position);
      })
      .catch((error) => {
        console.log('Error al obtener la posición: ', error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Geolocalización</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {currentLocation && (
          <div className="location-container">
            <IonText>
              <h2>Tu ubicación actual:</h2>
            </IonText>
            <IonText>
              <p>Latitud: {currentLocation.coords.latitude}</p>
            </IonText>
            <IonText>
              <p>Longitud: {currentLocation.coords.longitude}</p>
            </IonText>
            <IonButton expand="full" onClick={() => setShowModal(true)}>
              Ver en mapa
            </IonButton>
          </div>
        )}

        <IonModal isOpen={showModal} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Ubicación en mapa</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {currentLocation && (
              <div className="map-container">
                <iframe
                  src={`https://maps.google.com/maps?q=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&z=15&output=embed`}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                  title="Ubicación en mapa"
                ></iframe>
              </div>
            )}
            <IonButton expand="full" onClick={closeModal}>
              Cerrar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

