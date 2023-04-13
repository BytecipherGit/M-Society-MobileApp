import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../assets/theme';
import Bell from '../assets/images/Bell.svg';
import User from '../assets/images/User.svg';
import Calendor from '../assets/images/Caledor.svg';
import {SocietyOptions} from '../assets/Jsons';
import TitleText from "../ReUsableComponents/Text's/TitleText";
import {useDispatch, useSelector} from 'react-redux';
import {NOTICE_LIST_REQUEST, SET_USER_TYPE} from '../redux/Actions';
import moment from 'moment';
import {getAsyncValue} from '../assets/services';
import TakePayment from '../assets/images/TakePayment.svg';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const HomeScreen = ({navigation}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const state = useSelector(state => state.AuthReducer);
  const Notice = useSelector(state => state.NoticeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getNoticeList();
    getUserType();
  }, []);

  const getNoticeList = () => {
    dispatch({type: NOTICE_LIST_REQUEST});
  };

  const getUserType = async () => {
    let Result = await getAsyncValue('user');
    if (Result) {
      Result = JSON.parse(Result);
    }

    if (Result.data.isAdmin === 1 || Result.data.isAdmin === '1') {
      setIsAdmin(true);
      if (SocietyOptions.length !== 8) {
        SocietyOptions.push({
          id: 6,
          title: 'TAKE PAYMENT',
          navigationScreen: 'TakePaymentScreen',
          image: <TakePayment />,
        });
      }
    } else {
      // remove the take payment and resident here.

      const index = SocietyOptions.findIndex(
        item => item.title === 'TAKE PAYMENT',
      );

      if (index > 0) {
        SocietyOptions.splice(index, 1);
      }
    }

    if (Result.data.userType === 'owner') {
      dispatch({type: SET_USER_TYPE, payload: true});
    }
  };

  return (
    <LinearGradient
      colors={['#AFDBFF80', '#F9F9F9', '#F9F9F9']}
      style={{
        flex: 1,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            height:
              Notice.data.length > 0
                ? Notice.data.length === 1
                  ? Dimensions.get('window').height / 3
                  : Dimensions.get('window').height / 2.4
                : '5%',
          }}>
          <ImageBackground
            source={require('../assets/images/gridBackground.png')}
            style={{flex: 0.8, marginHorizontal: 15}}>
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
              {/* notification icon */}
              <TouchableOpacity style={{marginRight: '4%'}}>
                <FontAwesome
                  name="bell-o"
                  style={{
                    fontSize: 25,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    backgroundColor: '#F53232',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 1000,
                    marginTop: '-15%',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Bold',
                      color: 'white',
                      margin: 3,
                      marginHorizontal: '20%',
                      fontSize: 10,
                    }}>
                    1
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* Notice lists in card */}
            {Notice.data.length > 0 && (
              <View style={{marginVertical: 25}}>
                <Text
                  style={{
                    fontFamily: 'Axiforma-Bold',
                    fontSize: 18,
                    color: COLORS.titleFont,
                  }}>
                  Society Notice
                </Text>
                <Carousel
                  layout={'default'}
                  ref={ref => null}
                  data={Notice?.data}
                  sliderWidth={Dimensions.get('window').width / 1.02}
                  itemWidth={Dimensions.get('window').width / 1}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          width: Dimensions.get('window').width / 1.07,
                          // height: 220,
                          backgroundColor: 'white',
                          marginTop: 15,
                          borderRadius: 20,
                          padding: 20,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Calendor />
                          <Text
                            style={{
                              fontFamily: 'Axiforma-Regular',
                              fontSize: 12,
                              color: '#ABACB0',
                            }}>
                            {moment(`${item.createdDate}`).format(
                              'DD/MMM/YYYY',
                            )}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontFamily: 'Axiforma-Medium',
                              fontSize: 18,
                              color: '#262626',
                              marginVertical: '3%',
                              marginTop: '7%',
                            }}>
                            {item.title}
                          </Text>
                          <Text
                            numberOfLines={3}
                            styl={{
                              fontFamily: 'Axiforma-Regular',
                              fontSize: 16,
                              color: '#72767C',
                              lineHeight: 25,
                            }}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                  onSnapToItem={index => setActiveIndex(index)}
                />
                <Pagination
                  dotsLength={Notice?.data?.length}
                  activeDotIndex={activeIndex}
                  containerStyle={
                    {
                      // backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    }
                  }
                  dotStyle={{
                    width: 12,
                    height: 10,
                    borderRadius: 1000,
                    marginHorizontal: -5,
                    backgroundColor: '#A9A9A9',
                  }}
                  activeDotStyle={
                    {
                      // Define styles for inactive dots here
                    }
                  }
                  inactiveDotOpacity={0.8}
                  inactiveDotScale={0.5}
                />
              </View>
            )}
          </ImageBackground>
        </View>
        <View style={{marginHorizontal: 15, marginTop: '10%'}}>
          <Text
            style={{
              fontFamily: 'Axiforma-Bold',
              fontSize: 20,
            }}>
            Society Services
          </Text>
          <FlatList
            data={SocietyOptions}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                  // backgroundColor: 'red',
                  width: '52%',
                }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate(item.navigationScreen)}
                  style={{
                    height: 110,
                    width: 170,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0.12,
                    shadowRadius: 2,
                    elevation: 3,
                    marginLeft: '1%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 1000,
                      backgroundColor: '#F7F7F7',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.image}
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Medium',
                      fontSize: 14,
                      color: '#707070',
                      marginTop: '10%',
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={() => <View style={{height: 400}} />}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

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
  HeaderCnt: {
    marginTop: '4%',
  },
  HeaderDetailCnt: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DetailViewMoreButton: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B737F',
    lineHeight: 19.6,
    letterSpacing: 0.5,
    marginTop: '3%',
    textAlign: 'justify',
  },
  cardNumberText: {
    fontSize: 12,
    color: '#9CA2AD',
    fontFamily: 'Inter-Medium',
  },
  horizonalCnt: {
    width: '95.6%',
    alignSelf: 'flex-end',
    marginTop: '2%',
  },
  horizonalCardCnt: {
    ...shadow,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 146,
    width: Dimensions.get('window').width / 1.1,
    backgroundColor: 'white',
    marginVertical: '1.5%',
    marginHorizontal: 6,
    borderRadius: 16,
    padding: 15,
  },
  cardCreateDetailCnt: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  societyDetailButtons: {
    ...shadow,
    shadowOffset: {
      width: 0,
      height: 0.7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 168,
    width: 160,
    borderRadius: 14,
    backgroundColor: 'white',
    margin: '1.5%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  loaderView: {
    height: 140,
    width: Dimensions.get('window').width / 1.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
