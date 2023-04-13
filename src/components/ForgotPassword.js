import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {AuthThemeImage, COLORS, globalStyle, shadow} from '../assets/theme';
import AuthCard from '../ReUsableComponents/AuthCard';
import AppTextInput from '../ReUsableComponents/AppTextInput';
import {ForgotField, inputFields, SignupFields} from '../assets/Jsons';
import {API_URL, PostData} from '../assets/services';
import {CommonActions} from '@react-navigation/native';
import AuthHeader from '../ReUsableComponents/AuthHeader';
import PhoneInput from 'react-native-phone-number-input';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../assets/GlobalStates/RecoilGloabalState';
import AppButton from '../ReUsableComponents/AppButton';
import ForgotPasswordCard from '../ReUsableComponents/ForgotPasswordCard';

const ForgotPassword = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState('');
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);
  const [ForgotFieldClone, setForgotFieldClone] = useState(ForgotField);
  const phoneInput = useRef(null);

  const sentOtp = async () => {
    if (phone.length !== 10) {
      return setAlertData({
        visible: true,
        message: 'Please Enter Valid Phone Number',
        iconType: 'error',
      });
    }
    const payload = {
      url: API_URL + 'user/sendOtp',
      body: {
        phoneNumber: phone,
        countryCode: '+' + ForgotFieldClone[0].countryCode,
      },
    };
    setLoader(true);
    try {
      const Result = await PostData(payload);
      console.log(payload, Result);
      if (Result && Result.data && Result.data.success) {
        let obj = {
          phone: phone,
          otp: Result.data.data.otp,
          countryCode: '+' + ForgotFieldClone[0].countryCode,
        };
        navigation.navigate('OtpScreen', {data: obj});
      } else {
        setAlertData({
          visible: true,
          message: Result.data.message,
          iconType: 'error',
        });
      }
    } catch (e) {
      setAlertData({
        visible: true,
        message: 'Something Went wrong please try again later.',
        iconType: 'error',
      });
    }
    setLoader(false);
  };

  return (
    <ForgotPasswordCard
      title={'Enter Your Mobile Number'}
      desc={
        'Please enter your registered Mobile Number to get OTP to recover your password.'
      }
      loader={loader}
      onPressButton={sentOtp}
      buttonTitle={'Send OTP'}
      renderUI={() => {
        return ForgotFieldClone.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.inputTitle}>{item?.title}</Text>
              <AppTextInput
                item={item}
                countryCode={item.countryCode}
                onSelectCountry={e => {
                  let arr = ForgotField;
                  arr[index].countryCode = `${e.callingCode}`;
                  setForgotFieldClone([...arr]);
                }}
                renderIcon={() => item.renderIcon()}
                setValue={text => {
                  setPhone(text);
                }}
                style={styles.inputStyle}
              />
            </View>
          );
        });
      }}
    />
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: 14,
    fontFamily: 'Axiforma-Medium',
    color: COLORS.descFont,
    marginBottom: '1%',
  },
  inputStyle: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 14,
    color: COLORS.titleFont,
  },
});
