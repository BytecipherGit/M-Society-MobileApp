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

const OtpScreen = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const [OTP, setOTP] = useState(`${route?.params?.data?.otp}`);

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
      Alert.alert(Result.data.message);
    }
    setLoader(false);
  };

  const verifyOtp = () => {
    if (OTP.length !== 4) {
      Alert.alert('Please Enter Otp First');
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
    <View style={globalStyle.cnt}>
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
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  inputCnt: {marginVertical: 14},
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: COLORS.titleFont,
    marginTop: '6%',
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: '3%',
    borderColor: COLORS.inputBorder,
  },
  actionbtn: {
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.bluetext,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
});
