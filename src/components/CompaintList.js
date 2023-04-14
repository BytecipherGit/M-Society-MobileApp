import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../assets/theme';
import AppHeader from '../ReUsableComponents/AppHeader';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import FullCardBackground from '../ReUsableComponents/FullCardBackground';
import AppRoundAddActionButton from '../ReUsableComponents/AppRoundAddActionButton';
import DescriptionText from "../ReUsableComponents/Text's/DescriptionText";
import DocumentIcon from '../assets/images/DocumentIcon.svg';
import TitleText from "../ReUsableComponents/Text's/TitleText";
import {API_URL, GetData} from '../assets/services';
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
                  style={{
                    margin: 20,
                    padding: 15,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    ...shadow,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Medium',
                      fontSize: 18,
                      color: COLORS.blackFont,
                      marginBottom: '2%',
                    }}>
                    {item.complainTitle}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Light',
                      fontSize: 14,
                      color: COLORS.greyFont,
                      lineHeight: 23,
                    }}>
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Light',
                      fontSize: 12,
                      color: '#ABACB0',
                      marginTop: '2%',
                    }}>
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
  cardCnt: {
    ...shadow,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginTop: '5%',
    marginHorizontal: 2,
  },
  titleCnt: {flexDirection: 'row', alignItems: 'center'},
  iconCnt: {
    height: 24,
    width: 24,
    backgroundColor: 'rgba(233, 245, 248, 1)',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descText: {
    lineHeight: 19.6,
    marginTop: '3%',
    textAlign: 'justify',
  },
  complaintOptionCnt: {
    ...shadow,
    shadowOffset: {
      width: 0.6,
      height: 0.5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    shadowColor: COLORS.themeColor,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: '1%',
  },
});
