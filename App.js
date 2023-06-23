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
import Notificatrion from './src/ReUsableComponents/Notificatrion';

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

  return (
    <RecoilRoot>
      <Provider store={store}>
        {/* <StatusBar animated={true} backgroundColor={'#CAE7FF'} hidden={true} /> */}
        <NavigationContainer>
          <AppAlert />
          <Notificatrion />
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
