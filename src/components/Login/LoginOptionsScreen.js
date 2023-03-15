import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
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
    <View style={globalStyle.cnt}>
      <AuthHeader />
      <AuthCard
        cardTitle={'Choose Your Category'}
        buttonTitle={'Next'}
        // hideButton
        onSubmitPress={loginWithOption}
        renderSecondDesign={
          <View style={{}}>
            <TitleText
              style={style.descTxt}
              text={"It's mandatory to choose one."}
            />
            <View style={style.detailCnt}>
              {loginType.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={style.userIconCnt}
                      onPress={() => setSelectLoginOption(item.id)}>
                      <Image
                        source={item.icon}
                        style={style.icon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TitleText style={style.loginOptionTxt} text={item.title} />
                    {item.id === selectLoginOption && (
                      <View style={style.selectedView}>
                        <MiniRightIcon />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        }
      />
    </View>
  );
};

export default LoginOptionsScreen;

const style = StyleSheet.create({
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
    Right: 10,
    borderRadius: 1000,
    top: '9%',
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
