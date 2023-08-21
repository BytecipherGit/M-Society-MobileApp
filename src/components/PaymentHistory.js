import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../assets/theme';
import AppHeader from '../ReUsableComponents/AppHeader';
import FullCardBackground from '../ReUsableComponents/FullCardBackground';
import TitleText from "../ReUsableComponents/Text's/TitleText";
import HistoryIcon from '.././assets/images/TakePayment.svg';
import {GetData} from '../assets/services';
import {API_URL} from '../assets/services';
import {useSelector} from 'react-redux';
import AppLoaderSrceen from '../ReUsableComponents/AppLoaderSrceen';
import * as Animatable from 'react-native-animatable';
import {noticeListAnimation} from '../assets/Animations';

const PaymentHistory = ({navigation}) => {
  const state = useSelector(state => state.AuthReducer);
  const [data, setData] = useState({
    data: [],
    loader: false,
    error: '',
  });
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);

  useEffect(() => {
    if (currentAnimationIndex <= data.data.length) {
      setTimeout(() => {
        setCurrentAnimationIndex(currentAnimationIndex + 1);
      }, 200);
    }
  }, [currentAnimationIndex]);

  useEffect(() => {
    getPaymentHistory();
  }, []);

  const getPaymentHistory = async () => {
    setData({
      data: [],
      loader: true,
      error: '',
    });
    try {
      const payload = {
        url:
          API_URL +
          `maintenance/userPaymentHistory/${state.userDetail.data._id}`,
      };
      const Result = await GetData(payload);

      if (Result.data.success) {
        setCurrentAnimationIndex(0);
        setData({
          data: state.isAdmin ? Result.data.allHistory : Result.data.data,
          loader: false,
          error: state.isAdmin
            ? Result.data.allHistory.length > 0
              ? ''
              : 'No history found'
            : Result.data.data.length > 0
            ? ''
            : 'No history found',
        });
      } else {
        setData({
          ...data,
          loader: false,
          error: Result.data.message,
        });
      }
    } catch (e) {
      setData({
        ...data,
        loader: false,
        error: 'Something went wrong please try again later.',
      });
    }
  };

  const convertToMonth = mth => {
    if (mth === 0) {
      return 'Jan';
    }

    if (mth === 1) {
      return 'Feb';
    }

    if (mth === 2) {
      return 'March';
    }

    if (mth === 3) {
      return 'Apr';
    }

    if (mth === 4) {
      return 'May';
    }

    if (mth === 5) {
      return 'Jun';
    }

    if (mth === 6) {
      return 'Jul';
    }

    if (mth === 7) {
      return 'Aug';
    }

    if (mth === 8) {
      return 'Sep';
    }

    if (mth === 9) {
      return 'Auc';
    }

    if (mth === 10) {
      return 'Nov';
    }

    if (mth === 11) {
      return 'Dec';
    }
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title="History" />

      <FlatList
        data={data.data}
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 15}}
        ListEmptyComponent={() => (
          <AppLoaderSrceen loader={data.loader} error={data.error} />
        )}
        renderItem={({item, index}) => {
          if (index <= currentAnimationIndex) {
            return (
              <Animatable.View
                style={style.card}
                animation={noticeListAnimation}>
                <View style={style.cardHeader}>
                  <HistoryIcon />
                  <View style={style.detailCnt}>
                    <TitleText
                      style={style.cardPrice}
                      text={`₹ ${item.amount}`}
                    />
                    <Text style={style.paidTxt}>
                      Paid-{' '}
                      <Text style={style.dateTxt}>
                        {convertToMonth(item.month)},{item.year}
                      </Text>
                    </Text>
                    <Text style={style.dateTxt}>{item.status}</Text>
                  </View>
                </View>
                <View style={style.devider} />
                <View style={style.cardFooter}>
                  <Text
                    style={[
                      {
                        fontFamily: 'Inter-Medium',
                      },
                      style.dateTxt,
                    ]}>
                    Transaction ID:{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#202937',
                      }}>
                      {item.transactionId}
                    </Text>
                  </Text>
                </View>
              </Animatable.View>
            );
          }
        }}
        extraData={item => item._id}
      />
    </View>
  );
};

export default PaymentHistory;

const style = StyleSheet.create({
  cnt: {padding: 16, backgroundColor: COLORS.themeBackground},
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 15,
    ...shadow,

    marginHorizontal: 2,
  },
  cardHeader: {padding: 12, flexDirection: 'row'},
  detailCnt: {flex: 1, marginLeft: '4%'},
  cardPrice: {
    color: COLORS.titleFont,
    fontFamily: 'Axiforma-SemiBold',
    fontSize: 17,
    marginBottom: '2%',
  },
  historyCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paidTxt: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 12,
    color: COLORS.inputtext,
  },
  dateTxt: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 12,
    color: '#4C5564',
    lineHeight: 25,
  },
  devider: {
    borderWidth: 1,
    borderColor: COLORS.themeColor,
    borderStyle: 'dashed',
  },
  cardFooter: {padding: 12, alignSelf: 'center'},
});
