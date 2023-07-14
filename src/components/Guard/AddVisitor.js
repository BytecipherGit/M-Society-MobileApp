import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import {AddVisitorFields} from '../../assets/Jsons';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import CameraIcon from '../../assets/images/CameraIcon.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AppButton from '../../ReUsableComponents/AppButton';
import {addVisitorFormData} from '../../assets/services';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import AppTextInput from '../../ReUsableComponents/AppTextInput';

const AddVisitor = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    phoneNumber: '',
    name: '',
    houseNumber: '',
    reasone: '',
    image: {},
    countryCode: '91',
  });
  const [loader, setLoader] = useState(false);
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const checkImage = response => {
    if (response.didCancel) {
      console.log('Permission cancelled', response);
    } else if (response.error) {
      console.log('error =>', response);
    } else {
      const source = {uri: response.uri};
      if (response && response?.assets?.length > 0) {
        const {uri, type, fileName} = response.assets[0];
        setData({...data, image: {uri: uri, type: type, name: fileName}});
      }
    }
  };

  const pickImage = type => {
    if (type === 'camera') {
      launchCamera({}, response => {
        checkImage(response);
      });
    } else {
      launchImageLibrary({}, response => {
        checkImage(response);
      });
    }
  };

  const AddVisitor = async () => {
    if (
      !data.phoneNumber ||
      !data.name ||
      !data.houseNumber ||
      !data.reasone ||
      !data.image.uri
    ) {
      return setAlertData({
        visible: true,
        message: 'Please enter all the fields first',
        iconType: 'error',
      });
    }
    setLoader(true);
    try {
      const Result = await addVisitorFormData(data);
      if (Result.success) {
        setAlertData({
          visible: true,
          message: 'Visitors Added Successfully.',
          // iconType: 'error',
        });
        navigation.replace('GuardHomeScreen');
      } else {
        setAlertData({
          visible: true,
          message: Result.message,
          iconType: 'error',
        });
      }
    } catch (e) {
      setAlertData({
        visible: true,
        message: 'Something Went Wrong please try again later.',
        iconType: 'error',
      });
    }
    setLoader(false);
  };

  let countryOptionCode = data.countryCode;
  console.log(countryOptionCode);

  return (
    <View style={[globalStyle.cnt, {backgroundColor: 'white'}]}>
      <View style={style.cnt}>
        <AppHeader navigation={navigation} title="Add Visitor" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{flexGrow: 0.3}}>
          {AddVisitorFields.map((item, index) => {
            return (
              <View
                key={index}
                style={{paddingHorizontal: 15, marginTop: '4%'}}>
                {item.keyboardType !== 'image-Picker' && (
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Medium',
                      fontSize: 14,
                      color: COLORS.descFont,
                      marginBottom: '1%',
                    }}>
                    {item.title}
                  </Text>
                )}
                {item.keyboardType === 'image-Picker' ? (
                  <View style={style.imageView}>
                    <Menu
                      visible={visible}
                      style={{marginTop: '5%', marginLeft: '9%'}}
                      anchor={
                        <>
                          {data.image.uri ? (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={showMenu}
                              style={{height: 120, width: 120}}>
                              <Image
                                style={{
                                  flex: 1,
                                  borderRadius: 10,
                                }}
                                source={{uri: data.image.uri}}
                              />
                            </TouchableOpacity>
                          ) : (
                            <View>
                              <TouchableOpacity
                                onPress={showMenu}
                                style={style.cameraIcon}>
                                <CameraIcon height={100} width={60} />
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      }
                      onRequestClose={hideMenu}>
                      <FlatList
                        data={['camera', 'gallery']}
                        renderItem={({item, index}) => (
                          <>
                            <MenuItem
                              onPress={() => {
                                hideMenu(),
                                  setTimeout(() => {
                                    pickImage(item);
                                  }, 1000);
                              }}>
                              <Text style={{fontWeight: 'bold', color: 'grey'}}>
                                {' '}
                                Pick From {item?.toLocaleUpperCase()}
                              </Text>
                            </MenuItem>
                            <MenuDivider />
                          </>
                        )}
                      />
                    </Menu>
                  </View>
                ) : (
                  <AppTextInput
                    item={item}
                    countryCode={item.countryCode ? countryOptionCode : ''}
                    value={data[item.param]}
                    setValue={text => setData({...data, [item.param]: text})}
                    onSelectCountry={e => {
                      setData({...data, countryCode: `${e.callingCode[0]}`});
                    }}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>

        <AppButton
          buttonTitle={'Add Visitor'}
          onPress={() => !loader && AddVisitor()}
          btnLoader={loader}
          buttonStyle={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: '3%',
          }}
        />
      </View>
    </View>
  );
};

export default AddVisitor;

const style = StyleSheet.create({
  cnt: {flex: 1},
  imageView: {
    height: 120,
    width: 120,
    backgroundColor: '#C4C4C4',
    borderWidth: 0.5,
    borderColor: COLORS.themeColor,
    borderRadius: 30,
    borderStyle: 'dashed',
    // marginTop: '%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: '8%',
    ...shadow,
  },
  img: {
    height: 157.5,
    width: 157.5,
    borderRadius: 10,
    backgroundColor: COLORS.inputBorder,
  },
  cameraIcon: {
    // height: 36,
    // width: 36,
    // backgroundColor: COLORS.themeColor,
    // borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textInput: {
    ...shadow,
    shadowRadius: 2,
    backgroundColor: 'white',
    width: '100%',
    marginTop: '3%',
    padding: Platform.OS === 'android' ? 0 : 15,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
  buttonsCnt: {
    flexDirection: 'row',
    backgroundColor: COLORS.themeBackground,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '49%',
    borderWidth: 1,
    borderColor: COLORS.buttonColor,
  },
});
