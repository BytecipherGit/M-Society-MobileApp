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
          message: 'Enter valid phone number',
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        height: Dimensions.get('window').height,
      }}>
      <ImageBackground
        style={[
          globalStyle.cntWithTheme,
          {justifyContent: 'center', alignItems: 'center'},
        ]}
        source={require('..//assets/images/gridBackground.png')}>
        <Image
          source={require('../assets/images/SecureImage.png')}
          style={{
            width: 290,
            height: 345,
            marginBottom: '5%',
            marginTop: '6%',
          }}
          resizeMode="contain"
        />
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            width: '94%',
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Axiforma-SemiBold',
              fontSize: 20,
              color: COLORS.titleFont,
              marginBottom: '3%',
            }}>
            Enter Your Mobile Number
          </Text>
          <Text
            style={{
              fontFamily: 'Axiforma-Regular',
              fontSize: 14,
              color: COLORS.descFont,
              marginBottom: '7%',
              lineHeight: 22,
            }}>
            Please enter your register Mobile Number to get OTP to recover your
            password.
          </Text>

          {ForgotFieldClone.map((item, index) => {
            return (
              <View key={index}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Axiforma-Medium',
                    color: COLORS.descFont,
                    marginBottom: '1%',
                  }}>
                  {item?.title}
                </Text>
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
                  style={{
                    fontFamily: 'Axiforma-Regular',
                    fontSize: 14,
                    color: COLORS.titleFont,
                  }}
                />
              </View>
            );
          })}
          <AppButton
            buttonStyle={{
              marginTop: '7%',
            }}
            buttonTitle={'Send OTP'}
            btnLoader={loader}
            onPress={sentOtp}
          />
        </View>
      </ImageBackground>
    </ScrollView>
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

{
  /* <View style={globalStyle.cnt}>
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
    </View> */
}
