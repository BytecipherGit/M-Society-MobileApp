import {View, Text, StyleSheet, Image, StatusBar, Alert} from 'react-native';
import React, {useState} from 'react';
import {AuthThemeImage, COLORS, globalStyle, shadow} from '../assets/theme';
import {images} from '../assets/images/image';
import AuthCard from '../ReUsableComponents/AuthCard';
import AppTextInput from '../ReUsableComponents/AppTextInput';
import {ChangePassword, inputFields} from '../assets/Jsons';
import {API_URL, PostData, StoreData} from '../assets/services';
import LogoSvg from '../assets/images/LogoSvg.svg';
import AuthHeader from '../ReUsableComponents/AuthHeader';
import {CommonActions} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../assets/GlobalStates/RecoilGloabalState';
import ForgotPasswordCard from '../ReUsableComponents/ForgotPasswordCard';

const SetNewPassword = ({navigation, route}) => {
  const [data, setData] = useState({
    password: '',
    rePassword: '',
  });
  const [error, setError] = useState({
    password: '',
    rePassword: '',
  });
  const [loader, setLoader] = useState(false);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

  const setNewPassword = async () => {
    if (!data.password) {
      return setError({...error, password: 'Please Enter Password First'});
    }

    if (!data.rePassword) {
      return setError({...error, password: 'Please Enter Confir Password.'});
    }

    if (data.rePassword !== data.password) {
      return setError({
        ...error,
        password: 'Password and confirm Password Are not Matched.',
      });
    }

    setError({password: '', rePassword: ''});

    const obj = {
      phoneNumber: route?.params?.data?.phoneNumber,
      countryCode: route?.params?.data?.countryCode,
      newPassword: data.password,
      otp: route?.params?.data?.otp,
    };

    setLoader(true);

    const payload = {
      url: API_URL + 'user/setNewPassword',
      body: obj,
    };

    const Result = await PostData(payload);

    if (Result && Result.data.success) {
      setAlertData({
        visible: true,
        message: 'Password changes successfully',
        // iconType: 'error',
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        }),
      );
    } else {
      setAlertData({
        visible: true,
        message: Result.data.message,
        iconType: 'error',
      });
    }
    setLoader(false);
  };

  return (
    <ForgotPasswordCard
      title={'Set New Password'}
      desc={'Please enter your password.'}
      buttonTitle={'Done'}
      loader={loader}
      onPressButton={setNewPassword}
      renderUI={() => {
        return ChangePassword.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.inputTitle}>{item?.title}</Text>
              <View
                style={[
                  styles.inputView,
                  error[item.param] && {borderColor: 'red'},
                ]}>
                <AppTextInput
                  item={item}
                  style={styles.inputText}
                  value={data[item.param]}
                  setValue={text => {
                    setData({...data, [item.param]: text});
                  }}
                />
              </View>
            </View>
          );
        });
      }}
    />
  );
};

export default SetNewPassword;

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: 14,
    fontFamily: 'Axiforma-Medium',
    color: COLORS.descFont,
    marginVertical: '1%',
    marginTop: '3%',
  },
});

{
  /* <View style={globalStyle.cnt}>
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <AuthHeader />
      <AuthCard
        cardTitle={'Forgot Password'}
        buttonTitle={'Done'}
        btnLoader={loader}
        onSubmitPress={() => login()}
        renderSecondDesign={
          <View style={{marginTop: '7%'}}>
            {ChangePassword.map((item, index) => {
              return (
                <View style={styles.inputCnt} key={index}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View
                    style={[
                      styles.inputView,
                      error[item.param] && {borderColor: 'red'},
                    ]}>
                    <AppTextInput
                      item={item}
                      style={styles.inputText}
                      value={data[item.param]}
                      setValue={text => {
                        setData({...data, [item.param]: text});
                      }}
                    />
                  </View>
                </View>
              );
            })}
            {(error.password || error.rePassword) && (
              <Text style={styles.errormsg}>
                {error.password || error.rePassword}
              </Text>
            )}
          </View>
        }
      />
    </View> */
}
