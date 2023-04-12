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

const HomeScreen = ({navigation}) => {
  const [isAdmin, setIsAdmin] = useState(false);
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
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <StatusBar
          backgroundColor={COLORS.themeColor}
          barStyle={'light-content'}
        />
        {/* Header */}
        <View style={styles.headerCnt}>
          <TitleText
            text={`Hello, ${state?.userDetail?.data?.name}`}
            style={styles.headerTitle}
          />
          <View style={styles.actionBtnCnt}>
            {[<User />].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.actionBtn]}
                  onPress={() => navigation.navigate('ProfileStackScreen')}>
                  {item}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{flex: 1, backgroundColor: 'white'}}>
          <FlatList
            data={[1]}
            // Society Notice Sections with horizontal Cards
            ListHeaderComponent={() => (
              <View style={styles.HeaderCnt}>
                {Notice.data.length > 0 && (
                  <>
                    <View style={styles.HeaderDetailCnt}>
                      <TitleText text={'Society Notice'} />
                    </View>
                    {/* Horizontal Card */}
                    <FlatList
                      horizontal
                      data={Notice?.data}
                      showsHorizontalScrollIndicator={false}
                      style={styles.horizonalCnt}
                      ListEmptyComponent={() => {
                        return (
                          <View style={styles.loaderView}>
                            {Notice.loader ? (
                              <ActivityIndicator color={COLORS.themeColor} />
                            ) : (
                              <Text
                                style={{
                                  fontFamily: 'Inter-Bold',
                                  color: 'red',
                                  letterSpacing: 0.5,
                                }}>
                                {Notice.error}
                              </Text>
                            )}
                          </View>
                        );
                      }}
                      renderItem={({item, index}) => (
                        <View style={styles.horizonalCardCnt}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <TitleText text={item.title} numberOfLines={1} />
                            <View style={styles.cardCreateDetailCnt}>
                              <Calendor style={{marginRight: '1.5%'}} />
                              <Text
                                style={[
                                  styles.DetailViewMoreButton,
                                  {fontSize: 12, marginLeft: 3},
                                ]}>
                                {moment(`${item.createdDate}`).format(
                                  'DD/MMM/YYYY',
                                )}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            activeOpacity={1}
                            style={{
                              flex: 1,
                            }}
                            onPress={() =>
                              navigation.navigate('NoticeScreen', {
                                screen: 'NoticeDetailScreen',
                                params: {item: item},
                              })
                            }>
                            <Text
                              style={styles.DetailViewMoreButton}
                              numberOfLines={4}>
                              {item.description}
                              <Text
                                style={{
                                  color: COLORS.buttonColor,
                                }}>
                                {' '}
                                Read more
                              </Text>
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      extraData={({item, index}) => index}
                    />
                  </>
                )}
              </View>
            )}
            renderItem={() => (
              <>
                <View style={styles.HeaderCnt}>
                  <View style={styles.HeaderDetailCnt}>
                    <TitleText text={'Society Services'} />
                  </View>
                </View>
                <FlatList
                  data={SocietyOptions}
                  numColumns={2}
                  style={{alignSelf: 'center', marginTop: '3%'}}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      style={styles.societyDetailButtons}
                      onPress={() =>
                        navigation.navigate(item.navigationScreen)
                      }>
                      {item.image}
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#111827',
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                  extraData={({item, index}) => index}
                />
              </>
            )}
            extraData={({item, index}) => index}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{height: 0, backgroundColor: 'white'}} />
    </Fragment>
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
