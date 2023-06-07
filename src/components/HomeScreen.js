import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../assets/theme';
import {SocietyOptions} from '../assets/Jsons';
import {useDispatch, useSelector} from 'react-redux';
import {
  NOTICE_LIST_REQUEST,
  NOTICE_LIST_REQUEST_SILENT,
  SET_USER_TYPE,
} from '../redux/Actions';
import {getAsyncValue} from '../assets/services';
import TakePayment from '../assets/images/TakePayment.svg';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeNoticeCrousal from './HomeNoticeCrousal';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const state = useSelector(state => state.AuthReducer);
  const Notice = useSelector(state => state.NoticeReducer);
  const stateForTheme = useSelector(state => state.AuthReducer.userDetail);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocus) {
      getNoticeList();
      getUserType();
    }
  }, [isFocus]);

  const getNoticeList = () => {
    dispatch({type: NOTICE_LIST_REQUEST_SILENT});
  };

  const getUserType = async () => {
    let Result = await getAsyncValue('user');
    if (Result) {
      Result = JSON.parse(Result);
    }

    if (Result.data.isAdmin === 1 || Result.data.isAdmin === '1') {
      setIsAdmin(true);
      if (SocietyOptions.length !== 9) {
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

  const Label = Platform.OS === 'ios' ? SafeAreaView : View;

  return (
    <LinearGradient
      colors={[
        stateForTheme && stateForTheme.data && stateForTheme.data.societyId
          ? stateForTheme.data.societyId.primaryColour
          : COLORS.themeColor,
        '#F9F9F9',
        '#F9F9F9',
      ]}
      style={{
        flex: 1,
      }}>
      <Label style={{flex: 1}}>
        <View
          style={{
            height:
              Notice.data.length > 0
                ? Notice.data.length === 1
                  ? Dimensions.get('window').height / 3
                  : Dimensions.get('window').height / 2.9
                : '5%',
          }}>
          <ImageBackground
            source={require('../assets/images/gridBackground.png')}
            style={{flex: 0.8, marginHorizontal: 15, marginTop: '2%'}}
            tintColor="rgba(255,255,255,.2)" // Set the desired tint color here
          >
            {/* Header */}
            <View style={styles.headerCnt}>
              {/* User normal Detail */}
              <View style={styles.userDetailCnt}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileStackScreen')}>
                  <Image
                    source={{
                      uri: state?.userDetail?.data?.profileImage
                        ? state?.userDetail?.data.profileImage
                        : 'https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
                    }}
                    style={styles.userIcon}
                  />
                </TouchableOpacity>
                <View style={{marginHorizontal: '3%'}}>
                  <Text style={styles.helloTxt}>Hello</Text>
                  <Text style={styles.userName}>
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
                <View style={styles.notificationNumberCnt}>
                  <Text style={styles.notificationNumber}>1</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* Notice lists in card */}
            {Notice.data.length > 0 && (
              <HomeNoticeCrousal
                Notices={Notice?.data}
                activeIndex={activeIndex}
                setActiveIndex={index => setActiveIndex(index)}
              />
            )}
          </ImageBackground>
        </View>
        <View style={styles.societyServices}>
          <Text style={styles.societyServicesTxt}>Society Services</Text>
          <FlatList
            data={SocietyOptions}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({item, index}) => (
              <View style={styles.cardCnt}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    item.param
                      ? navigation.navigate(item.navigationScreen, item.param)
                      : navigation.navigate(item.navigationScreen);
                  }}
                  style={styles.card}>
                  <View style={styles.cardIcon}>{item.image}</View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={() => <View style={{height: 400}} />}
          />
        </View>
      </Label>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetailCnt: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  userIcon: {
    height: 40,
    width: 40,
    borderRadius: 1000,
    backgroundColor: COLORS.themeColor,
  },
  helloTxt: {
    fontFamily: 'Axiforma-Regular',
    color: '#808080',
    fontSize: 14,
    marginBottom: '3%',
  },
  userName: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 20,
    color: COLORS.softDescText,
  },
  notificationNumberCnt: {
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: '#F53232',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    marginTop: '-15%',
  },
  notificationNumber: {
    fontFamily: 'Axiforma-Bold',
    color: 'white',
    margin: 3,
    marginHorizontal: '20%',
    fontSize: 10,
  },
  societyServices: {marginHorizontal: 15, marginTop: '10%'},
  societyServicesTxt: {
    fontFamily: 'Axiforma-Bold',
    fontSize: 20,
    color: COLORS.titleFont,
  },
  cardCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    // backgroundColor: 'red',
    width: '52%',
  },
  card: {
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
  },
  cardIcon: {
    height: 60,
    width: 60,
    borderRadius: 1000,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 14,
    color: '#707070',
    marginTop: '10%',
  },
});
