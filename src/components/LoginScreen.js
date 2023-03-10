import {View, Text, StyleSheet, Image, StatusBar, Platform} from 'react-native';
import React, {useRef, useState} from 'react';
import {AuthThemeImage, COLORS, globalStyle, shadow} from '../assets/theme';
import {images} from '../assets/images/image';
import AuthCard from '../ReUsableComponents/AuthCard';
import AppTextInput from '../ReUsableComponents/AppTextInput';
import {inputFields} from '../assets/Jsons';
import {API_URL, PostData, StoreData} from '../assets/services';
import LogoSvg from '../assets/images/LogoSvg.svg';
import AuthHeader from '../ReUsableComponents/AuthHeader';
import PhoneInput from 'react-native-phone-number-input';
import {useDispatch, useSelector} from 'react-redux';
import {USER_DATA} from '../redux/Actions';

const LoginScreen = ({navigation}) => {
  const [data, setData] = useState({
    phoneNumber: '',
    password: '',
  });
  const [error, setError] = useState({
    phoneNumber: '',
    password: '',
  });
  const [loader, setLoader] = useState(false);
  const phoneInput = useRef(null);
  const dispatch = useDispatch();
  loginOption = useSelector(state => state.AuthReducer);

  const login = async () => {
    if (!data.phoneNumber) {
      return setError({...error, phoneNumber: 'Please Enter phoneNumber Id'});
    } else if (!data.password) {
      return setError({...error, password: 'Please Enter Password'});
    } else {
      console.log(data);
      setLoader(true);
      let obj = {
        phoneNumber: data.phoneNumber,
        password: data.password,
        countryCode: '+' + phoneInput?.current?.state?.code,
      };

      const payload =
        loginOption.loginOption && loginOption.loginOption === 1
          ? {
              url: API_URL + 'user/login',
              body: obj,
            }
          : {
              url: API_URL + 'guard/login',
              body: {
                ...obj,
                deviceToken: '',
                deviceType: Platform.OS === 'android' ? 'android' : 'ios',
              },
            };

      try {
        const Result = await PostData(payload);
        if (Result && Result.data.success) {
          StoreData('user', JSON.stringify(Result.data));
          dispatch({type: USER_DATA, payload: Result.data});
          loginOption.loginOption && loginOption.loginOption === 1
            ? navigation.replace('HomeScreen')
            : navigation.replace('GuardHomeScreen');
        } else {
          if (Result.data.message === 'Your OTP Is Not Verified!') {
            alert(
              Result.data.message +
                ' Please Enter Your mobile Number OTP and set new password for login.',
            );
            navigation.navigate('ForgotPasswordScreen');
          } else {
            alert(Result.data.message);
          }
        }
      } catch (e) {
        alert('Something went wrong please try again later.');
      }
      setLoader(false);
    }
  };

  return (
    <View style={globalStyle.cnt}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <AuthHeader />
      <AuthCard
        cardTitle={'Sign In'}
        buttonTitle={'Next'}
        btnLoader={loader}
        onSubmitPress={() => login()}
        renderSecondDesign={
          <View style={{marginTop: '7%'}}>
            {inputFields.map((item, index) => {
              return (
                <View style={styles.inputCnt} key={index}>
                  <Text style={styles.title}>{item.title}</Text>
                  {item.id === 1 ? (
                    <>
                      <PhoneInput
                        ref={phoneInput}
                        defaultValue={phoneInput?.current?.state?.number}
                        // value={phone}
                        defaultCode="IN"
                        layout="second"
                        textInputProps={{placeholderTextColor: '#6B737F'}}
                        onChangeText={text => {
                          setData({...data, [item.param]: text});
                          (error.phoneNumber || error.password) &&
                            setError({phoneNumber: '', password: ''});
                        }}
                        onChangeFormattedText={text => {
                          // setFormattedValue(text);
                          null;
                        }}
                        // withDarkTheme
                        withShadow
                        // autoFocus
                        containerStyle={[
                          styles.containerStyle,
                          error[item.param] && {
                            borderWidth: 1,
                            borderColor: 'red',
                          },
                        ]}
                        codeTextStyle={styles.codeTextStyle}
                        textContainerStyle={styles.textContainerStyle}
                        textInputStyle={styles.textInputStyle}
                      />
                    </>
                  ) : (
                    <View
                      style={[
                        styles.inputView,
                        error[item.param] && {
                          borderWidth: 0.5,
                          borderColor: 'red',
                        },
                      ]}>
                      <AppTextInput
                        item={item}
                        value={data[item.param]}
                        style={styles.inputStyle}
                        setValue={text => {
                          setData({...data, [item.param]: text});
                          (error.phoneNumber || error.password) &&
                            setError({phoneNumber: '', password: ''});
                        }}
                      />
                    </View>
                  )}
                </View>
              );
            })}
            {loginOption.loginOption && loginOption.loginOption === 1 && (
              <Text
                style={styles.actionbtn}
                onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                Forgot Password
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputCnt: {marginVertical: 10},
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: COLORS.inputTitleBlack,
  },
  inputView: {
    // borderWidth: 1,
    borderRadius: 5,
    padding: Platform.OS === 'ios' ? 5 : 0,
    marginTop: '3%',
    borderColor: COLORS.inputBorder,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 1.2,
    elevation: 5,
    margin: 2,
  },
  actionbtn: {
    alignSelf: 'flex-end',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'red',
  },
  inputStyle: [
    {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: '#6B737F',
    },
    Platform.OS === 'android' && {marginHorizontal: '2%'},
  ],
  containerStyle: {
    borderRadius: 10,
    width: '99%',
    marginRight: 10,
    marginTop: '3%',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 1.5,
    elevation: 5,
    marginLeft: 2,
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? 52 : 70,
  },
  codeTextStyle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B737F',
  },
  textContainerStyle: {
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: 'white',
    borderLeftWidth: 1,
    borderColor: '#D2D5DC',
  },
  textInputStyle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B737F',
    marginRight: '10%',
  },
});
