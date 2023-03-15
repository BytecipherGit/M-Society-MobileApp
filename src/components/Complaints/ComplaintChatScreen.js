import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import BackIcon from '../../assets/images/BackIcon.svg';
import DocumentIcon from '../../assets/images/DocumentIcon.svg';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import CurveNextAerrow from '../../assets/images/CurveNextAerrow.svg';
import {API_URL, GetData} from '../../assets/services';
import moment from 'moment';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';

const ComplaintChatScreen = ({navigation, route}) => {
  const {complainTitle} = route?.params?.data;
  const [data, setData] = useState({});
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

  useEffect(() => {
    const getChat = async () => {
      const payload = {
        url: API_URL + `complaint/${route?.params?.data?._id}`,
      };

      const Result = await GetData(payload);
      setData(Result.data);
    };
    getChat();
  }, []);

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
          : setAlertData({
              visible: true,
              message: 'No Image found.',
              iconType: 'error',
            });
      }
    } else {
      if (index === 0) {
        return item.attachedImage
          ? navigation.navigate('ImageViewScreen', {
              img: item.attachedImage,
            })
          : setAlertData({
              visible: true,
              message: 'No Image Found.',
              iconType: 'error',
            });
      } else {
        return null;
      }
    }
  };

  const replyChat = () => {
    const status =
      data?.chat?.complainChat[data?.chat?.complainChat.length - 1].status ===
      'cancel'
        ? 'reopen'
        : data?.chat?.complainChat[data?.chat?.complainChat.length - 1]
            .status === 'inprogress'
        ? 'cancel'
        : data?.chat?.complainChat[data?.chat?.complainChat.length - 1]
            .status === 'resolved'
        ? 'reopen'
        : null;
    if (status) {
      navigation.navigate('UpdateComplaint', {
        data: {
          id: route?.params?.data?._id,
          subject: complainTitle,
          status: status,
        },
      });
    } else {
      setAlertData({
        visible: true,
        message: 'Complaint Is Resolved, for new now create a New Complaint.',
        iconType: 'error',
      });
      navigation.navigate('UpdateComplaint', {
        data: {
          id: route?.params?.data?._id,
          subject: complainTitle,
          status: 'reopen',
        },
      });
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        {/* Header */}
        <View style={style.headerCnt}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon style={{marginLeft: 3}} />
          </TouchableOpacity>
          <View style={style.headerSubCnt}>
            <View style={style.DocumentIconCnt}>
              <DocumentIcon width={18} height={18} />
            </View>
            <TitleText
              text={complainTitle}
              style={{fontSize: 18, color: '#ffffff', marginLeft: '7%'}}
            />
          </View>
        </View>
        {/* Content */}
        <View style={{flex: 1, backgroundColor: COLORS.themeBackground}}>
          <FlatList
            data={data?.chat?.complainChat}
            renderItem={({item, index}) => (
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
                      item.isAdmin && {
                        backgroundColor: 'white',
                        alignSelf: 'flex-start',
                      },
                    ]}>
                    <TitleText
                      style={style.cardTitle}
                      text={`${item.isAdmin ? 'By' : 'To'} ${item.name}`}
                    />
                    <DescriptionText
                      style={[
                        style.cardDescription,
                        {color: item.isAdmin ? '#6B737F' : '#4C5564'},
                      ]}
                      text={item.description}
                    />
                  </View>
                  <View
                    style={[
                      style.cardActionButtons,
                      {alignSelf: item.isAdmin ? 'flex-start' : 'flex-end'},
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
                <Text
                  ellipsizeMode="clip"
                  numberOfLines={1}
                  style={{color: '#D2D5DC', marginTop: '-3.5%'}}>
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - -
                </Text>
              </>
            )}
          />
        </View>
        <View style={style.replyCnt}>
          <TouchableOpacity style={style.replyButton} onPress={replyChat}>
            <Text style={style.replyTitle}>
              Reply {'  '}
              <CurveNextAerrow />
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default ComplaintChatScreen;

const styleOfLoggedInUser = StyleSheet.create({
  actionButton: {
    backgroundColor: '#E9F5F8',
    marginRight: '2%',
    borderColor: COLORS.themeColor,
  },
  imageButton: {
    backgroundColor: COLORS.themeColor,
    borderColor: COLORS.themeColor,
  },
  actionButtonTitle: {
    color: COLORS.themeColor,
  },
  imageButtonTitle: {
    color: 'white',
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
    backgroundColor: '#E9F5F8',
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
    backgroundColor: COLORS.themeBackground,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  replyButton: {
    backgroundColor: '#DAF8FF',
    margin: '1%',
    borderRadius: 4,
    marginRight: '4%',
  },
  replyTitle: {
    marginHorizontal: 34,
    marginVertical: 13,
    fontSize: 14,
    color: COLORS.themeColor,
    fontFamily: 'Inter-Medium',
  },
});
