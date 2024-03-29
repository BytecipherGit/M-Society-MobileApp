import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import Calendor from '../assets/images/Caledor.svg';
import {useDispatch, useSelector} from 'react-redux';
import {NOTICE_LIST_REQUEST} from '../../redux/Actions';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
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
        style={{marginTop: '4%'}}
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
              style={style.card}>
              <Calendor />
              <View style={{marginHorizontal: '5%'}}>
                <Text style={style.cardTitle}>{item.title}</Text>
                <Text numberOfLines={2} style={style.cardDesc}>
                  {item.description}
                </Text>
                <Text style={style.cardDate}>
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
  card: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    marginVertical: '2%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow,
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
  cardTitle: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 18,
    color: COLORS.blackFont,
    marginBottom: '3%',
  },
  cardDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.greyFont,
    lineHeight: 25,
    marginBottom: '1.5%',
  },
  cardDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#ABACB0',
  },
});
