import {View, Text} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import SuccessSvg from '../assets/images/SuccessSvg.svg';
import DescriptionText from "./Text's/DescriptionText";
import AppButton from './AppButton';
import {useNavigation} from '@react-navigation/native';
import LogoutIcon from '../assets/images/LogoutIcon.svg';
import {COLORS} from '../assets/theme';
import {RemoveStoreData} from '../assets/services';
import {CommonActions} from '@react-navigation/native';

const SuccessModal = ({
  isVisible,
  setIsVisible,
  navigationScreenName,
  desc,
  type,
}) => {
  const navigation = useNavigation();

  const logout = async () => {
    RemoveStoreData('user');
    setIsVisible(false),
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'LoginOptionsScreen'}],
          }),
        );
      }, 500);
  };

  return (
    <ReactNativeModal isVisible={isVisible}>
      <View style={{padding: 16, backgroundColor: 'white', borderRadius: 15}}>
        {type === 'Logout' ? (
          <View
            style={{
              height: 45,
              width: 45,
              borderWidth: 1.2,
              borderColor: COLORS.themeColor,
              borderRadius: 1000,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <LogoutIcon />
          </View>
        ) : (
          <SuccessSvg style={{alignSelf: 'center'}} />
        )}
        <DescriptionText
          style={{
            color: '#595959',
            alignSelf: 'center',
            marginVertical: '4%',
            width: '60%',
            textAlign: 'center',
          }}
          text={desc}
        />
        {navigationScreenName === 'Logout' ? (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <AppButton
              buttonTitle={'Cancel'}
              buttonStyle={{
                width: '49%',
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: COLORS.buttonColor,
              }}
              TextStyle={{color: COLORS.buttonColor}}
              onPress={() => setIsVisible(false)}
            />
            <AppButton
              onPress={() => logout()}
              buttonTitle={'Yes'}
              buttonStyle={{width: '49%'}}
            />
          </View>
        ) : (
          <AppButton
            buttonTitle={'Ok'}
            onPress={() => {
              setIsVisible(false),
                setTimeout(() => {
                  navigation.replace(navigationScreenName);
                }, 500);
            }}
          />
        )}
      </View>
    </ReactNativeModal>
  );
};

export default SuccessModal;
