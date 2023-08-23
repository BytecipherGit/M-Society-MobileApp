import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import {API_URL, GetData} from '../../assets/services';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import Moon from '../../assets/images/Moon.svg';
import Sun from '../../assets/images/Sun.svg';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import {useSelector} from 'react-redux';
import moment from 'moment';

const VisitorsList = ({navigation}) => {
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);
  const [data, setData] = useState({
    error: '',
    loader: '',
    data: [],
  });
  const isAdmin = useSelector(state => state.AuthReducer.isAdmin);
  const houseNumber = useSelector(
    state => state.AuthReducer.userDetail.data.houseNumber,
  );

  useEffect(() => {
    getVisitorsList();
  }, []);

  const getVisitorsList = async () => {
    setData({
      error: '',
      loader: true,
      data: [],
    });
    const Result = await GetData({url: API_URL + 'visitor/app/all'});

    try {
      if (Result.data.success) {
        setData({
          error: Result?.data?.message,
          loader: false,
          data: Result.data.data,
        });
      } else {
        setData({
          error: Result.data.message,
          loader: false,
          data: [],
        });
      }
    } catch (e) {
      setData({
        error: 'Something Went Wrong, Please Try Again Later.',
        loader: false,
        data: [],
      });
      setAlertData({
        visible: true,
        message: 'Something Went Wrong, Please Try Again Later.',
        iconType: 'error',
      });
      console.log(e);
    }
  };

  const rendetUI = (item, index) => {
    return (
      <View style={style.card}>
        <Image style={style.visitorProfilePic} source={{uri: item?.image}} />
        <View style={style.detailCnt}>
          <TitleText
            text={
              item?.name +
              ' ' +
              `(${item.inTime} ${item.outTime ? '- ' + item.outTime : ''})`
            }
            style={style.visitorTitle}
          />

          <DescriptionText
            text={
              (item.countryCode ? item.countryCode : '') + '' + item.phoneNumber
            }
            style={style.desc}
          />
          <DescriptionText
            text={'Reason:-' + item.reasone}
            style={style.reason}
          />
          <View
            style={{
              marginTop: '4%',
            }}>
            <Text style={style.approvedBy}>
              Allow By :{' '}
              {item?.byApprove
                ? item.byApprove.charAt(0).toUpperCase() +
                  item.byApprove.slice(1).toLowerCase()
                : '-'}
            </Text>
            <Text style={style.status}>
              Status :{' '}
              {item?.isApprove
                ? item.isApprove.charAt(0).toUpperCase() +
                  item.isApprove.slice(1).toLowerCase()
                : 'Pending'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title="Visitors" />
      <View style={{flex: 1}}>
        <FlatList
          data={data.data}
          showsVerticalScrollIndicator={false}
          style={{margin: 15, flex: 1}}
          ListEmptyComponent={() => (
            <AppLoaderSrceen loader={data.loader} error={data.error} />
          )}
          renderItem={({item, index}) => {
            return rendetUI(item, index);
          }}
          extraData={item => item._id}
        />
      </View>
    </View>
  );
};

export default VisitorsList;

const style = StyleSheet.create({
  card: {
    ...shadow,
    padding: 10,
    backgroundColor: 'white',
    marginVertical: '2%',
    marginHorizontal: 2,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitorProfilePic: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.themeColor,
    borderRadius: 10000,
  },
  detailCnt: {
    flex: 1,
    marginLeft: '2%',
    justifyContent: 'center',
  },
  visitorTitle: {
    marginBottom: '1%',
    marginLeft: '1%',
    color: COLORS.titleFont,
  },
  desc: {
    marginLeft: '1%',
    color: COLORS.descFont,
    marginVertical: 5,
  },
  reason: {
    marginLeft: '1%',
    color: COLORS.buttonColor,
  },
  approvedBy: {
    fontFamily: 'Axiforma-Medium',
    color: COLORS.titleFont,
    marginBottom: '2%',
  },
  status: {
    fontFamily: 'Axiforma-Medium',
    color: COLORS.titleFont,
  },
});
