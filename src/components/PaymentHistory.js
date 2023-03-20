import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../assets/theme';
import AppHeader from '../ReUsableComponents/AppHeader';
import FullCardBackground from '../ReUsableComponents/FullCardBackground';
import TitleText from "../ReUsableComponents/Text's/TitleText";
import HistoryIcon from '.././assets/images/HistoryIcon.svg';
import {GetData} from '../assets/services';
import {API_URL} from '../assets/services';
import {useSelector} from 'react-redux';

const PaymentHistory = ({navigation}) => {
  const state = useSelector(state => state.AuthReducer);
  const [data, setData] = useState({
    data: [],
    loader: false,
    error: '',
  });
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
          API_URL + `maintance/userPaymentHistory/${state.userDetail.data._id}`,
      };
      const Result = await GetData(payload);
      if (Result.data.success) {
        setData({
          data: Result.data.data,
          loader: false,
          error: '',
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

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title="History" />
        <FullCardBackground
          styles={style.cnt}
          RenderUI={() => (
            <View>
              <TitleText style={{color: COLORS.inputtext}} text="History" />
              <FlatList
                data={data.data}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <View style={style.card}>
                    <View style={style.cardHeader}>
                      <HistoryIcon />
                      <View style={style.detailCnt}>
                        <TitleText style={style.cardPrice} text="₹ 1800" />
                        <View style={style.historyCnt}>
                          <Text style={style.paidTxt}>
                            Paid-{' '}
                            <Text style={style.dateTxt}>January,2023</Text>
                          </Text>
                          <Text style={style.dateTxt}>09/Mar/2023</Text>
                        </View>
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
                        Transaction ID{' '}
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#202937',
                          }}>
                          6553 8236 876238
                        </Text>
                      </Text>
                    </View>
                  </View>
                )}
                extraData={item => item._id}
              />
            </View>
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default PaymentHistory;

const style = StyleSheet.create({
  cnt: {padding: 16, backgroundColor: COLORS.themeBackground},
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 20,
    ...shadow,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 2,
  },
  cardHeader: {padding: 12, flexDirection: 'row'},
  detailCnt: {flex: 1, marginLeft: '4%'},
  cardPrice: {color: '#202937', marginBottom: '1%'},
  historyCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paidTxt: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.inputtext,
  },
  dateTxt: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#4C5564',
  },
  devider: {borderWidth: 0.6, borderColor: COLORS.inputBorder},
  cardFooter: {padding: 12, alignSelf: 'center'},
});
