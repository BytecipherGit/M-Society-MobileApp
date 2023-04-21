import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../assets/theme';
import AppHeader from '../ReUsableComponents/AppHeader';
import AppRoundAddActionButton from '../ReUsableComponents/AppRoundAddActionButton';
import {useDispatch, useSelector} from 'react-redux';
import {COMPLAINT_LIST_REQUEST} from '../redux/Actions';
import AppLoaderSrceen from '../ReUsableComponents/AppLoaderSrceen';
import moment from 'moment';

const CompaintList = ({navigation}) => {
  const [defaultComplaint, setDefaultComplaint] = useState('My');

  const dispatch = useDispatch();
  const comlaintList = useSelector(state => state.ComplaintReducer);
  const User = useSelector(state => state.AuthReducer);

  useEffect(() => {
    navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getComplaintList();
    });
  }, []);

  useEffect(() => {
    if (User.isAdmin) {
      setDefaultComplaint('Residents');
    }
  }, [User]);

  const getComplaintList = async () => {
    dispatch({type: COMPLAINT_LIST_REQUEST});
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={'Complaint'} />

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* {['My', 'Residents'].map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setDefaultComplaint(item)}
                        style={[
                          style.complaintOptionCnt,
                          {
                            backgroundColor:
                              defaultComplaint === item
                                ? COLORS.listCardBackTheme
                                : 'white',
                          },
                        ]}>
                        <DescriptionText
                          style={{
                            fontWeight: '500',
                            color: '#4C5564',
                            marginVertical: 8,
                          }}
                          text={item}
                        />
                      </TouchableOpacity>
                    );
                  })} */}
          </View>
          <FlatList
            data={
              defaultComplaint === 'My'
                ? comlaintList?.data?.my
                : comlaintList?.data?.other
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <AppLoaderSrceen
                loader={comlaintList.loader}
                error={'No Complaint Found'}
              />
            )}
            renderItem={({item, index}) => (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      defaultComplaint === 'My'
                        ? 'ComplaintChatScreen'
                        : 'ComplainDetailScreen',
                      {
                        data: item,
                      },
                    )
                  }
                  style={style.card}>
                  <Text style={style.cardTitle}>{item.complainTitle}</Text>
                  <Text style={style.description}>{item.description}</Text>
                  <Text style={style.cardDate}>
                    {moment(`${item.createdDate}`).format('DD/MMM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
        <AppRoundAddActionButton
          onPress={() => navigation.navigate('AddComplain')}
        />
      </View>
    </View>
  );
};

export default CompaintList;

const style = StyleSheet.create({
  card: {
    margin: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    ...shadow,
  },
  cardTitle: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 18,
    color: COLORS.blackFont,
    marginBottom: '2%',
  },
  description: {
    fontFamily: 'Axiforma-Light',
    fontSize: 14,
    color: COLORS.greyFont,
    lineHeight: 23,
  },
  cardDate: {
    fontFamily: 'Axiforma-Light',
    fontSize: 12,
    color: '#ABACB0',
    marginTop: '2%',
  },
});
