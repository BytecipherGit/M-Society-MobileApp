import {
  View,
  Text,
  SafeAreaView,
  Switch,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import AppHeader from '../../ReUsableComponents/AppHeader';
import AppRoundAddActionButton from '../../ReUsableComponents/AppRoundAddActionButton';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import ToggleSwitch from 'toggle-switch-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  EDIT_RESIDENT_USER_REQUEST,
  GET_RESIDENTSLIST_REQUEST,
} from '../../redux/Actions';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import {API_URL, DeleteData, PutData} from '../../assets/services';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import LinearGradient from 'react-native-linear-gradient';

const ResidentList = ({navigation}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

  const state = useSelector(state => state.ResidentReducer);
  const isAdmin = useSelector(state => state.AuthReducer.isAdmin);
  const user = useSelector(state => state.AuthReducer.userDetail.data);

  useEffect(() => {
    getResidentsList();
  }, []);

  const getResidentsList = () => {
    dispatch({type: GET_RESIDENTSLIST_REQUEST});
  };

  useEffect(() => {
    setData(state.data);
  }, [state]);

  const changeUserStatus = async (item, index) => {
    try {
      const Result = await PutData({
        url: API_URL + 'user/',
        body: {
          id: item._id,
          status: item.status === 'active' ? 'inactive' : 'active',
        },
      });

      if (Result.data.success) {
        let arr = [];
        arr = data;
        arr[index].status = item.status === 'active' ? 'inactive' : 'active';
        setData([...arr]);
      } else {
        ErrorAlert(Result.data.message);
      }
    } catch (e) {
      ErrorAlert('Something Went Wrong, Please Try Again Later.');
    }
  };

  const ErrorAlert = msg => {
    setAlertData({
      visible: true,
      message: msg,
      iconType: 'error',
    });
  };

  const deleteUser = async (item, index) => {
    try {
      const Result = await DeleteData({
        url: API_URL + `user/`,
        body: {id: item._id},
      });

      if (Result.success) {
        let arr = [];
        arr = data;
        arr.splice(index, 1);
        setData([...arr]);
      } else {
        ErrorAlert(Result.message);
      }
    } catch (e) {
      ErrorAlert('Something Went Wrong, Please Try Again Later.');
    }
  };

  const renderUI = (item, index) => {
    const {name, userType, houseNumber, countryCode, phoneNumber, status} =
      item;
    return (
      <TouchableOpacity style={style.card} activeOpacity={1}>
        <View style={style.userNameCnt}>
          <TitleText text={`${name} (${userType})`} />
          <ToggleSwitch
            isOn={status === 'active' ? true : false}
            onColor={'#FF7334'}
            offColor={COLORS.inputBorder}
            size="medium"
            onToggle={isOn => isAdmin && changeUserStatus(item, index)}
          />
        </View>
        <DescriptionText
          text={`House: ${houseNumber}`}
          style={{color: COLORS.blackFont, marginBottom: '1%'}}
        />
        {isAdmin && (
          <View style={style.actionButtonsCnt}>
            {['EDIT', 'DELETE'].map((title, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={style.button}
                  activeOpacity={0.7}
                  onPress={() => (i === 0 ? null : deleteUser(item, index))}>
                  <LinearGradient
                    colors={['#FF7334', '#FFA13C']}
                    start={{x: 0.0, y: 0.0}}
                    end={{x: 1.0, y: 1.0}}
                    locations={[0.0, 1.0]}
                    style={{
                      flex: 0.48,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.buttonColor,
                      padding: 10,
                      borderRadius: 4,
                    }}>
                    <DescriptionText
                      text={title}
                      style={{color: 'white', fontWeight: '700'}}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title="Residents" />
      <View style={style.mainCnt}>
        <View style={{flex: 1}}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <AppLoaderSrceen loader={state.loader} error={state.error} />
            )}
            renderItem={({item, index}) => {
              if (isAdmin && user._id !== item._id) {
                return renderUI(item, index);
              } else if (!isAdmin && item?.status === 'active') {
                return renderUI(item, index);
              }
            }}
          />
        </View>
        {isAdmin && (
          <AppRoundAddActionButton
            onPress={() => navigation.navigate('AddNewResident')}
          />
        )}
      </View>
    </View>
  );
};

export default ResidentList;

const style = StyleSheet.create({
  mainCnt: {flex: 1, padding: 16, justifyContent: 'flex-end'},
  card: {
    ...shadow,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    marginVertical: '4%',
    shadowRadius: 2,
    marginHorizontal: 2,
  },
  userNameCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4%',
  },
  detailCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtonsCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '4%',
  },
  button: {
    flex: 0.48,
  },
});
