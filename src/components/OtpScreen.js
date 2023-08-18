import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {AuthThemeImage, COLORS, globalStyle, shadow} from '../assets/theme';
import AuthCard from '../ReUsableComponents/AuthCard';
import AuthHeader from '../ReUsableComponents/AuthHeader';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {API_URL, PostData} from '../assets/services';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../assets/GlobalStates/RecoilGloabalState';
import ForgotPasswordCard from '../ReUsableComponents/ForgotPasswordCard';

const OtpScreen = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const [OTP, setOTP] = useState(`${route?.params?.data?.otp}`);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

  const resendOtp = async () => {
    setLoader(true);
    const payload = {
      url: API_URL + 'user/sendOtp',
      body: {
        phoneNumber: route?.params?.data?.phone,
        countryCode: route?.params?.data?.countryCode,
      },
    };
    const Result = await PostData(payload);
    if (Result.data.success) {
      setOTP(`${Result.data.data.otp}`);
    } else {
      setAlertData({
        visible: true,
        message: Result.data.message,
        iconType: 'error',
      });
    }
    setLoader(false);
  };

  const verifyOtp = () => {
    if (OTP.length !== 4) {
      setAlertData({
        visible: true,
        message: 'Please Enter Otp First',
        iconType: 'error',
      });
    }
    navigation.navigate('SetNewPasswordScreen', {
      type: 'setNewPassword',
      data: {
        phoneNumber: route?.params?.data?.phone,
        otp: OTP,
        countryCode: route?.params?.data?.countryCode,
      },
    });
  };

  return (
    <ForgotPasswordCard
      title={'Enter OTP'}
      buttonTitle={'Verify OTP'}
      onPressButton={verifyOtp}
      renderDesc={() => (
        <Text
          style={{
            fontFamily: 'Axiforma-Regular',
            fontSize: 14,
            color: COLORS.descFont,
            marginBottom: '7%',
            lineHeight: 22,
          }}>
          Please enter OTP which has been sent to your registered mobile{' '}
          <Text
            style={{
              color: 'black',
            }}>
            {route?.params?.data?.phone}
          </Text>
        </Text>
      )}
      renderUI={() => {
        return (
          <View>
            <TouchableOpacity style={{}} onPress={() => resendOtp()}>
              <Text style={styles.inputTitle}>{'Resend OTP?'}</Text>
            </TouchableOpacity>
            <OTPInputView
              style={{
                width: '100%',
                height: 60,
                marginTop: '2%',
              }}
              pinCount={4}
              code={OTP}
              onCodeChanged={code => setOTP(code)}
              autoFocusOnLoad
              codeInputFieldStyle={{
                backgroundColor: COLORS.inputBackground,
                borderRadius: 5,
                height: 50,
                width: 50,
                fontFamily: 'Axiforma-Regular',
                color: COLORS.titleFont,
              }}
              codeInputHighlightStyle={{
                borderWidth: 1,
                borderColor: COLORS.themeColor,
              }}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: 14,
    fontFamily: 'Axiforma-Medium',
    color: 'black',
    marginBottom: '1%',
  },
});

{
  /* <View style={globalStyle.cnt}>
      <AuthHeader />
      <AuthCard
        cardTitle={'Enter OTP'}
        buttonTitle={'Next'}
        onSubmitPress={verifyOtp}
        btnLoader={loader}
        renderSecondDesign={
          <>
            <Text style={[styles.title, {marginTop: '0%'}]}>
              We have sent an OTP to {route?.params?.data?.phone}
            </Text>
            <OTPInputView
              style={[
                {width: '80%', alignSelf: 'center', marginBottom: '-12%'},
                Platform.OS === 'android' && {height: 170},
              ]}
              pinCount={4}
              code={OTP} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => setOTP(code)}
              autoFocusOnLoad
              codeInputFieldStyle={{
                borderWidth: 1,
                borderColor: '#D9D9D9',
                borderRadius: 10,
                backgroundColor: 'white',
                // fontSize: 28,
                fontFamily: 'Inter-Medium',
                color: '#8C8C8C',
                height: '33%',
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              placeholderCharacter="●"
              codeInputHighlightStyle={{}}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => resendOtp()}>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'flex-end',
                  marginRight: '10%',
                }}>
                Resend Code
              </Text>
            </TouchableOpacity>
          </>
        }
      />
    </View> */
}
