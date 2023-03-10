import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/mainNavigationContainer/mainNavigation';
import createSagaMiddleware from '@redux-saga/core';
import {applyMiddleware, createStore} from 'redux';
import {allReducer} from './src/redux/MainReducer';
import RootSaga from './src/redux/rootSaga';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';

const App = () => {
  // Uncomment when you want to use Redux in project
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(allReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(RootSaga);

  useEffect(() => {
    setTimeout(() => {
      // SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
