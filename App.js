import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/mainNavigationContainer/mainNavigation';
import createSagaMiddleware from '@redux-saga/core';
import {applyMiddleware, createStore} from 'redux';
import {allReducer} from './src/redux/MainReducer';
import RootSaga from './src/redux/rootSaga';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Alert, Image, StatusBar, View} from 'react-native';
import AppAlert from './src/ReUsableComponents/AppAlert';
import {RecoilRoot} from 'recoil';
import NetInfo from '@react-native-community/netinfo';
import ReactNativeModal from 'react-native-modal';
import TitleText from "./src/ReUsableComponents/Text's/TitleText";
// import messaging from '@react-native-firebase/messaging';
// import notifee from '@notifee/react-native';

const App = () => {
  // Uncomment when you want to use Redux in project
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(allReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(RootSaga);
  const [isInternet, setIsInternet] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // SplashScreen.hide();
    }, 2000);
    NetInfo.addEventListener(state => {
      setIsInternet(state.isConnected);
    });
  }, []);

  // useEffect(() => {
  //   getDeviceToken();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert(
  //       'A new FCM token arrived in foreground',
  //       JSON.stringify(remoteMessage),
  //     );
  //     onDisplayNotification(remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);

  // async function onDisplayNotification(data) {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: data.notification.title,
  //     body: data.notification.body,
  //     android: {
  //       channelId,
  //       importance: 3, // Set importance to 4 for high importance level
  //       headless: false,
  //     },
  //   });
  // }

  // const getDeviceToken = async () => {
  //   let token = await messaging().getToken();

  //   console.log(token);
  // };

  return (
    <RecoilRoot>
      <Provider store={store}>
        {/* <StatusBar animated={true} backgroundColor={'#CAE7FF'} hidden={true} /> */}
        <NavigationContainer>
          <AppAlert />
          <ReactNativeModal isVisible={isInternet ? false : true}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4330/4330471.png',
              }}
              style={{height: 100, width: 100, alignSelf: 'center'}}
            />
            <View
              style={{
                marginTop: '3%',
                backgroundColor: 'white',
                alignSelf: 'center',
                padding: 5,
                borderRadius: 7,
              }}>
              <TitleText
                text={'Please Check Your Internet Connection.'}
                style={{}}
              />
            </View>
          </ReactNativeModal>
          <MainNavigation />
        </NavigationContainer>
      </Provider>
    </RecoilRoot>
  );
};

export default App;
