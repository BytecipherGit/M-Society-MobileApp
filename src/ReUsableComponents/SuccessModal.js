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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';

const SuccessModal = ({
  isVisible,
  setIsVisible,
  navigationScreenName,
  desc,
  type,
  onlyClosePopup,
  iconType,
  onPress = () => null,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = async () => {
    onPress();
    RemoveStoreData('user');
    dispatch({type: 'LOG_OUT'});
    setIsVisible(false),
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'LoginOptionsScreen'}],
          }),
        );
      }, 1000);
  };

  return (
    <ReactNativeModal isVisible={isVisible}>
      <View style={{padding: 15, backgroundColor: 'white', borderRadius: 10}}>
        {type === 'Logout' ? (
          <AntDesign
            name="logout"
            style={{
              fontSize: 40,
              color: COLORS.buttonColor,
              alignSelf: 'center',
              marginBottom: '2%',
            }}
          />
        ) : iconType === 'error' ? null : (
          <SuccessSvg style={{alignSelf: 'center'}} width={300} />
        )}
        <DescriptionText
          style={{
            color: iconType === 'error' ? 'red' : '#595959',
            alignSelf: 'center',
            marginVertical: '2%',
            width: '60%',
            textAlign: 'center',
            fontFamily: 'Axiforma-Bold',
            lineHeight: 25,
            fontSize: 15,
          }}
          text={desc}
        />
        {navigationScreenName === 'Logout' ? (
          <View
            style={
              {
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // backgroundColor: 'red',
              }
            }>
            <AppButton
              buttonTitle={'Cancel'}
              onPress={() => setIsVisible(false)}
              buttonStyle={{marginBottom: '2%'}}
            />
            <AppButton onPress={() => logout()} buttonTitle={'Yes'} />
          </View>
        ) : (
          <AppButton
            buttonTitle={'Ok'}
            onPress={() => {
              setIsVisible(false),
                setTimeout(() => {
                  !onlyClosePopup && navigation.replace(navigationScreenName);
                }, 500);
            }}
          />
        )}
      </View>
    </ReactNativeModal>
  );
};

export default SuccessModal;
