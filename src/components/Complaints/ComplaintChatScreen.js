import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import CurveNextAerrow from '../../assets/images/CurveNextAerrow.svg';
import {API_URL, GetData} from '../../assets/services';
import moment from 'moment';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ComplaintChatScreen = ({navigation, route}) => {
  const {complainTitle} = route?.params?.data;
  const [data, setData] = useState({});
  const isFocus = useIsFocused();
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);
  const UserDetail = useSelector(state => state.AuthReducer);
  const [replyArray, setReplyArray] = useState([]);

  useEffect(() => {
    const getChat = async () => {
      const payload = {
        url: API_URL + `complaint/${route?.params?.data?._id}`,
      };

      const Result = await GetData(payload);
      setData(Result.data);
    };
    isFocus && getChat();
  }, [isFocus]);

  const renderButtonTitle = (item, index) => {
    const FirstCapitalLatter =
      `${item?.status}`.charAt(0).toUpperCase() + item?.status.slice(1);
    if (!item.isAdmin) {
      if (index === 0) {
        return FirstCapitalLatter;
      } else {
        return 'Image';
      }
    } else {
      if (index === 0) {
        return 'Image';
      } else {
        return FirstCapitalLatter;
      }
    }
  };

  const manageActionOnChat = (item, index) => {
    if (!item.isAdmin) {
      if (index === 0) {
        return null;
      } else {
        return item.attachedImage
          ? navigation.navigate('ImageViewScreen', {
              img: item.attachedImage,
            })
          : AppAlert('No Image found.');
      }
    } else {
      if (index === 0) {
        return item.attachedImage
          ? navigation.navigate('ImageViewScreen', {
              img: item.attachedImage,
            })
          : AppAlert('No Image found.');
      } else {
        return null;
      }
    }
  };

  const replyChat = () => {
    navigation.navigate('UpdateComplaint', {
      data: {
        id: route?.params?.data?._id,
        subject: complainTitle,
        status: replyArray,
      },
    });
  };

  const AppAlert = msg => {
    setAlertData({
      visible: true,
      message: msg,
      iconType: 'error',
    });
  };

  useEffect(() => {
    if (data.length > 0) {
      toReply(data[data.length - 1]);
    }
  }, [data]);

  const toReply = item => {
    //new,reopen,inprogress,resolved,cancel
    let statusArray = [];

    let obj = {
      inprogress: {Title: 'In Progress', value: 'inprogress'},
      resolved: {Title: 'Resolved', value: 'resolved'},
      cancel: {Title: 'Cancel', value: 'cancel'},
      reopen: {Title: 'Re-open', value: 'reopen'},
    };

    if (UserDetail.isAdmin) {
      item.status === 'new' &&
        statusArray.push(obj.inprogress, obj.resolved, obj.cancel);

      item.status === 'inprogress' &&
        statusArray.push(obj.resolved, obj.cancel);
    } else {
      item.status === 'new' && statusArray.push({Title: 'New', value: 'new'});
      item.status === 'resolved' && statusArray.push(obj.reopen);
    }
    setReplyArray(...statusArray);
  };

  return (
    <View style={globalStyle.cnt}>
      {/* Header */}
      <AppHeader title={complainTitle} navigation={navigation} />
      <View style={{flex: 1, backgroundColor: '#F9F9F9'}}>
        <FlatList
          data={data?.chat?.complainChat}
          renderItem={({item, index}) => {
            return (
              <>
                <View
                  style={{
                    marginVertical: '5%',
                  }}>
                  <TitleText
                    style={style.cardDate}
                    text={moment(`${item.date}`).format('DD MMM, HH:MM a')}
                  />
                  <View
                    style={[
                      style.card,
                      UserDetail.userDetail.data._id !== item.userId && {
                        backgroundColor: 'white',
                        alignSelf: 'flex-start',
                      },
                    ]}>
                    <TitleText
                      style={style.cardTitle}
                      text={`${
                        UserDetail.userDetail.data._id !== item.userId
                          ? 'By'
                          : 'To'
                      } ${item.name}`}
                    />
                    <DescriptionText
                      style={[
                        style.cardDescription,
                        {
                          color:
                            UserDetail.userDetail.data._id !== item.userId
                              ? '#6B737F'
                              : '#4C5564',
                        },
                      ]}
                      text={item.description}
                    />
                  </View>
                  <View
                    style={[
                      style.cardActionButtons,
                      {
                        alignSelf:
                          UserDetail.userDetail.data._id !== item.userId
                            ? 'flex-start'
                            : 'flex-end',
                      },
                    ]}>
                    {[1, 2].map((i, index) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => manageActionOnChat(item, index)}
                          key={index}
                          style={[
                            style.button,
                            !item.isAdmin &&
                              (index === 0
                                ? styleOfLoggedInUser.actionButton
                                : styleOfLoggedInUser.imageButton),
                          ]}>
                          <DescriptionText
                            text={renderButtonTitle(item, index)}
                            style={[
                              style.buttonTitle,
                              !item.isAdmin &&
                                (index === 0
                                  ? styleOfLoggedInUser.actionButtonTitle
                                  : styleOfLoggedInUser.imageButtonTitle),
                            ]}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </>
            );
          }}
        />
      </View>
      {replyArray && replyArray.length > 0 && (
        <View style={style.replyCnt}>
          <TouchableOpacity style={style.replyButton} onPress={replyChat}>
            <Text style={style.replyTitle}>
              Reply {'  '}
              <CurveNextAerrow />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ComplaintChatScreen;

const styleOfLoggedInUser = StyleSheet.create({
  actionButton: {
    backgroundColor: COLORS.white,
    marginRight: '2%',
    borderColor: COLORS.themeColor,
  },
  imageButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.themeColor,
  },
  actionButtonTitle: {
    color: COLORS.titleFont,
  },
  imageButtonTitle: {
    color: COLORS.titleFont,
  },
});

const style = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D2D5DC',
    marginRight: '2%',
  },
  buttonTitle: {
    color: '#6B737F',
    marginHorizontal: '3%',
  },
  headerCnt: {
    height: 64,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  headerSubCnt: {
    flexDirection: 'row',
    marginHorizontal: '4%',
    alignItems: 'center',
  },

  DocumentIconCnt: {
    backgroundColor: 'white',
    width: 32,
    height: 32,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 12,
    color: '#9CA2AD',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  card: {
    ...shadow,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    width: '75%',
    backgroundColor: COLORS.white,
    padding: 12,
    marginHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  cardTitle: {
    fontSize: 14,
    color: '#202937',
    marginBottom: '3%',
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: 'justify',
  },
  cardActionButtons: {
    marginHorizontal: '4%',
    flexDirection: 'row',
    marginVertical: '2.5%',
  },
  replyCnt: {
    backgroundColor: '#F9F9F9',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: '6%',
  },
  replyButton: {
    backgroundColor: COLORS.themeColor,
    margin: '1%',
    borderRadius: 4,
    marginRight: '4%',
  },
  replyTitle: {
    marginHorizontal: 34,
    marginVertical: 13,
    fontSize: 14,
    color: COLORS.titleFont,
    fontFamily: 'Inter-Medium',
  },
});
