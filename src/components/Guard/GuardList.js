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

const GuardList = ({navigation}) => {
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);
  const [data, setData] = useState({
    error: '',
    loader: '',
    data: [],
  });

  useEffect(() => {
    getGuardsList();
  }, []);

  const getGuardsList = async () => {
    setData({
      error: '',
      loader: true,
      data: [],
    });
    try {
      const Result = await GetData({url: API_URL + 'guard/app/all'});
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

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title="Society Guards" />
        <FullCardBackground
          styles={{backgroundColor: COLORS.themeBackground, padding: 16}}
          RenderUI={() => (
            <View>
              <FlatList
                data={data.data}
                ListEmptyComponent={() => (
                  <AppLoaderSrceen loader={data.loader} erro={data.error} />
                )}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      ...shadow,
                      shadowOpacity: 0.1,
                      shadowRadius: 3,
                      padding: 10,
                      backgroundColor: 'white',
                      marginVertical: '2%',
                      marginHorizontal: 2,
                      borderRadius: 5,
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        height: 60,
                        width: 60,
                        backgroundColor: COLORS.inputBorder,
                        borderRadius: 10000,
                      }}
                      source={{uri: item?.profileImage}}
                    />
                    <View
                      style={{
                        flex: 1,
                        marginLeft: '2%',
                        justifyContent: 'center',
                      }}>
                      <TitleText
                        text={item?.name}
                        style={{marginBottom: '1%', marginLeft: '1%'}}
                      />
                      <View
                        style={{
                          backgroundColor: COLORS.themeColor,
                          alignSelf: 'flex-start',
                          paddingHorizontal: 10,
                          borderRadius: 1000,
                          marginVertical: '2%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.shift === 'day' ? <Sun /> : <Moon />}
                        <DescriptionText
                          text={item.countryCode + '' + item.phoneNumber}
                          style={{
                            marginLeft: '3%',
                            color: 'white',
                            marginVertical: 5,
                          }}
                        />
                      </View>
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

export default GuardList;
