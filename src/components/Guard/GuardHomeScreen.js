import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import AppRoundAddActionButton from '../../ReUsableComponents/AppRoundAddActionButton';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import {useDispatch, useSelector} from 'react-redux';
import User from '../../assets/images/User.svg';
import Moon from '../../assets/images/Moon.svg';
import Sun from '../../assets/images/Sun.svg';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import DatePicker from 'react-native-date-picker';
import {VisitorsFakeList} from '../../assets/Jsons';
import moment from 'moment';
import VisitorFilters from './VisitorFilters';
import {API_URL, GetData, PostData} from '../../assets/services';
import {
  GET_VISITORS_LIST_REQUEST,
  UPDATE_VISITORS_LIST,
} from '../../redux/Actions';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';

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
    console.log(item);
    setOutIndex(index);
    const payload = {
      url: API_URL + 'visitor/out',
      body: {
        visitorId: item._id,
      },
    };

    try {
      const Result = await PostData(payload);
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
        setFilter({loader: false, data: Result.data.data});
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
    return (
      <View
        style={[
          styles.cardCnt,
          {backgroundColor: item.outTime ? 'white' : '#FFF7E6'},
        ]}>
        {/* Basic Detail */}
        <View style={styles.cardBasicDetailCnt}>
          <Image source={{uri: item.image}} style={styles.profilePic} />
          <View style={styles.detailCnt}>
            <DescriptionText text={item.name} style={styles.userName} />
            <DescriptionText
              text={`House No.${item.houseNumber}`}
              style={styles.userHouse}
            />
          </View>
        </View>
        {/* In out time view */}
        <View style={{justifyContent: 'center'}}>
          {[
            {param: 'inTime', title: 'In Time'},
            {param: 'outTime', title: 'Out Time'},
          ].map((button, i) => {
            return (
              <View key={i} style={styles.timeDetailCnt}>
                <DescriptionText text={button.title} style={styles.timeTxt} />
                <TouchableOpacity
                  activeOpacity={
                    !item['outTime'] && button.param === 'outTime' ? 0.5 : 1
                  }
                  onPress={() => {
                    !item['outTime'] &&
                      button.param === 'outTime' &&
                      checkOutUser(item, index);
                  }}
                  style={[
                    styles.timeButton,
                    {
                      backgroundColor:
                        button.param === 'inTime'
                          ? COLORS.themeColor
                          : COLORS.buttonColor,
                    },
                  ]}>
                  <TitleText
                    text={item[button.param] ? item[button.param] : 'Exit'}
                    style={{fontSize: 10, color: 'white'}}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        {/* Header */}
        <View style={styles.headerCnt}>
          <View>
            <TitleText
              text={`Hello, ${state?.userDetail?.data?.name}`}
              style={[styles.headerTitle, {marginBottom: '4%'}]}
            />
            <View style={styles.dayTxtCnt}>
              <DescriptionText
                text={`${state?.userDetail?.data?.shift} Shift`}
                style={styles.headerTitle}
              />
              <View style={{marginLeft: '5%'}}>
                {state?.userDetail?.data?.shift === 'day' ? <Sun /> : <Moon />}
              </View>
            </View>
          </View>
          <View style={styles.actionBtnCnt}>
            {[<User />].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.actionBtn]}
                  onPress={() => navigation.navigate('ProfileStackScreen')}>
                  {state?.userDetail?.data?.profileImage ? (
                    <Image
                      source={{uri: state?.userDetail?.data?.profileImage}}
                      style={styles.profileImg}
                    />
                  ) : (
                    item
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* Body */}
        <View style={styles.bodyCnt}>
          <View style={{flex: 1}}>
            <TitleText
              text={'Visitors'}
              style={{fontSize: 18, color: COLORS.inputtext}}
            />
            {/* Filters */}
            <VisitorFilters filters={filters} setFilters={setFilters} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => setFilter({loader: false, data: []})}>
                <TitleText
                  style={{
                    fontSize: 14,
                    color: 'red',
                  }}
                  text={filter.data.length > 0 ? 'Clear' : ''}
                />
              </TouchableOpacity>
              {filters.From && filters.To && (
                <TouchableOpacity
                  style={{marginBottom: '2%'}}
                  onPress={applyFilter}>
                  <TitleText
                    style={{
                      fontSize: 14,
                      color: 'red',
                    }}
                    text={'Apply Filter'}
                  />
                </TouchableOpacity>
              )}
            </View>
            {/* Visitors Lists */}
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
          </View>
          <AppRoundAddActionButton
            onPress={() => navigation.navigate('AddVisitor')}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: '#F2FCFF'}} />
    </Fragment>
  );
};

export default GuardHomeScreen;

const styles = StyleSheet.create({
  headerCnt: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#F3F4F6',
  },
  actionBtnCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '23%',
  },
  actionBtn: {
    height: 34,
    width: 34,
    borderRadius: 1000,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyCnt: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    backgroundColor: '#F2FCFF',
  },
  dayTxtCnt: {flexDirection: 'row', alignItems: 'center'},
  profileImg: {
    height: '100%',
    width: '100%',
    borderRadius: 1000,
  },
  cardCnt: {
    ...shadow,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingHorizontal: 9,
    paddingVertical: 15,
    marginVertical: '2.5%',
    marginHorizontal: 2,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardBasicDetailCnt: {flexDirection: 'row', flex: 1},
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 1000,
    backgroundColor: COLORS.inputBorder,
  },
  detailCnt: {justifyContent: 'center', marginLeft: '4%'},
  userName: {fontSize: 16, color: '#202937', marginBottom: '2%'},
  userHouse: {fontSize: 12, color: COLORS.titleFont},
  timeDetailCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeTxt: {fontSize: 10, color: '#6B737F', marginRight: '2%'},
  timeButton: {
    marginVertical: '2%',
    width: 50,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
