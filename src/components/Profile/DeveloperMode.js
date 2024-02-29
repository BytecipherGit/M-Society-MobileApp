import {View, Text, AppState, AppRegistry, Alert} from 'react-native';
import React, {useEffect} from 'react';
import AppButton from '../../ReUsableComponents/AppButton';
import {getAsyncValue} from '../../assets/services';
import {USER_DATA} from '../../redux/Actions';

const DeveloperMode = ({navigation}) => {
  const handleReload = () => {
    // Reload the app manually
    if (__DEV__) {
      // Code to execute only in development mode
      // console.log('Running in development mode');
      Alert.alert(
        'Still we found developer option on, if you phased any issue than close the application from background and open again.',
      );
    } else {
      // Code to execute only in production mode
      // console.log('Running in production mode');
      getUser();
    }
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
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontFamily: 'Inter-SemiBold',
          fontSize: 15,
          margin: 10,
        }}>
        Amm I think you turn on the developer mode in you device, please turn of
        and Than Enjoy the Features Of Msociety.
      </Text>
      <View style={{width: '80%'}}>
        <AppButton buttonTitle={'Reload'} onPress={handleReload} />
      </View>
    </View>
  );
};

export default DeveloperMode;
