import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {getAsyncValue} from '../assets/services';
import {useDispatch} from 'react-redux';
import {USER_DATA} from '../redux/Actions';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (__DEV__) {
      // Code to execute only in development mode
      console.log('Running in development mode');
      // navigation.replace('DeveloperModeScreen');
      getUser();
    } else {
      // Code to execute only in production mode
      console.log('Running in production mode');
      getUser();
    }
  }, []);

  const getUser = async () => {
    const OnBoard = await getAsyncValue('OnBoard');

    if (OnBoard) {
      // now check already login or not
      const User = await getAsyncValue('user');
      if (User) {
        dispatch({type: USER_DATA, payload: JSON.parse(User)});
        JSON.parse(User).data.userType === 'guard'
          ? navigation.replace('GuardHomeScreen')
          : navigation.replace('HomeScreen');
      } else {
        navigation.replace('LoginOptionsScreen');
      }
    } else {
      navigation.replace('OnBoardingScreen');
    }
  };

  return null;
};

export default SplashScreen;
