import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  // SafeAreaView,
  // Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  ScrollView,
  // TextInput,
  TouchableOpacity,
  // Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useRecoilState} from 'recoil';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
// import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
// import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
// import CameraIconSvg from '../../assets/images/CameraIconSvg.svg';
import AppButton from '../../ReUsableComponents/AppButton';

import {
  API_URL,
  GetData,
  SnackError,
  StoreData,
  SuccessAlert,
  getAsyncValue,
} from '../../assets/services';
// import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import {editUserJson} from '../../assets/Jsons';
import {USER_DATA} from '../../redux/Actions';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import TitleText from "../../ReUsableComponents/Text's/TitleText";

import AppTextInput from '../../ReUsableComponents/AppTextInput';

const EditProfileScreen = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [profilePic, setProfilePic] = useState([]);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

  const User = useSelector(({AuthReducer}) => AuthReducer.userDetail?.data);
  const Auth = useSelector(({AuthReducer}) => AuthReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserData(User?._id);
  }, []);

  const errorAlert = msg => {
    setAlertData({
      visible: true,
      message: msg,
      iconType: 'error',
    });
  };

  const getUserData = async id => {
    setLoader(true);
    const payload = {
      url: API_URL + `user/${id}`,
    };

    try {
      const Result = await GetData(payload);
      if (Result && Result?.data && Result?.data?.success) {
        setData(Result?.data?.data);
        setTimeout(() => {
          setLoader(false);
        }, 500);
      } else {
        errorAlert(Result?.data?.message);
      }
    } catch (e) {
      setLoader(false);
      errorAlert('Something went wrong, please try again later.');
    }
  };

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const pickImage = type => {
    if (type === 'camera') {
      launchCamera({quality: 0.5}, response => {
        // setPhotoURI(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
        if (response.didCancel) {
          // console.log('Permission cancelled', response);
        } else if (response.error) {
          // console.log('error =>', response);
        } else {
          const source = {uri: response.uri};
          if (response && response?.assets?.length > 0) {
            setData({...data, profileImage: response.assets[0].uri});
            let arr = [];
            arr = profilePic;
            arr.push(response.assets[0]);
            setProfilePic([...arr]);
            updateProfile('silent');
          }
        }
      });
    } else {
      launchImageLibrary({quality: 0.5}, response => {
        if (response.didCancel) {
          // console.log('Permission cancelled', response);
        } else if (response.error) {
          // console.log('error =>', response);
        } else {
          setData({...data, profileImage: response.assets[0].uri});
          let arr = [];
          arr = profilePic;
          arr.push(response.assets[0]);
          setProfilePic([...arr]);
        }
      });
    }
  };

  const updatProfileAndroid = async (
    payload = {data: {...data, images: profilePic}},
  ) => {
    try {
      const Token = await getAsyncValue('user');
      const parsedToken = JSON.parse(Token);

      const formData = new FormData();

      if (payload.data.images.length > 0) {
        const my_file = {
          uri: payload.data.images[0].uri,
          type: payload.data.images[0].type,
          name: payload.data.images[0].fileName,
        };
        formData.append('profileImage', my_file);
      }

      formData.append('name', payload.data.name);
      formData.append('address', payload.data.address);
      formData.append('houseNumber', payload.data.houseNumber);
      formData.append('phoneNumber', payload.data.phoneNumber);
      formData.append('id', payload.data._id);

      const response = await axios
        .put(API_URL + 'user/', formData, {
          headers: {
            Authorization: `Bearer ${parsedToken?.accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          return res;
        })
        .catch(e => {
          return e;
        });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async () => {
    setSaveLoader(true);
    try {
      const Result = await updatProfileAndroid();
      if (Result.response) {
        SnackError(Result.response.data.message);
      } else {
        let obj = Auth?.userDetail;
        obj.data = {
          ...User,
          ...Result.data,
          societyId: User?.data?.societyId,
        };

        dispatch({type: USER_DATA, payload: obj});
        StoreData('user', JSON.stringify(obj));
        SuccessAlert('Updated Sucessfully.');
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
      SnackError('Something went wrong. Please try again later.');
    }
    setSaveLoader(false);
  };

  const renderOptions = () => {
    return (
      <>
        <View
          style={{
            width: '95%',
            backgroundColor: 'white',
            alignSelf: 'center',
            padding: 10,
            borderRadius: 10,
            ...shadow,
          }}>
          {editUserJson.map((item, index) => {
            return (
              <View key={index} style={{marginVertical: '2%'}}>
                <TitleText
                  text={item.title}
                  style={{
                    fontFamily: 'Axiforma-Medium',
                    fontSize: 14,
                    color: COLORS.descFont,
                    marginBottom: '2%',
                  }}
                />
                <AppTextInput
                  item={item}
                  value={data[item.param]}
                  setValue={text => setData({...data, [item.param]: text})}
                />
              </View>
            );
          })}
          <AppButton
            buttonTitle="Update Profile"
            buttonStyle={{
              marginTop: '10%',
            }}
            btnLoader={saveLoader}
            onPress={updateProfile}
          />
        </View>
      </>
    );
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader title={'Edit Profile'} navigation={navigation} />
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'red'} style={{marginTop: '-25%'}} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{flexGrow: 0.3}}>
          <View style={styles.pickerOptionCnt}>
            <Menu
              visible={visible}
              style={{marginTop: '25%'}}
              anchor={
                <View style={styles.profileImageCnt}>
                  <ImageBackground
                    style={styles.profileImg}
                    imageStyle={[
                      {borderRadius: 30},
                      !User?.profileImage && {tintColor: COLORS.buttonColor},
                    ]}
                    source={{
                      uri: data?.profileImage
                        ? data?.profileImage
                        : User?.profileImage
                        ? User?.profileImage
                        : undefined,
                    }}
                  />
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={showMenu}>
                    <LinearGradient
                      colors={['#FF7334', '#FFA13C']}
                      start={{x: 0.0, y: 0.0}}
                      end={{x: 1.0, y: 1.0}}
                      locations={[0.0, 1.0]}
                      style={styles.linearBackground}>
                      <MaterialIcons
                        name="edit"
                        style={{
                          fontSize: 15,
                          color: 'white',
                        }}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              }
              onRequestClose={hideMenu}>
              <FlatList
                data={['camera', 'gallery', 'View']}
                renderItem={({item, index}) => (
                  <>
                    <MenuItem
                      onPress={() => {
                        hideMenu(),
                          setTimeout(() => {
                            item === 'View'
                              ? navigation.navigate('ImageViewScreen', {
                                  img: data?.profileImage,
                                })
                              : pickImage(item);
                          }, 500);
                      }}>
                      <Text style={{fontWeight: 'bold', color: 'grey'}}>
                        {' '}
                        {item === 'View'
                          ? 'View Profile Picture'
                          : `Pick From ${item?.toLocaleUpperCase()}`}
                      </Text>
                    </MenuItem>
                    <MenuDivider />
                  </>
                )}
              />
            </Menu>
          </View>
          {renderOptions()}
        </ScrollView>
      )}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  profileImageCnt: {
    height: 100,
    width: 100,
    borderRadius: 30,
    backgroundColor: COLORS.themeColor,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // flexDirection: 'row',
  },
  userName: {
    fontWeight: '400',
    fontSize: 26,
    marginTop: 16,
    color: '#FAFEFF',
  },
  userContact: {color: '#E9F5F8', marginTop: 4},
  detailCardCnt: {padding: 16, backgroundColor: COLORS.themeBackground},
  profileText: {color: '#384252', marginBottom: '2%'},
  optionCards: {
    ...shadow,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%',
    marginHorizontal: '.5%',
    padding: Platform.OS === 'android' ? 0 : 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardIconCnt: {
    height: 35,
    width: 35,
    borderRadius: 1000,
    borderWidth: 1.15,
    borderColor: COLORS.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {fontWeight: '400', color: COLORS.blackFont},
  pickerOptionCnt: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    height: '100%',
    width: '100%',
  },
  optionButton: {
    height: 30,
    width: 30,
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
  },
  linearBackground: {
    height: '100%',
    width: '100%',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
