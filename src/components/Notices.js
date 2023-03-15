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
    <Fragment>
      <SafeAreaView style={[globalStyle.cntWithTheme]}>
        {/* Header */}
        <AppHeader title={'Notice'} navigation={navigation} />

        {/* Detail Data View */}
        <FullCardBackground
          RenderUI={() => (
            <FlatList
              data={Notice?.data}
              ListEmptyComponent={() => (
                <AppLoaderSrceen loader={Notice.loader} error={Notice.error} />
              )}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('NoticeScreen', {
                        screen: 'NoticeDetailScreen',
                        params: {item: item},
                      })
                    }
                    style={style.cardCnt}>
                    <View style={style.bellIcon}>
                      <BellIcon />
                    </View>
                    <View style={style.detailCnt}>
                      <Text style={style.cardTitle}>{item.title}</Text>
                      <Text style={style.cardDescription} numberOfLines={2}>
                        {item.description}
                      </Text>
                      <View style={style.createdCnt}>
                        <Calendor style={{marginRight: '1.5%'}} />
                        <Text style={[style.dateTxt, {fontSize: 12}]}>
                          {moment(`${item.createdDate}`).format('DD/MMM/YYYY')}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              extraData={({item, index}) => index}
            />
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: 'white'}} />
    </Fragment>
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
