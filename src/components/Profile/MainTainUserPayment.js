import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import AppButton from '../../ReUsableComponents/AppButton';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import RightIcon from '../../assets/images/RightIcon.svg';
import {API_URL, GetData, PostData} from '../../assets/services';
import {useDispatch, useSelector} from 'react-redux';
import {
  PAYMENT_DETAIL_REQUEST,
  PRE_PAYMENT_DETAIL_REQUEST,
} from '../../redux/Actions';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MainTainUserPayment = ({navigation, route}) => {
  const {name, houseNumber, _id} = route.params.user;
  const [paymentData, setPaymentData] = useState([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const payment = useSelector(state => state.PaymentReducer);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);
  const [countPrev, setCountPrev] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    getPaymentDetails();
  }, []);

  const getPaymentDetails = async () => {
    dispatch({type: PAYMENT_DETAIL_REQUEST, payload: _id});
  };

  useEffect(() => {
    if (payment.payment.length > 0) {
      setPaymentData(payment.payment);

      setLastSelectedIndex(null);
    }
  }, [payment]);

  const payPayment = async () => {
    if (lastSelectedIndex > 0) {
      let arr = [];
      for (let i = 0; i < lastSelectedIndex; i++) {
        arr.push({
          month: paymentData[i].month,
          year: paymentData[i].year,
          amount: paymentData[i].amount,
          maintanceId: paymentData[i].maintanceId,
        });
      }
      const payload = {
        userId: _id,
        month: arr,
      };

      try {
        const Result = await PostData({
          url: API_URL + 'maintenance/takePayment',
          body: payload,
        });
        if (Result.data.success) {
          setAlertData({
            visible: true,
            message: 'Payment Received Succefully.',
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
    }
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title="Maintenance Charge" />
      <View style={{flex: 1}}>
        <View style={style.userDetailCnt}>
          <Image style={style.userImage} />

          <DescriptionText style={style.userName} text={name} />
          <DescriptionText
            style={style.userHouseNo}
            text={`House Nunmber ${houseNumber}`}
          />
        </View>
        <View style={style.billingTitleCnt}>
          {['Action', 'Months', 'Amount'].map((item, index) => {
            return (
              <View key={index}>
                <TitleText
                  text={item}
                  style={{
                    fontFamily: 'Axiforma-Regular',
                    fontSize: 12,
                    color: '#ABACB0',
                    left: index === 1 ? -15 : 0,
                  }}
                />
              </View>
            );
          })}
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={paymentData}
          ListEmptyComponent={() => (
            <AppLoaderSrceen loader={payment.loader} error={payment.error} />
          )}
          ListFooterComponent={() => {
            return (
              <>
                {paymentData.length > 0 &&
                  paymentData[0].fistTimePayment &&
                  countPrev > 0 && (
                    <TouchableOpacity
                      style={{marginVertical: '5%'}}
                      onPress={() => {
                        if (!payment.loader) {
                          dispatch({
                            type: PRE_PAYMENT_DETAIL_REQUEST,
                            payload: {
                              year: paymentData[0].year,
                              month: paymentData[0].month,
                            },
                          });
                          setCountPrev(countPrev - 1);
                        }
                      }}>
                      <DescriptionText
                        text={'Show Previous'}
                        style={{
                          fontWeight: 'bold',
                          color: COLORS.buttonColor,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                <View
                  style={{
                    height: 50,
                  }}
                />
              </>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={style.checkBox}
                  onPress={() => setLastSelectedIndex(index + 1)}>
                  {index + 1 <= lastSelectedIndex && (
                    <AntDesign
                      name="check"
                      style={{fontSize: 20, color: '#1559AF'}}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Axiforma-Medium',
                    fontSize: 14,
                    color: COLORS.blackFont,
                  }}>
                  {item.textMonth + ' ' + item.year}
                </Text>
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: '#F4F6F8',
                    paddingHorizontal: 16,
                    paddingVertical: 7,
                    ...shadow,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Medium',
                      fontSize: 14,
                      color: COLORS.blackFont,
                    }}>
                    {item.amount} ₹
                  </Text>
                </View>
              </View>
            );
          }}
          extraData={(item, index) => index}
        />
      </View>

      {!payment.error && (
        <AppButton
          buttonStyle={{width: '90%', alignSelf: 'center', marginBottom: '5%'}}
          buttonTitle="Update Payment"
          onPress={() => payPayment()}
        />
      )}
    </View>
  );
};

export default MainTainUserPayment;

const style = StyleSheet.create({
  container: {padding: 16, backgroundColor: 'white'},
  title: {
    color: COLORS.titleFont,
  },
  userDetailCnt: {marginTop: '5%'},
  userImage: {
    height: 80,
    width: 80,
    backgroundColor: COLORS.themeColor,
    borderRadius: 1000,
    alignSelf: 'center',
    marginBottom: '3%',
  },
  userNameCnt: {
    alignSelf: 'center',
    marginLeft: '3%',
    justifyContent: 'space-around',
  },
  userName: {
    fontSize: 19,
    color: '#262626',
    marginBottom: '2%',
    fontFamily: 'Axiforma-Medium',
    alignSelf: 'center',
  },
  userHouseNo: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 13,
    color: '#ABACB0',
    alignSelf: 'center',
  },
  billingTitleCnt: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: '2%',
    marginHorizontal: 10,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#D2D5DC',
    marginTop: '7%',
  },
  titleContainer: {
    flex: 0.5,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    padding: 10,
  },
  billingMainCnt: {
    flexDirection: 'row',
    marginTop: '5%',
    marginHorizontal: 1,
  },
  monthCnt: {
    flex: 0.5,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    height: 24,
    width: 24,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#1559AF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthTxt: {
    fontSize: 16,
    marginLeft: '10%',
    color: COLORS.titleFont,
  },
  amountCnt: {
    backgroundColor: COLORS.themeBackground,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    borderRadius: 7,
    ...shadow,
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  amountTxt: {
    fontSize: 16,
    color: COLORS.titleFont,
    marginVertical: '5%',
  },
  footer: {flexDirection: 'row', justifyContent: 'space-between'},
  cancelButton: {
    width: '49%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.buttonColor,
  },
  cancelButtonTxt: {
    color: COLORS.buttonColor,
  },
});
