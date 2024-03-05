import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, globalStyle} from '../assets/theme';
// import {images} from '../assets/images/image';
// import AuthCard from '../ReUsableComponents/AuthCard';
import AppTextInput from '../ReUsableComponents/AppTextInput';
import {inputFields} from '../assets/Jsons';
import {API_URL, PostData, StoreData} from '../assets/services';
import {useDispatch, useSelector} from 'react-redux';
import {USER_DATA} from '../redux/Actions';
import {useRecoilState} from 'recoil';
import {
  DeviceFcmToken,
  GlobalAppAlert,
} from '../assets/GlobalStates/RecoilGloabalState';
import DescriptionText from "../ReUsableComponents/Text's/DescriptionText";
import {CommonActions} from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
// import AppButton from '../ReUsableComponents/AppButton';

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
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);
  const [inputFieldsClone, setInputFieldsClone] = useState(inputFields);
  const [fcmToken, setFcmTooken] = useRecoilState(DeviceFcmToken);
  const dispatch = useDispatch();
  const loginOption = useSelector(state => state.AuthReducer);

  const login = async () => {
    if (!data.phoneNumber) {
      return setError({...error, phoneNumber: 'Please Enter phoneNumber'});
    } else if (!data.password) {
      return setError({...error, password: 'Please Enter Password'});
    } else {
      setLoader(true);
      let obj = {
        phoneNumber: data.phoneNumber,
        password: data.password,
        countryCode: '+' + inputFieldsClone[0].countryCode,
        deviceToken: fcmToken.token,
        deviceType: Platform.OS,
      };
      // let obj = {
      //   email: 'jaya123',
      //   password: '123456',
      // };

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
                deviceToken: obj.deviceToken,
                deviceType: Platform.OS === 'android' ? 'android' : 'ios',
              },
            };

      try {
        // console.log('paylaod', payload);

        const Result = await PostData(payload);
        if (Result && Result.data.success) {
          StoreData('user', JSON.stringify(Result.data));
          // console.log(Result.data);
          dispatch({type: USER_DATA, payload: Result.data});
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                loginOption.loginOption && loginOption.loginOption === 1
                  ? {name: 'HomeScreen'}
                  : {name: 'GuardHomeScreen'},
              ],
            }),
          );
        } else {
          if (Result.data.message === 'Your OTP Is Not Verified') {
            errorAlert(
              true,
              `${
                Result.data.message +
                ' Please Enter Your mobile Number OTP and set new password for login.'
              }`,
            );
            navigation.navigate('ForgotPasswordScreen');
          } else {
            errorAlert(true, Result.data.message);
          }
        }
      } catch (e) {
        console.log(e);
        errorAlert(true, 'Something went wrong please try again later.');
      }
      setLoader(false);
    }
  };

  const errorAlert = (visible, message) => {
    setAlertData({
      visible: visible,
      message: message,
      iconType: 'error',
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{height: Dimensions.get('window').height}}>
      <ImageBackground
        style={[
          globalStyle.cntWithTheme,
          {justifyContent: 'center', alignItems: 'center'},
        ]}
        source={require('..//assets/images/gridBackground.png')}>
        <Image
          source={require('../assets/images/LoginPng.png')}
          style={[styles.mainImage, {height: '40%'}]}
          resizeMode="contain"
        />
        <View style={styles.card}>
          <Text style={styles.singInTxt}>Sign In</Text>
          {inputFieldsClone.map((item, index) => {
            return (
              <View style={styles.inputCnt} key={index}>
                <Text style={styles.title}>{item.title}</Text>
                <AppTextInput
                  item={item}
                  value={data[item.param]}
                  style={styles.inputStyle}
                  countryCode={item.countryCode}
                  showEyeIcon={item.showEyeIcon}
                  onSelectCountry={e => {
                    let arr = inputFieldsClone;
                    arr[index].countryCode = `${e.callingCode}`;
                    setInputFieldsClone([...arr]);
                  }}
                  renderIcon={item.renderIcon}
                  onPressEye={() => {
                    let arr = inputFieldsClone;
                    arr[index].secureTextEntry = !arr[index].secureTextEntry;
                    setInputFieldsClone([...arr]);
                  }}
                  setValue={text => {
                    setData({...data, [item.param]: text});
                    (error.phoneNumber || error.password) &&
                      setError({phoneNumber: '', password: ''});
                  }}
                />
                {error[item.param] && (
                  <DescriptionText
                    style={{color: 'red', marginTop: '1%'}}
                    text={error[item.param]}
                  />
                )}
              </View>
            );
          })}
          {loginOption.loginOption && loginOption.loginOption === 1 && (
            <TouchableOpacity
              style={styles.forgotpassword}
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.actionbtn}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={login}>
          <LinearGradient
            colors={['#FFA13C', '#FF7334']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            angle={210.29}
            style={styles.loginButtonStyle}>
            {loader ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Image
                source={require('..//assets/images/nextAerrow.png')}
                style={{width: 22.09, height: 24}}
                resizeMode="contain"
              />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputCnt: {marginVertical: 5},
  title: {
    fontSize: 14,
    fontFamily: 'Axiforma-Medium',
    color: COLORS.descFont,
    marginBottom: '1%',
  },
  actionbtn: {
    alignSelf: 'flex-end',
    fontSize: 14,
    fontFamily: 'Axiforma-Regular',
    color: '#707070',
    marginTop: '0%',
  },
  inputStyle: [
    {
      fontFamily: 'Axiforma-Regular',
      fontSize: 14,
      color: COLORS.titleFont,
    },
  ],
  mainImage: {
    width: 345,
    height: 345,
    marginBottom: '5%',
    marginTop: '6%',
  },
  card: {
    padding: 20,
    backgroundColor: 'white',
    width: '94%',
    borderRadius: 20,
  },
  singInTxt: {
    fontFamily: 'Axiforma-SemiBold',
    fontSize: 20,
    color: COLORS.titleFont,
    marginBottom: '7%',
  },
  forgotpassword: {
    borderBottomWidth: 1,
    alignSelf: 'flex-end',
    borderColor: '#707070',
    marginBottom: '13%',
  },
  loginButtonStyle: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginTop: '-12%',
    borderRadius: 1000,
    borderWidth: 10,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
