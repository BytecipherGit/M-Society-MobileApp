import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {AuthThemeImage, COLORS, globalStyle, shadow} from '../../assets/theme';
import AuthCard from '../../ReUsableComponents/AuthCard';
import AppTextInput from '../../ReUsableComponents/AppTextInput';
import {ChangePasswordFields, inputFields} from '../../assets/Jsons';
import {
  API_URL,
  PostData,
  postFormData,
  StoreData,
} from '../../assets/services';
import AuthHeader from '../../ReUsableComponents/AuthHeader';
import {useDispatch} from 'react-redux';
import {USER_DATA} from '../../redux/Actions';
import EyeIconSvg from '../../assets/images/EyeIconSvg.svg';
import HideEyeIcon from '../../assets/images/HideEyeIcon.svg';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import AppHeader from '../../ReUsableComponents/AppHeader';
import AppButton from '../../ReUsableComponents/AppButton';

const LoginScreen = ({navigation, route}) => {
  const [data, setData] = useState({
    oldPassword: '',
    newPassword: '',
    cPassword: '',
  });
  const [error, setError] = useState({
    oldPassword: '',
    newPassword: '',
    cPassword: '',
  });
  const [loader, setLoader] = useState(false);
  const [inputArray, setInputArray] = useState(ChangePasswordFields);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

  const ChangePassword = () => {
    if (!data.oldPassword) {
      return setError({
        ...error,
        oldPassword: 'Please Enter Your Old Password First',
      });
    }
    if (!data.newPassword) {
      return setError({
        ...error,
        newPassword: 'Please Enter Your New Password First',
      });
    }
    if (!data.cPassword) {
      return setError({
        ...error,
        cPassword: 'Please Enter Your Confirm Password First',
      });
    }
    if (data.newPassword !== data.cPassword) {
      return setError({
        ...error,
        cPassword: 'New password and confirm Password Are Not Matched',
      });
    }
    updatePassword();
  };

  const updatePassword = async () => {
    setLoader(true);
    try {
      const payload = {
        url: API_URL + 'user/changePassword',
        body: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      };
      const Result = await PostData(payload);
      if (Result.data.success) {
        setAlertData({
          visible: true,
          message: Result?.data?.message,
          // iconType: 'error',
        });
        navigation.goBack();
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
        message: 'Something went wrong please try again later.',
        iconType: 'error',
      });
    }
    setLoader(false);
  };

  const visibleInput = index => {
    let arr = inputArray;
    arr[index].secureTextEntry = !arr[index].secureTextEntry;
    setInputArray([...arr]);
  };

  return (
    <View style={globalStyle.cnt}>
      <StatusBar animated={true} backgroundColor={'#CAE7FF'} hidden={true} />
      <AppHeader navigation={navigation} title={'Change Password'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{flexGrow: 0.3}}>
        <View
          style={{
            margin: 15,
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: '10%',
            ...shadow,
          }}>
          {inputArray.map((item, index) => {
            return (
              <View style={styles.inputCnt} key={index}>
                <Text style={styles.title}>{item.title}</Text>
                <AppTextInput
                  item={item}
                  value={data[item.param]}
                  showEyeIcon={true}
                  onPressEye={() => {
                    let arr = inputArray;
                    arr[index].secureTextEntry = !arr[index].secureTextEntry;
                    setInputArray([...arr]);
                  }}
                  setValue={text => {
                    setData({...data, [item.param]: text});
                    (error.newPassword ||
                      error.oldPassword ||
                      error.cPassword) &&
                      setError({
                        oldPassword: '',
                        newPassword: '',
                        cPassword: '',
                      });
                  }}
                />
                {error[item.param] && (
                  <DescriptionText
                    style={{color: 'red', marginTop: '1.5%'}}
                    text={error[item.param]}
                  />
                )}
              </View>
            );
          })}
          <AppButton
            buttonTitle={'Update Password'}
            onPress={ChangePassword}
            buttonStyle={{
              marginTop: '10%',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputCnt: {marginVertical: 10},
  title: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 14,
    color: COLORS.descFont,
    marginBottom: '2%',
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
    elevation: 3,
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
      flex: 1,
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
