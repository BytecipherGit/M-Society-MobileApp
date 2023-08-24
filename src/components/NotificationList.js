import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../assets/theme';
import AppHeader from '../ReUsableComponents/AppHeader';
import {API_URL, GetData, PostData} from '../assets/services';
import AppLoaderSrceen from '../ReUsableComponents/AppLoaderSrceen';
import {useSelector} from 'react-redux';
import AppButton from '../ReUsableComponents/AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NotificationList = ({navigation}) => {
  const [data, setData] = useState({
    loader: false,
    error: '',
    data: [],
  });
  const [selectedTab, setSelectedTab] = useState('Notifications');
  const state = useSelector(state => state.AuthReducer.userDetail);
  const [actionId, setActionId] = useState('');

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    setData({
      loader: true,
      error: '',
      data: [],
    });
    try {
      const Result = await GetData({
        url: API_URL + 'user/notification',
      });

      if (Result.response) {
        setData({
          loader: false,
          error: 'Something went wrong please try again later.',
          data: [],
        });
      } else {
        setData({
          loader: false,
          error: Result.data.data.length > 0 ? '' : 'No notification found.',
          data: Result.data,
        });
      }
    } catch (e) {
      setData({
        loader: false,
        error: 'Something Went wrong please try again later.',
        data: [],
      });
    }
  };

  const DoAction = async (action, id) => {
    try {
      const Result = await PostData({
        url: API_URL + 'visitor/approve',
        body: {
          visitorId: id,
          isApprove: action,
          userType: 'user',
        },
      });
      if (Result.response) {
        SnackError(Result.reasone.data.message);
      } else {
        getNotifications();
      }
    } catch (e) {
      SnackError(
        'Something went wrong, please try again later for get visitors.',
      );
    }
  };

  const renderDesign = (item, index, showButtons) => {
    console.log(item);
    const linkText = item?.payload?.notification?.body;
    const startIndex = linkText?.indexOf('http://');
    const endIndex = linkText?.indexOf(' ', startIndex);

    const link = linkText.substring(
      startIndex,
      endIndex !== -1 ? endIndex : undefined,
    );

    return (
      <View style={style.card}>
        <View>
          <Text style={style.cardTitle}>
            {!showButtons
              ? item &&
                item.payload &&
                item.payload.notification &&
                item.payload.notification.title
              : item.name}
            <Text style={{fontSize: 12, color: 'red'}}>
              {` (`}
              {!showButtons
                ? item.topic
                : item.countryCode + ' ' + item.phoneNumber}
              {`)`}
            </Text>
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: '2%'}}>
          <Image
            style={style.cardImage}
            source={{
              uri: !showButtons
                ? item && item.payload && item.payload.notification
                  ? item.payload.notification.image
                  : ''
                : item?.image,
            }}
            resizeMode="contain"
          />
          <View style={style.cardDescCnt}>
            <Text style={style.cardDesc}>
              {!showButtons
                ? item &&
                  item.payload &&
                  item.payload.notification &&
                  item.payload.notification.body
                : item.reasone}
            </Text>
            {link && item?.payload?.notification?.body !== link && (
              <Text
                style={{
                  marginTop: '3%',
                  fontFamily: 'Axiforma-SemiBold',
                  color: 'blue',
                }}
                onPress={() => Linking.openURL(link)}>
                {link}
              </Text>
            )}
          </View>
        </View>
        {item.isApprove && (
          <View
            style={{
              marginVertical: '3%',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Axiforma-SemiBold',
              }}>
              Status:{' '}
              <Text
                style={{
                  fontFamily: 'Axiforma-Medium',
                  color: COLORS.titleFont,
                }}>
                {item?.isApprove
                  ? item.isApprove.charAt(0).toUpperCase() +
                    item.isApprove.slice(1).toLowerCase()
                  : 'Pending'}
              </Text>{' '}
              || Allow By:{' '}
              <Text
                style={{
                  fontFamily: 'Axiforma-Medium',
                  color: COLORS.titleFont,
                }}>
                {item?.byApprove
                  ? item.byApprove.charAt(0).toUpperCase() +
                    item.byApprove.slice(1).toLowerCase()
                  : '-'}
              </Text>
            </Text>
          </View>
        )}
        {showButtons &&
          !item.isApprove &&
          (actionId === item._id ? (
            <Text>Please Wait now....</Text>
          ) : (
            <View style={style.actionBtnCnt}>
              <AppButton
                buttonTitle={'Disallowed'}
                TouchableStyle={style.disAllowBtn}
                TextStyle={{
                  color: '#535353',
                }}
                onPress={() => {
                  if (!actionId) {
                    setActionId(item._id);
                    DoAction('disallow', item._id);
                  }
                }}
                colorArray={['#f7f7f7', '#f7f7f7']}
              />
              <AppButton
                buttonTitle={'Allowed'}
                renderIcon={() => (
                  <AntDesign
                    name="checkcircleo"
                    color={'white'}
                    style={{
                      marginRight: 5,
                      fontSize: 15,
                    }}
                  />
                )}
                onPress={() => {
                  if (!actionId) {
                    setActionId(item._id);
                    DoAction('allow', item._id);
                  }
                }}
                TouchableStyle={{
                  flex: 0.48,
                }}
              />
            </View>
          ))}
      </View>
    );
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={"Notification's"} />
      <View
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        {['Notifications', 'Visitors'].map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor:
                  selectedTab === item
                    ? state &&
                      state.data &&
                      state.data.societyId &&
                      state.data.societyId.buttonHoverBgColour
                    : 'lightgrey',
                padding: 10,
                flex: 0.47,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}
              onPress={() => setSelectedTab(item)}>
              <Text
                style={{
                  fontFamily: 'Axiforma-SemiBold',
                  marginVertical: '2%',
                  color:
                    selectedTab === item
                      ? state &&
                        state.data &&
                        state.data.societyId &&
                        state.data.societyId.fontColour
                      : 'grey',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        data={
          selectedTab === 'Notifications' ? data.data.data : data.data.visitor
        }
        style={{flex: 1}}
        extraData={item => item._id}
        ListEmptyComponent={() => (
          <AppLoaderSrceen
            error={
              data.error && selectedTab === 'Notifications'
                ? 'No notifications found'
                : 'No visitor Notifications found'
            }
            loader={data.loader}
          />
        )}
        renderItem={({item, index}) => {
          if (selectedTab !== 'Visitors' && item.topic !== 'visitor') {
            return renderDesign(item, index);
          } else if (selectedTab === 'Visitors') {
            return renderDesign(item, index, true);
          }
        }}
      />
    </View>
  );
};

export default NotificationList;

const style = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    ...shadow,
  },
  cardTitle: {
    fontFamily: 'Axiforma-SemiBold',
    fontSize: 17,
    color: 'black',
  },
  cardImage: {
    height: 50,
    width: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginRight: 5,
  },
  cardDescCnt: {
    width: '80%',
    marginTop: '1%',
  },
  cardDesc: {
    fontFamily: 'Axiforma-medium',
    fontSize: 13,
    marginTop: '2%',
    color: 'black',
  },
  actionBtnCnt: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  disAllowBtn: {
    flex: 0.48,
    ...shadow,
  },
});
