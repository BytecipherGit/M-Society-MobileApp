import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import {API_URL, DeleteData, GetData, SnackError} from '../../assets/services';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import Moon from '../../assets/images/Moon.svg';
import Sun from '../../assets/images/Sun.svg';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import LinearGradient from 'react-native-linear-gradient';
import AppRoundAddActionButton from '../../ReUsableComponents/AppRoundAddActionButton';
import {useIsFocused} from '@react-navigation/native';
import AppCrudActionButton from '../../ReUsableComponents/AppCrudActionButton';

const GuardList = ({navigation}) => {
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);
  const [data, setData] = useState({
    error: '',
    loader: '',
    data: [],
  });
  const [deleteLoader, setDeleteLoader] = useState('');
  const focused = useIsFocused();

  useEffect(() => {
    focused && getGuardsList();
  }, [focused]);

  const getGuardsList = async () => {
    setData({
      error: '',
      loader: true,
      data: [],
    });
    try {
      const Result = await GetData({url: API_URL + 'guard/app/all'});
      if (Result.data.success) {
        if (Result.data.data.length > 0) {
          setData({
            error: '',
            loader: false,
            data: Result.data.data,
          });
        } else {
          setError('No Guards Found.');
        }
      } else {
        setError(Result.data.message);
      }
    } catch (e) {
      setError('Something Went Wrong, Please Try Again Later.');
    }
  };

  const doActions = async (item, type, index) => {
    if (type === 'Edit') {
      return navigation.navigate('CreateGuardScreen', {data: item});
    }
    setDeleteLoader(item._id);

    try {
      const Result = await DeleteData({
        url: API_URL + 'guard/',
        body: {id: item._id},
      });

      if (Result.success) {
        let arr = data.data;
        arr.splice(index, 1);
        setData({
          error: arr.length === 0 ? 'No Guard list available' : '',
          loader: false,
          data: [...arr],
        });
      } else {
        SnackError(Result.message);
      }
    } catch (e) {
      SnackError('Something went wrong, please try again later.');
    }
    setDeleteLoader('');
  };

  const setError = msg => {
    setData({
      error: msg,
      loader: false,
      data: [],
    });
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title="Society Guards" />
      <View style={{flex: 1}}>
        <FlatList
          data={data.data}
          style={{margin: 15}}
          ListEmptyComponent={() => (
            <AppLoaderSrceen loader={data.loader} error={data.error} />
          )}
          renderItem={({item, index}) => (
            <>
              <View style={style.card}>
                <Image
                  style={style.profileImg}
                  source={{uri: item?.profileImage}}
                />
                <View style={style.cardDetailCnt}>
                  <TitleText
                    text={item?.name}
                    style={{marginBottom: '1%', marginLeft: '1%'}}
                  />
                  <LinearGradient
                    colors={['#FF7334', '#FFA13C']}
                    start={{x: 0.0, y: 0.0}}
                    end={{x: 1.0, y: 1.0}}
                    locations={[0.0, 1.0]}
                    style={style.linearGradient}>
                    {item.shift === 'day' ? <Sun /> : <Moon />}
                    <DescriptionText
                      text={'+' + item.countryCode + ' ' + item.phoneNumber}
                      style={style.shiftTxt}
                    />
                  </LinearGradient>
                </View>
              </View>
              <AppCrudActionButton
                item={item}
                index={index}
                loaderIndex={deleteLoader}
                doActions={doActions}
              />
            </>
          )}
          extraData={item => item._id}
        />
        <AppRoundAddActionButton
          onPress={() => navigation.navigate('CreateGuardScreen')}
        />
      </View>
    </View>
  );
};

export default GuardList;

const style = StyleSheet.create({
  card: {
    ...shadow,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    padding: 10,
    backgroundColor: 'white',
    marginVertical: '2%',
    marginHorizontal: 2,
    borderRadius: 5,
    flexDirection: 'row',
  },
  profileImg: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.themeColor,
    borderRadius: 10000,
  },
  linearGradient: {
    backgroundColor: COLORS.inputtext,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 1000,
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shiftTxt: {
    marginLeft: '3%',
    color: 'white',
    marginVertical: '3%',
    fontFamily: 'Axiforma-Medium',
  },
  cardDetailCnt: {
    flex: 1,
    marginLeft: '2%',
    justifyContent: 'center',
  },
});
