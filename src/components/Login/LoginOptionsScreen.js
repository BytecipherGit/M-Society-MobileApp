import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import AuthHeader from '../../ReUsableComponents/AuthHeader';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AuthCard from '../../ReUsableComponents/AuthCard';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import {loginType} from '../../assets/Jsons';
import MiniRightIcon from '../../assets/images/MiniRightIcon.svg';
import {useDispatch} from 'react-redux';
import {LOGIN_OPTION} from '../../redux/Actions';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import HomeSvg from '../../assets/images/HomeSvg.svg';
import AppButton from '../../ReUsableComponents/AppButton';

const LoginOptionsScreen = ({navigation, route}) => {
  const [selectLoginOption, setSelectLoginOption] = useState(null);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);
  const dispatch = useDispatch();

  const loginWithOption = () => {
    if (!selectLoginOption) {
      return setAlertData({
        visible: true,
        message: 'please select one prefered option for login.',
        iconType: 'error',
      });
    }
    dispatch({type: LOGIN_OPTION, payload: selectLoginOption});
    navigation.navigate('LoginScreen');
  };

  return (
    <ImageBackground
      style={style.cnt}
      source={require('../../assets/images/gridBackground.png')}>
      <Image
        source={require('../../assets/images/HomeImage.png')}
        style={{
          height: 250,
          width: '100%',
          marginBottom: '15%',
        }}
        resizeMode="contain"
      />
      <View
        style={{
          borderRadius: 20,
          padding: 15,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontFamily: 'Axiforma-SemiBold',
            fontSize: 20,
            color: COLORS.titleFont,
            marginBottom: '2%',
          }}>
          Choose Your Category
        </Text>
        <Text
          style={{
            fontFamily: 'Axiforma-Regular',
            fontSize: 14,
            color: COLORS.descFont,
          }}>
          Choose one it's Mandatory
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 25,
            marginBottom: 35,
          }}>
          {loginType.map((item, index) => {
            return (
              <View key={index} style={{width: '48%'}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    padding: 12,
                    backgroundColor: '#F7F7F7',
                    borderRadius: 10,
                    // width: '90%',
                    alignItems: 'center',
                  }}
                  onPress={() => setSelectLoginOption(item.id)}>
                  <Image
                    source={item.icon}
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 1000,
                      backgroundColor: 'grey',
                      marginBottom: '5%',
                    }}
                  />
                  <Text>{item.title}</Text>
                </TouchableOpacity>
                {item.id === selectLoginOption && (
                  <View style={style.selectedView}>
                    <MiniRightIcon />
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <AppButton buttonTitle={'Next'} onPress={() => loginWithOption()} />
      </View>
    </ImageBackground>
  );
};

export default LoginOptionsScreen;

const style = StyleSheet.create({
  cnt: {
    flex: 1,
    backgroundColor: COLORS.themeColor,
    padding: 15,
    justifyContent: 'center',
  },
  descTxt: {fontSize: 14, color: COLORS.titleFont},
  detailCnt: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '10%',
  },
  userIconCnt: {
    ...shadow,
    height: 136,
    width: 136,
    borderRadius: 1000,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: '60%',
    width: '60%',
  },
  loginOptionTxt: {
    fontSize: 18,
    color: '#384252',
    alignSelf: 'center',
    marginTop: '12%',
  },
  selectedView: {
    position: 'absolute',
    height: 28,
    width: 28,
    backgroundColor: '#5BCD25',
    alignSelf: 'flex-end',
    // Right: 10,
    borderRadius: 1000,
    top: '-9%',
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
