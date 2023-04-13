import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../assets/theme';
import AppHeader from '../ReUsableComponents/AppHeader';
import BellIcon from '../assets/images/Bell.svg';
import Calendor from '../assets/images/Caledor.svg';
import FullCardBackground from '../ReUsableComponents/FullCardBackground';
import {useDispatch, useSelector} from 'react-redux';
import {NOTICE_LIST_REQUEST} from '../redux/Actions';
import AppLoaderSrceen from '../ReUsableComponents/AppLoaderSrceen';
import moment from 'moment';

const Notices = ({navigation}) => {
  const dispatch = useDispatch();
  const Notice = useSelector(state => state.NoticeReducer);
  useEffect(() => {
    dispatch({type: NOTICE_LIST_REQUEST});
  }, []);

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={'Notice'} />
      <FlatList
        data={Notice?.data}
        ListEmptyComponent={() => (
          <AppLoaderSrceen loader={Notice.loader} error={Notice.error} />
        )}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('NoticeScreen', {
                  screen: 'NoticeDetailScreen',
                  params: {item: item},
                })
              }
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: 'white',
                width: '90%',
                alignSelf: 'center',
                marginVertical: '5%',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.1,
                shadowRadius: 1.84,

                elevation: 5,
              }}>
              <Calendor />
              <View style={{marginHorizontal: '5%'}}>
                <Text
                  style={{
                    fontFamily: 'Axiforma-Medium',
                    fontSize: 18,
                    color: '#262626',
                    marginBottom: '3%',
                  }}>
                  {item.title}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 16,
                    color: '#72767c',
                    lineHeight: 25,
                    marginBottom: '1.5%',
                  }}>
                  {item.description}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 12,
                    color: '#ABACB0',
                  }}>
                  {moment(`${item.createdDate}`).format('DD/MMM/YYYY')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        extraData={({item, index}) => index}
      />
    </View>
  );
};

export default Notices;

const style = StyleSheet.create({
  cardCnt: {
    borderBottomWidth: 0.5,
    borderColor: '#D2D5DC',
    padding: 16,
    flexDirection: 'row',
  },
  bellIcon: {
    flexDirection: 'row',
    height: 60,
    width: 60,
    backgroundColor: COLORS.listCardBackTheme,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailCnt: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: 0.5,
    marginBottom: '1%',
  },
  cardDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4C5564',
    marginBottom: '2%',
  },
  createdCnt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTxt: {
    fontSize: 10,
    fontWeight: '400',
    color: '#4C5564',
    // marginBottom: '2%',
  },
});
