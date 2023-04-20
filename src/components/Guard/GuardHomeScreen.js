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
  ImageBackground,
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
    const {image, houseNumber, phoneNumber, createdDate, name} = item;
    return (
      <View style={[styles.cardCnt]}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: image}}
            style={{
              height: 50,
              width: 50,
              borderRadius: 10,
              backgroundColor: COLORS.themeColor,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // flex: 0.8,
              width: '86%',
              alignItems: 'center',
            }}>
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontFamily: 'Axiforma-Medium',
                  fontSize: 19,
                  color: COLORS.blackFont,
                  marginBottom: '4%',
                }}>
                {name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Axiforma-Regular',
                  fontSize: 14,
                  color: COLORS.descFont,
                }}>
                {phoneNumber}
              </Text>
            </View>
            <View style={{height: '80%'}}>
              <Text
                style={{
                  fontFamily: 'Axiforma-Light',
                  fontSize: 12,
                  color: '#ABACB0',
                }}>
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
              <Text
                style={{
                  fontFamily: 'Axiforma-Regular',
                  fontSize: 14,
                  color: COLORS.descFont,
                }}>
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
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            marginTop: '3%',
            borderColor: '#C8C8C8',
          }}
        />
        <TouchableOpacity
          onPress={() => !item.outTime && checkOutUser(item, index)}>
          <Text
            style={{
              marginVertical: 15,
              marginTop: 20,
              alignSelf: 'center',
              fontFamily: 'Inter-SemiBold',
              fontSize: 14,
              color: '#FF7334',
              letterSpacing: 1,
            }}>
            {item.outTime ? item.outTime : 'Exit Visitor'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#AFDBFF80', '#F9F9F9', '#F9F9F9']}
      style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            height: '5%',
          }}>
          <ImageBackground
            source={require('../../assets/images/gridBackground.png')}
            style={{marginHorizontal: 15}}>
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
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
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 1000,
                      backgroundColor: 'grey',
                    }}
                  />
                </TouchableOpacity>
                <View style={{marginHorizontal: '3%'}}>
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Regular',
                      color: '#808080',
                      fontSize: 14,
                      marginBottom: '3%',
                    }}>
                    Hello
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Regular',
                      fontSize: 20,
                      color: '#656565',
                    }}>
                    {state?.userDetail?.data.name}
                  </Text>
                </View>
              </View>

              <FontAwesome
                // name="moon-o"
                name={
                  state?.userDetail?.data?.shift === 'day' ? 'sun-o' : 'moon-o'
                }
                style={{
                  fontSize: 25,
                  alignSelf: 'center',
                  color: COLORS.blackFont,
                }}
              />
            </View>
            <View style={{height: 200}} />
          </ImageBackground>
        </View>

        <VisitorFilters filters={filters} setFilters={setFilters} />
        {filters.From && filters.To && (
          <TouchableOpacity style={{marginBottom: '2%'}} onPress={applyFilter}>
            <TitleText
              style={{
                fontSize: 14,
                color: 'red',
                alignSelf: 'flex-end',
              }}
              text={'Apply Filter'}
            />
          </TouchableOpacity>
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
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
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
