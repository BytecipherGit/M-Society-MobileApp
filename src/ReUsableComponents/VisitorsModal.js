import {View, Text, Image, StyleSheet, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {COLORS, shadow} from '../assets/theme';
import AppButton from './AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  API_URL,
  GetData,
  PostData,
  SnackError,
  getAsyncValue,
} from '../assets/services';
import {useRecoilState} from 'recoil';
import {CheckVisitors} from '../assets/GlobalStates/RecoilGloabalState';

const VisitorsModal = () => {
  const [visitorsList, setVisitorsList] = useState([]);
  const [visitorsCheck, setVisitorsCheck] = useRecoilState(CheckVisitors);
  const [actionId, setActionId] = useState('');

  useEffect(() => {
    getVisitorsListForPermission();
  }, [visitorsCheck]);

  const getVisitorsListForPermission = async () => {
    const OnBoard = await getAsyncValue('OnBoard');
    if (OnBoard) {
      const User = await getAsyncValue('user');
      if (User) {
        try {
          const Result = await GetData({
            url: API_URL + 'visitor/list',
          });

          if (Result.response) {
            SnackError('There is an some problem to get visitors list');
          } else {
            setVisitorsList(Result.data.data);
          }
        } catch (e) {
          SnackError('Something went wrong please try again later.');
        }
      }
    }
  };

  const DoAction = async (action, id) => {
    try {
      const Result = await PostData({
        url: API_URL + 'visitor/approve',
        body: {
          visitorId: id,
          isApprove: action,
        },
      });
      if (Result.response) {
        SnackError(Result.reasone.data.message);
      } else {
        getVisitorsListForPermission();
      }
    } catch (e) {
      SnackError(
        'Something went wrong, please try again later for get visitors.',
      );
    }
    setActionId('');
  };

  return (
    <ReactNativeModal isVisible={visitorsList.length > 0 ? true : false}>
      <View style={style.mainContainer}>
        <FlatList
          data={visitorsList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                height: '40%',
              }}
            />
          )}
          renderItem={({item, index}) => (
            <View style={style.card}>
              <View style={style.subCard}>
                <Image
                  source={require('../assets/images/Visitor.png')}
                  style={style.visitorIcon}
                />
                <Text style={style.subCardTitle}>Guest Visit Alert !!</Text>
              </View>
              <View style={{marginVertical: 20}}>
                <View style={style.detailCnt}>
                  <Image
                    style={style.visitorProfilePic}
                    source={{uri: item?.image}}
                  />
                  <View style={{marginLeft: '2%'}}>
                    <Text style={style.visitorName}>{item?.name}</Text>
                    <Text style={style.visitorContactNumber}>
                      {item?.countryCode} {item?.phoneNumber}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: '4%',
                  }}>
                  <Text style={style.visitorReason}>
                    Reason -{' '}
                    <Text
                      style={{
                        color: '#535353',
                      }}>
                      {item?.reasone}
                    </Text>
                  </Text>
                </View>
              </View>
              {actionId === item._id ? (
                <Text
                  style={{
                    fontFamily: 'Axiforma-SemiBold',
                    color: 'red',
                    alignSelf: 'center',
                  }}>
                  Sending msg to Guard, Please Wait...
                </Text>
              ) : (
                <View style={style.buttonCnt}>
                  <AppButton
                    buttonTitle={'Decline'}
                    TouchableStyle={{
                      flex: 0.48,
                      ...shadow,
                    }}
                    TextStyle={{
                      color: '#535353',
                    }}
                    onPress={() => {
                      if (!actionId) {
                        setActionId(item._id);
                        DoAction('decline', item._id);
                      }
                    }}
                    colorArray={['#f7f7f7', '#f7f7f7']}
                  />
                  <AppButton
                    buttonTitle={'Approve'}
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
                        DoAction('approved', item._id);
                      }
                    }}
                    TouchableStyle={{
                      flex: 0.48,
                    }}
                  />
                </View>
              )}
            </View>
          )}
        />
      </View>
    </ReactNativeModal>
  );
};

export default VisitorsModal;

const style = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center'},
  card: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },

  subCard: {
    backgroundColor: '#F3F3F3',
    padding: 15,
    borderRadius: 10,
  },
  visitorIcon: {
    height: 60,
    width: 52.36,
    alignSelf: 'center',
  },
  subCardTitle: {
    fontFamily: 'Axiforma-SemiBold',
    fontSize: 20,
    color: '#EB2D20',
    alignSelf: 'center',
    marginTop: '6%',
  },
  detailCnt: {flexDirection: 'row', alignItems: 'center'},
  visitorProfilePic: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.greyFont,
    borderRadius: 10,
  },
  visitorName: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 20,
    color: 'black',
  },
  visitorContactNumber: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 14,
    color: COLORS.descFont,
    marginTop: '4%',
  },
  visitorReason: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 14,
    color: COLORS.descFont,
  },
  buttonCnt: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
