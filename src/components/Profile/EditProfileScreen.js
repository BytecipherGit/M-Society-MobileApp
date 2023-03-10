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

const EditProfileScreen = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [profilePic, setProfilePic] = useState([]);

  const User = useSelector(state => state.AuthReducer.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(User.data._id);
    getUserData(User.data._id);
  }, []);

  const getUserData = async id => {
    setLoader(true);
    const payload = {
      url: API_URL + `user/${id}`,
    };

    try {
      const Result = await GetData(payload);
      if (Result && Result.data && Result.data.success) {
        console.log(Result.data);
        setData(Result.data.data);
      } else {
        Alert.alert(Result.data.message);
      }
    } catch (e) {
      Alert.alert('Something Went Wrong Please Try Again Later');
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
          console.log(response.assets[0].uri);
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
        Alert.alert('Please Update Old Data First');
      }
    } else {
      Alert.alert('Something Went Wrong Please Try Again Later');
    }
    setSaveLoader(false);
  };

  const renderOptions = () => {
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{flexGrow: 0.3}}>
          <DescriptionText
            style={[styles.profileText, {marginBottom: '4%'}]}
            text="Edit Profile"
          />
          <View>
            {editUserJson.map((item, index) => {
              return (
                <View key={index} style={{marginVertical: '2%'}}>
                  <DescriptionText
                    text={item.title}
                    style={{color: '#384252'}}
                  />
                  <View style={styles.optionCards}>
                    <TextInput
                      placeholder="Your Name"
                      keyboardType={item.keyboardType}
                      defaultValue={data[item.param]}
                      placeholderTextColor={'#6B737F'}
                      onChangeText={text =>
                        setData({...data, [item.param]: text})
                      }
                      style={{
                        marginVertical: '2%',
                        fontWeight: '500',
                        fontSize: 14,
                        color: '#6B737F',
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppButton
            buttonStyle={{
              width: '49%',
              backgroundColor: 'white',
              borderWidth: 0.5,
              borderColor: COLORS.buttonColor,
            }}
            TextStyle={{color: COLORS.buttonColor}}
            onPress={() => null}
            buttonTitle="Cancel"
          />
          <AppButton
            buttonStyle={{width: '49%'}}
            buttonTitle="Save"
            btnLoader={saveLoader}
            onPress={updateProfile}
          />
        </View>
      </>
    );
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader title={'Edit Profile'} navigation={navigation} />
        {loader ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={'white'} style={{marginTop: '-25%'}} />
          </View>
        ) : (
          <>
            <View style={{flex: 0.34, alignItems: 'center'}}>
              <Menu
                visible={visible}
                style={{marginTop: '10%', marginLeft: '4%'}}
                anchor={
                  <ImageBackground
                    style={styles.profileImageCnt}
                    imageStyle={{borderRadius: 1000}}
                    source={{
                      uri: data.profileImage,
                    }}>
                    <TouchableOpacity
                      onPress={showMenu}
                      style={{
                        backgroundColor: 'rgba(0,0,0,.2)',
                        flex: 1,
                        borderRadius: 1000,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CameraIconSvg />
                    </TouchableOpacity>
                  </ImageBackground>
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
              <Text style={styles.userName}>Pawan Sharma</Text>
              <DescriptionText
                style={styles.userContact}
                text={'+91 7489289909'}
              />
            </View>
            <FullCardBackground
              RenderUI={() => renderOptions()}
              styles={styles.detailCardCnt}
            />
          </>
        )}
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  profileImageCnt: {
    height: 75,
    width: 75,
    borderRadius: 1000,
  },
  userName: {
    fontWeight: '400',
    fontSize: 26,
    marginTop: 16,
    color: '#FAFEFF',
  },
  userContact: {color: '#E9F5F8', marginTop: 4},
  detailCardCnt: {padding: 16, backgroundColor: COLORS.themeBackground},
  profileText: {fontSize: 16, color: COLORS.titleFont},
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
