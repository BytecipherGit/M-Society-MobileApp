import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {useRecoilState} from 'recoil';
import {
  CheckVisitors,
  DeviceFcmToken,
} from '../assets/GlobalStates/RecoilGloabalState';

const Notificatrion = () => {
  const [fcmToken, setFcmTooken] = useRecoilState(DeviceFcmToken);
  const [visitorsCheck, setVisitorsCheck] = useRecoilState(CheckVisitors);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  };

  useEffect(async () => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(async token => {
          // setToken(token);
          setFcmTooken({token: token});
        });
    } else {
      // console.log('Fail token status');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert(
      //   'A new FCM token arrived in foreground',
      //   JSON.stringify(remoteMessage),
      // );
      onDisplayNotification(remoteMessage);
      setVisitorsCheck({
        visitors: visitorsCheck.visitors + 1,
      });
    });

    return unsubscribe;
  }, []);

  async function onDisplayNotification(data) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'sound',
      name: 'Default Channel',
      sound: 'doorbell',
    });

    // Display a notification
    await notifee.displayNotification({
      title: data.notification.title,
      body: data.notification.body,
      android: {
        channelId,
        importance: 3, // Set importance to 4 for high importance level
        headless: false,
      },
    });
  }
  return null;
};

export default Notificatrion;
