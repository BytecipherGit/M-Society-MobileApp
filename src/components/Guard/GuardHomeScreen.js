import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import AppRoundAddActionButton from '../../ReUsableComponents/AppRoundAddActionButton';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import VisitorFilters from './VisitorFilters';
import {
  API_URL,
  GetData,
  PostData,
  PutData,
  SnackError,
} from '../../assets/services';
import {
  GET_VISITORS_LIST_REQUEST,
  UPDATE_VISITORS_LIST,
} from '../../redux/Actions';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const GuardHomeScreen = ({navigation}) => {
  const state = useSelector(state => state.AuthReducer);
  const [filters, setFilters] = useState({
    From: '',
    To: '',
  });
  const [filter, setFilter] = useState({
    loader: false,
    data: [],
  });
  const [outIndex, setOutIndex] = useState(null);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

  const dispatch = useDispatch();
  const visitors = useSelector(state => state.GuardReducer);

  useEffect(() => {
    getVisitorsList();
  }, []);

  const getVisitorsList = async () => {
    dispatch({type: GET_VISITORS_LIST_REQUEST});
  };

  const errorAlert = msg => {
    setAlertData({
      visible: true,
      message: msg,
      iconType: 'error',
    });
  };

  const checkOutUser = async (item, index) => {
    Alert.alert('', 'Are you sure you want to Exit?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          setOutIndex(index);
          const payload = {
            url: API_URL + 'visitor/out',
            body: {
              visitorId: item._id,
            },
          };

          try {
            const Result = await PutData(payload);
            if (Result.data.success) {
              if (filter.data.length > 0) {
                const arr = filter.data;
                arr[index].outTime = moment().format('HH:MM a');
                setFilter({...filter, data: [...arr]});
              } else {
                const arr = visitors.data;
                arr[index].outTime = moment().format('HH:MM a');
                dispatch({type: UPDATE_VISITORS_LIST, payload: arr});
              }
            } else {
              errorAlert(Result.data.message);
            }
          } catch (e) {
            errorAlert('Something went wrong please try again later.');
          }
          setOutIndex(null);
        },
      },
    ]);

    // const Result = await PostData(payload);
  };

  const applyFilter = async () => {
    const payload = {
      url:
        API_URL +
        `visitor/guard/all?fromDate=${moment(`${filters.From}`).format(
          'YYYY-MM-DD',
        )}&toDate=${moment(`${filters.To}`).format('YYYY-MM-DD')}`,
    };
    setFilter({...filter, loader: true});
    try {
      const Result = await GetData(payload);
      if (Result.data.success) {
        if (Result.data.data.length > 0) {
          setFilter({loader: false, data: Result.data.data});
        } else {
          SnackError('No Filter Data Found.');
          setFilter({loader: false, data: []});
          setFilters({From: '', To: ''});
        }
      } else {
        errorAlert(Result.data.message);
        setFilter({...filter, loader: false});
      }
    } catch (e) {
      errorAlert('Something went wrong please try again later.');
      setFilter({...filter, loader: false});
    }
  };

  const visitorsListUI = ({item, index}) => {
    const {image, houseNumber, phoneNumber, createdDate, name, countryCode} =
      item;
    return (
      <View style={[styles.cardCnt]}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: image}} style={styles.cardImage} />
          <View style={styles.cardUserMainDetail}>
            <View style={{marginLeft: 10}}>
              <Text style={styles.cardName}>{name}</Text>
              <Text style={styles.cardPhoneNumber}>
                {countryCode + ' ' + phoneNumber}
              </Text>
            </View>
            <View style={{height: '80%'}}>
              <Text style={styles.cardDate}>
                {moment(`${createdDate}`).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: '5%'}}>
          {[
            {
              title: 'House Number',
              param: 'houseNumber',
            },
            {
              title: 'In Time',
              param: 'inTime',
            },
            {
              title: 'Reason',
              param: 'reasone',
            },
          ].map((data, index) => (
            <View key={index} style={{marginVertical: '1%'}}>
              <Text style={styles.cardDetailHeader}>
                {data.title} -{' '}
                <Text
                  style={{
                    color: COLORS.titleFont,
                  }}>
                  {item[data.param]}
                </Text>
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.devider} />
        <TouchableOpacity
          onPress={() => !item.outTime && checkOutUser(item, index)}>
          <Text style={styles.outTimeButton}>
            {item.outTime ? 'Out Time: ' + item.outTime : 'Exit Visitor'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#AFDBFF80', '#F9F9F9', '#F9F9F9']}
      style={styles.leanerCnt}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            height: '5%',
          }}>
          <ImageBackground
            source={require('../../assets/images/gridBackground.png')}
            style={{marginHorizontal: 15}}>
            {/* Header */}
            <View style={styles.headerCnt}>
              {/* User normal Detail */}
              <View
                style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileStackScreen')}>
                  <Image
                    source={{
                      uri: state?.userDetail?.data.profileImage
                        ? state?.userDetail?.data.profileImage
                        : 'https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
                    }}
                    style={styles.headerProfileIcon}
                  />
                </TouchableOpacity>
                <View style={{marginHorizontal: '3%'}}>
                  <Text style={styles.headerHelloIcon}>Hello</Text>
                  <Text style={styles.headerProfileTitle}>
                    {state?.userDetail?.data.name}
                  </Text>
                </View>
              </View>

              <FontAwesome
                name={
                  state?.userDetail?.data?.shift === 'day' ? 'sun-o' : 'moon-o'
                }
                style={styles.headerShiftIcon}
              />
            </View>
            <View style={{height: 200}} />
          </ImageBackground>
        </View>

        <VisitorFilters filters={filters} setFilters={setFilters} />
        {filters.From && filters.To && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                setFilter({loader: false, data: []}),
                  setFilters({From: '', To: ''});
              }}>
              <TitleText
                style={[styles.applyFilterTxt]}
                text={'Clear Filter'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginBottom: '2%'}}
              onPress={applyFilter}>
              <TitleText style={styles.applyFilterTxt} text={'Apply Filter'} />
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={
            filter.loader
              ? []
              : filter.data.length > 0
              ? filter.data
              : visitors.data
          }
          ListEmptyComponent={() => (
            <AppLoaderSrceen
              loader={visitors.loader || filter.loader}
              error={visitors.error}
            />
          )}
          ListFooterComponent={() => <View style={{height: 70}} />}
          renderItem={visitorsListUI}
          extraData={item => item._id}
        />
      </SafeAreaView>
      <AppRoundAddActionButton
        onPress={() => navigation.navigate('AddVisitor')}
      />
    </LinearGradient>
  );
};

