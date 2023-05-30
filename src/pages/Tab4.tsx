import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { Network, NetworkStatus } from '@capacitor/network';
import React, { useEffect, useState } from 'react';

const Tab4: React.FC = () => {
  const [characters, setCharacters] = useState([]);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
      } catch (error) {
        console.log('Error al obtener los personajes:', error);
      }
    };

    fetchCharacters();

    const networkListener = Network.addListener('networkStatusChange', (status: NetworkStatus) => {
      setNetworkStatus(status);
    });

    return () => {
      networkListener.remove();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Personajes</IonTitle>
        </IonToolbar>
        {networkStatus && (
          <IonToolbar>
            <IonTitle>
              {networkStatus.connected ? 'Conectado a Internet' : 'Sin conexión'}
              <br />
              Tipo de conexión: {networkStatus.connectionType}
            </IonTitle>
          </IonToolbar>
        )}
      </IonHeader>
      <IonContent>
        <IonGrid>
          {characters.map((character) => (
            <IonCard key={character.id} size="12" sizeXs="6" sizeSm="4" sizeMd="3">
              <img src={character.image} alt={character.name} />
              <IonCardHeader>
                <IonCardTitle>{character.name}</IonCardTitle>
                <IonCardSubtitle>{character.species}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Status: {character.status}</p>
                <p>Location: {character.location.name}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;

