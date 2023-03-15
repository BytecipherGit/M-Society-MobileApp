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

const MainTainUserPayment = ({navigation, route}) => {
  const {name, houseNumber, _id} = route.params.user;
  const [paymentData, setPaymentData] = useState([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const payment = useSelector(state => state.PaymentReducer);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

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
      console.log('payment list ====>', payment.payment);
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
          url: API_URL + 'maintance/takePayment',
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
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title="Maintenance Charge" />
        <FullCardBackground
          styles={style.container}
          RenderUI={() => (
            <>
              <View style={{flex: 1}}>
                <TitleText style={style.title} text="Resident" />
                <View style={style.userDetailCnt}>
                  <Image style={style.userImage} />
                  <View style={style.userNameCnt}>
                    <DescriptionText style={style.userName} text={name} />
                    <DescriptionText
                      style={style.userHouseNo}
                      text={`House No. ${houseNumber}`}
                    />
                  </View>
                </View>
                <View style={style.billingTitleCnt}>
                  {['Months', 'Amount'].map((item, index) => {
                    return (
                      <View key={index} style={style.titleContainer}>
                        <TitleText
                          text={item}
                          style={{color: COLORS.blackFont}}
                        />
                      </View>
                    );
                  })}
                </View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={paymentData}
                  ListEmptyComponent={() => (
                    <AppLoaderSrceen
                      loader={payment.loader}
                      error={payment.error}
                    />
                  )}
                  ListFooterComponent={() => {
                    return (
                      <>
                        {paymentData.length > 0 &&
                          paymentData[0].fistTimePayment && (
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
                      </>
                    );
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <View style={style.billingMainCnt}>
                        {/* Months container */}
                        <View style={style.monthCnt}>
                          <TouchableOpacity
                            style={style.checkBox}
                            onPress={() => setLastSelectedIndex(index + 1)}>
                            {index + 1 <= lastSelectedIndex && <RightIcon />}
                          </TouchableOpacity>
                          <DescriptionText
                            text={item.textMonth + ' ' + item.year}
                            style={style.monthTxt}
                          />
                        </View>
                        {/* Amount View */}
                        <View style={style.amountCnt}>
                          <DescriptionText
                            text={'2000'}
                            style={style.amountTxt}
                          />
                        </View>
                      </View>
                    );
                  }}
                  extraData={(item, index) => index}
                />
              </View>
              <View style={style.footer}>
                <AppButton
                  buttonStyle={style.cancelButton}
                  TextStyle={style.cancelButtonTxt}
                  buttonTitle="Cancel"
                />
                <AppButton
                  buttonStyle={{width: '49%'}}
                  buttonTitle="Save"
                  onPress={() => payPayment()}
                />
              </View>
            </>
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: 'white'}} />
    </Fragment>
  );
};

export default MainTainUserPayment;

const style = StyleSheet.create({
  container: {padding: 16, backgroundColor: 'white'},
  title: {
    color: COLORS.titleFont,
  },
  userDetailCnt: {flexDirection: 'row', marginTop: '5%'},
  userImage: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.themeColor,
    borderRadius: 1000,
  },
  userNameCnt: {
    alignSelf: 'center',
    marginLeft: '3%',
    justifyContent: 'space-around',
  },
  userName: {fontSize: 16, color: 'black', marginBottom: '5%'},
  userHouseNo: {color: '#4C5564', fontSize: 12},
  billingTitleCnt: {
    flexDirection: 'row',
    backgroundColor: '#F6FDFF',
    marginTop: '5%',
    borderBottomWidth: 0.5,
    borderColor: COLORS.themeColor,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 1,
    borderColor: COLORS.themeColor,
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
