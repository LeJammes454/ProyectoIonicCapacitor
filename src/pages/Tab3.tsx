import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Toast } from '@capacitor/toast';
import React, { useState } from 'react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [alarmTime, setAlarmTime] = useState('');
  const [alarms, setAlarms] = useState<string[]>([]);

  const scheduleAlarm = async () => {
    if (alarmTime === '') {
      console.log('Por favor, ingresa una hora válida');
      return;
    }

    const [hours, minutes] = alarmTime.split(':');
    const alarmDateTime = new Date();
    alarmDateTime.setHours(Number(hours));
    alarmDateTime.setMinutes(Number(minutes));

    await LocalNotifications.schedule({
      notifications: [
        {
          title: '¡Alarma!',
          body: '¡Es hora de despertar!',
          id: alarms.length + 1,
          schedule: { at: alarmDateTime },
          sound: 'beep.wav', // Opcional: Ruta al archivo de sonido de la alarma
        }
      ]
    });

    setAlarms([...alarms, alarmTime]);
    showToast('Alarma programada correctamente');
    setAlarmTime('');
  };

  const removeAlarm = async (index: number) => {
    const updatedAlarms = [...alarms];
    updatedAlarms.splice(index, 1);
    setAlarms(updatedAlarms);
    await LocalNotifications.cancel({ notifications: [{ id: index + 1 }] });
    showToast('Alarma eliminada');
  };

  const showToast = async (message: string) => {
    await Toast.show({
      text: message,
      duration: 'long'
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notificaciones locales</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="alarm-container">
          <h2>Configurar alarma</h2>
          <IonItem>
            <IonLabel position="floating">Hora de la alarma (HH:MM)</IonLabel>
            <IonInput type="time" value={alarmTime} onIonChange={e => setAlarmTime(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton onClick={scheduleAlarm}>Programar alarma</IonButton>
        </div>

        <IonList>
          {alarms.map((alarm, index) => (
            <IonItem key={index}>
              <IonLabel>{alarm}</IonLabel>
              <IonButton fill="clear" slot="end" onClick={() => removeAlarm(index)}>Eliminar</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
