import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import CameraIconSvg from '../../assets/images/CameraIconSvg.svg';
import AppButton from '../../ReUsableComponents/AppButton';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  API_URL,
  GetData,
  PostData,
  PutData,
  StoreData,
  updatProfile,
} from '../../assets/services';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import {editUserJson} from '../../assets/Jsons';
import {USER_DATA} from '../../redux/Actions';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppTextInput from '../../ReUsableComponents/AppTextInput';

const EditProfileScreen = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [profilePic, setProfilePic] = useState([]);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

  const User = useSelector(state => state.AuthReducer.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData(User.data._id);
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
      if (Result && Result.data && Result.data.success) {
        setData(Result.data.data);
      } else {
        errorAlert(Result.data.message);
      }
    } catch (e) {
      errorAlert('Something went wrong, please try again later.');
    }

    setLoader(false);
  };

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const pickImage = type => {
    if (type === 'camera') {
      launchCamera({}, response => {
        // setPhotoURI(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
        if (response.didCancel) {
          console.log('Permission cancelled', response);
        } else if (response.error) {
          console.log('error =>', response);
        } else {
          const source = {uri: response.uri};
          if (response && response?.assets?.length > 0) {
            setData({...data, profileImage: response.assets[0].uri});
            let arr = [];
            arr = profilePic;
            arr.push(response.assets[0]);
            setProfilePic([...arr]);
          }
        }
      });
    } else {
      launchImageLibrary({}, response => {
        if (response.didCancel) {
          console.log('Permission cancelled', response);
        } else if (response.error) {
          console.log('error =>', response);
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

  const updateProfile = async () => {
    setSaveLoader(true);
    const Result = await updatProfile({data: {...data, images: profilePic}});

    if (Result) {
      if (Result.data && Result.data.success) {
        let obj = User;
        obj.data = Result.data.data;
        dispatch({type: USER_DATA, payload: Result.data});
        StoreData('user', JSON.stringify(obj));
        navigation.goBack();
      } else {
        errorAlert('Please Update Old Data First');
      }
    } else {
      errorAlert('Something went wrong please try again later');
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
          <ActivityIndicator color={'white'} style={{marginTop: '-25%'}} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{flexGrow: 0.3}}>
          <View
            style={{
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Menu
              visible={visible}
              style={{marginTop: '25%'}}
              anchor={
                <View style={styles.profileImageCnt}>
                  <ImageBackground
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    imageStyle={[
                      {borderRadius: 30},
                      !data.profileImage && {tintColor: COLORS.buttonColor},
                    ]}
                    source={{
                      uri: data.profileImage,
                    }}></ImageBackground>
                  <TouchableOpacity
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 1000,
                      borderWidth: 3,
                      borderColor: 'white',
                      position: 'absolute',
                    }}
                    onPress={showMenu}>
                    <LinearGradient
                      colors={['#FF7334', '#FFA13C']}
                      start={{x: 0.0, y: 0.0}}
                      end={{x: 1.0, y: 1.0}}
                      locations={[0.0, 1.0]}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 1000,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
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
                                  img: data.profileImage,
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
});
