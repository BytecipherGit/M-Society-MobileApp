import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../assets/theme';
import AppHeader from '../ReUsableComponents/AppHeader';
import BellIcon from '../assets/images/Bell.svg';
import Calendor from '../assets/images/Caledor.svg';
import FullCardBackground from '../ReUsableComponents/FullCardBackground';
import {useDispatch, useSelector} from 'react-redux';
import {
  NOTICE_DELETE_REQUEST,
  NOTICE_DELETE_SUCCESS,
  NOTICE_LIST_REQUEST,
  NOTICE_LIST_SUCCESS,
} from '../redux/Actions';
import AppLoaderSrceen from '../ReUsableComponents/AppLoaderSrceen';
import moment from 'moment';
import AppRoundAddActionButton from '../ReUsableComponents/AppRoundAddActionButton';
import {useIsFocused} from '@react-navigation/native';
import {API_URL, DeleteData, SnackError} from '../assets/services';
import AppCrudActionButton from '../ReUsableComponents/AppCrudActionButton';

const Notices = ({navigation}) => {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const Notice = useSelector(state => state.NoticeReducer);
  const {isAdmin} = useSelector(state => state.AuthReducer);
  const [deleteLoader, setDeleteLoader] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isFocus) {
      dispatch({type: NOTICE_LIST_REQUEST});
    }
  }, [isFocus]);

  useEffect(() => {
    if (Notice.data.length > 0) {
      setData(Notice.data);
    }
  }, [Notice]);

  const doActions = async (item, type, index) => {
    //Edit,Delete

    if (type === 'Edit') {
      return navigation.navigate('EditNotice', {noticeDetail: item});
    }
    setDeleteLoader(item._id);

    try {
      const Result = await DeleteData({
        url: API_URL + 'notice/',
        body: {id: item._id},
      });

      if (Result.success === true) {
        let arr = Notice.data;

        arr.splice(index, 1);
        setData([...arr]);
      } else {
        SnackError(Result.message);
      }
    } catch (e) {
      SnackError('Something went wrong, please try again later.');
    }
    setDeleteLoader('');
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={'Notice'} />
      <FlatList
        data={data}
        style={{marginTop: '4%'}}
        ListEmptyComponent={() => (
          <AppLoaderSrceen loader={Notice.loader} error={Notice.error} />
        )}
        renderItem={({item, index}) => {
          return (
            <View>
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
              <AppCrudActionButton
                item={item}
                index={index}
                loaderIndex={deleteLoader}
                doActions={doActions}
              />
            </View>
          );
        }}
        extraData={({item, index}) => index}
      />
      {isAdmin && (
        <AppRoundAddActionButton
          onPress={() => navigation.navigate('CreateNotice')}
        />
      )}
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
