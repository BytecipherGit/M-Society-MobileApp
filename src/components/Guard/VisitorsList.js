import {View, Text, SafeAreaView, FlatList, Image} from 'react-native';
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
    getGuardsList();
  }, []);

  const getGuardsList = async () => {
    setData({
      error: '',
      loader: true,
      data: [],
    });
    const Result = await GetData({url: API_URL + 'visitor/app/all'});

    try {
      if (Result.data.success) {
        setData({
          error: '',
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
    }
  };

  const rendetUI = (item, index) => {
    return (
      <View
        style={{
          ...shadow,
          padding: 10,
          backgroundColor: 'white',
          marginVertical: '2%',
          marginHorizontal: 2,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: 60,
            width: 60,
            backgroundColor: COLORS.themeColor,
            borderRadius: 10000,
          }}
          source={{uri: item?.image}}
        />
        <View
          style={{
            flex: 1,
            marginLeft: '2%',
            justifyContent: 'center',
          }}>
          <TitleText
            text={
              item?.name +
              ' ' +
              `(${item.inTime} ${item.outTime ? '- ' + item.outTime : ''})`
            }
            style={{
              marginBottom: '1%',
              marginLeft: '1%',
              color: COLORS.titleFont,
            }}
          />

          <DescriptionText
            text={
              (item.countryCode ? item.countryCode : '') + '' + item.phoneNumber
            }
            style={{
              marginLeft: '1%',
              color: COLORS.descFont,
              marginVertical: 5,
            }}
          />
          <DescriptionText
            text={'Reason:-' + item.reasone}
            style={{
              marginLeft: '1%',
              color: COLORS.buttonColor,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title="Visitors" />
      <View>
        <FlatList
          data={data.data}
          showsVerticalScrollIndicator={false}
          style={{margin: 15}}
          ListEmptyComponent={() => (
            <AppLoaderSrceen loader={data.loader} erro={data.error} />
          )}
          renderItem={({item, index}) => {
            if (isAdmin) {
              return rendetUI(item, index);
            } else if (houseNumber === item.houseNumber) {
              return rendetUI(item, index);
            }
          }}
          extraData={item => item._id}
        />
      </View>
    </View>
  );
};

export default VisitorsList;