export default GuardHomeScreen;

const styles = StyleSheet.create({
  cardCnt: {
    ...shadow,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  leanerCnt: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerProfileIcon: {
    height: 40,
    width: 40,
    borderRadius: 1000,
    backgroundColor: 'grey',
  },
  headerHelloIcon: {
    fontFamily: 'Axiforma-Regular',
    color: '#808080',
    fontSize: 14,
    marginBottom: '3%',
  },
  headerProfileTitle: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 20,
    color: COLORS.softDescText,
  },
  headerShiftIcon: {
    fontSize: 25,
    alignSelf: 'center',
    color: COLORS.blackFont,
  },
  applyFilterTxt: {
    fontSize: 14,
    color: 'red',
    alignSelf: 'flex-end',
  },
  cardImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.themeColor,
  },
  cardUserMainDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '86%',
    alignItems: 'center',
  },
  cardName: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 19,
    color: COLORS.blackFont,
    marginBottom: '4%',
  },
  cardPhoneNumber: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 14,
    color: COLORS.descFont,
  },
  cardDate: {
    fontFamily: 'Axiforma-Light',
    fontSize: 12,
    color: '#ABACB0',
  },
  cardDetailHeader: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 14,
    color: COLORS.descFont,
  },
  devider: {
    borderWidth: 1,
    borderStyle: 'dashed',
    marginTop: '3%',
    borderColor: '#C8C8C8',
  },
  outTimeButton: {
    marginVertical: 15,
    marginTop: 20,
    alignSelf: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FF7334',
    letterSpacing: 1,
  },
});
