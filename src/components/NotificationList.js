import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyle, shadow} from '../assets/theme';
import AppHeader from '../ReUsableComponents/AppHeader';
import {API_URL, GetData} from '../assets/services';
import AppLoaderSrceen from '../ReUsableComponents/AppLoaderSrceen';

const NotificationList = ({navigation}) => {
  const [data, setData] = useState({
    loader: false,
    error: '',
    data: [],
  });

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
          data: Result.data.data,
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

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={"Notification's"} />
      <FlatList
        data={data.data}
        style={{flex: 1}}
        extraData={item => item._id}
        ListEmptyComponent={() => (
          <AppLoaderSrceen error={data.error} loader={data.loader} />
        )}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                margin: 10,
                borderRadius: 10,
                ...shadow,
              }}>
              <Text
                style={{
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 17,
                  color: 'black',
                }}>
                {item &&
                  item.payload &&
                  item.payload.notification &&
                  item.payload.notification.title}
                <Text style={{fontSize: 12, color: 'red'}}>
                  {` (`}
                  {item.topic}
                  {`)`}
                </Text>
              </Text>
              <View style={{flexDirection: 'row', marginTop: '2%'}}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: 'lightgrey',
                    borderRadius: 10,
                    marginRight: 5,
                  }}
                  source={{
                    uri:
                      item && item.payload && item.payload.notification
                        ? item.payload.notification.image
                        : '',
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Axiforma-medium',
                    fontSize: 13,
                    marginTop: '2%',
                    color: 'black',
                  }}>
                  {item &&
                    item.payload &&
                    item.payload.notification &&
                    item.payload.notification.body}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default NotificationList;
