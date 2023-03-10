import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
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

const ForgotPassword = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState('');
  const phoneInput = useRef(null);

  const sentOtp = async () => {
    if (phone.length !== 10) {
      return Alert.alert('Please Enter Valid Phone Number');
    }
    const payload = {
      url: API_URL + 'user/sendOtp',
      body: {
        phoneNumber: phone,
        countryCode: '+' + phoneInput?.current?.state?.code,
      },
    };
    const Result = await PostData(payload);
    setLoader(true);
    if (Result && Result.data && Result.data.success) {
      let obj = {
        phone: phone,
        otp: Result.data.data.otp,
        countryCode: '+' + phoneInput?.current?.state?.code,
      };
      navigation.navigate('OtpScreen', {data: obj});
    } else {
      Alert.alert(Result.data.message);
    }
    setLoader(false);
  };

  return (
    <View style={globalStyle.cnt}>
      <AuthHeader />
      <AuthCard
        cardTitle={'Forgot Password'}
        buttonTitle={'Next'}
        onSubmitPress={sentOtp}
        btnLoader={loader}
        renderSecondDesign={
          <>
            {ForgotField.map((item, index) => {
              return (
                <View style={styles.inputCnt} key={index}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={{justifyContent: 'center'}}>
                    <PhoneInput
                      ref={phoneInput}
                      defaultValue={phoneInput?.current?.state?.number}
                      // value={phone}
                      defaultCode="IN"
                      layout="second"
                      textInputProps={{placeholderTextColor: '#6B737F'}}
                      onChangeText={text => {
                        // setValue(text);
                        null;
                        setPhone(text);
                      }}
                      onChangeFormattedText={text => {
                        // setFormattedValue(text);
                        null;
                      }}
                      // withDarkTheme
                      withShadow
                      // autoFocus
                      containerStyle={{
                        borderRadius: 10,
                        width: '99%',
                        marginRight: 10,
                        marginTop: '3%',
                        marginLeft: 2,
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 1.5,
                        elevation: 5,
                      }}
                      codeTextStyle={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 14,
                        color: '#6B737F',
                      }}
                      textContainerStyle={{
                        borderTopEndRadius: 10,
                        borderBottomEndRadius: 10,
                        backgroundColor: 'white',
                        borderLeftWidth: 1,
                        borderColor: '#D2D5DC',
                      }}
                      textInputStyle={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 14,
                        color: '#6B737F',
                        marginRight: '10%',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        alignSelf: 'flex-end',
                        right: '5%',
                        // top: '1%',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setPhone(''), (phoneInput.current.state.number = '');
                        }}>
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2997/2997911.png',
                          }}
                          style={{height: 9.5, width: 9.5, top: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        }
      />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  inputCnt: {marginVertical: 14},
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: COLORS.inputTitleBlack,
    marginTop: '3%',
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
});
