import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import AddComplainDocumentIcon from '../../assets/images/AddComplaintDocumentIcon.svg';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import CameraIcon from '../../assets/images/CameraIcon.svg';
import AddFileIcon from '../../assets/images/AddFileIcon.svg';
import AppButton from '../../ReUsableComponents/AppButton';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import SuccessModal from '../../ReUsableComponents/SuccessModal';
import {useSelector} from 'react-redux';
import {API_URL, postFormData} from '../../assets/services';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import AppTextInput from '../../ReUsableComponents/AppTextInput';

const AddComplaints = ({route}) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [complaintImage, setComplaintImage] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({
    complainTitle:
      route?.name === 'UpdateComplaint' ? route.params.data.subject : '',
    applicantName: '',
    phoneNumber: '',
    description: '',
    attachedImage: [],
    countryCode: '',
  });
  const [statusOption, setStatusOption] = useState('');
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);

  const user = useSelector(state => state.AuthReducer.userDetail.data);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  useEffect(() => {
    if (user._id) {
      setData({
        ...data,
        applicantName: user.name,
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
      });
    }
  }, [user]);

  const pickImage = type => {
    if (data.attachedImage.length < 1) {
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
              let arr = [];
              arr = complaintImage;
              arr.push(response.assets[0]);
              setData({...data, attachedImage: [...arr]});
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
            let arr = [];
            arr = complaintImage;
            arr.push(response.assets[0]);
            setData({...data, attachedImage: [...arr]});
          }
        });
      }
    } else {
      setAlertData({
        visible: true,
        message: 'You only select one image not more than 1.',
        // iconType: 'error',
      });
    }
  };

  const deleteImage = index => {
    let arr = complaintImage;
    arr.splice(index, 1);
    setData({...data, attachedImage: [...arr]});
  };

  const ComplaintAction = async () => {
    if (!data.complainTitle || !data.description) {
      return setAlertData({
        visible: true,
        message: 'Please Enter Subject and Note First',
        iconType: 'error',
      });
    }
    if (route?.name === 'UpdateComplaint') {
      if (statusOption) {
        const payloadData = {
          id: route.params.data.id,
          description: data.description,
          status: route.params.data.status,
          attachedImage: data.attachedImage,
        };

        const payload = {
          url: API_URL + 'complaint/',
          body: payloadData,
        };

        const Result = await postFormData(payload, 'PUT');
        if (Result.success) {
          setAlertData({
            visible: true,
            message: Result.message,
            // iconType: 'error',
          });
          navigation.popToTop();
        } else {
          setAlertData({
            visible: true,
            message: Result.message,
            iconType: 'error',
          });
        }
      } else {
        return setAlertData({
          visible: true,
          message: 'Please Select Status First For This Complaint.',
          iconType: 'error',
        });
      }
    } else {
      try {
        const payload = {
          url: API_URL + 'complaint/',
          body: data,
        };

        const Result = await postFormData(payload);
        console.log(Result.message);
        // Result = JSON.parse(Result);
        if (Result.success) {
          setAlertData({
            visible: true,
            message: Result.message,
            // iconType: 'error',
          });
          navigation.popToTop();
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
          message: 'Something went wrong please try again later.',
          iconType: 'error',
        });
      }
    }
  };

  return (
    <>
      <SuccessModal
        isVisible={isVisible}
        // isVisible={true}
        setIsVisible={setIsVisible}
        navigationScreenName="ComplaintScreen"
        desc="Your Complaint Has Been Successfully Register"
      />
      <View style={globalStyle.cnt}>
        <AppHeader
          navigation={navigation}
          title={
            route?.name === 'UpdateComplaint'
              ? 'Edit Complaint'
              : 'Rase Complaint'
          }
        />
        <View
          style={{
            borderRadius: 10,
            ...shadow,
            margin: 20,
            padding: 15,
            backgroundColor: 'white',
          }}>
          <FlatList
            data={[1]}
            renderItem={() => {
              return (
                <View>
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Medium',
                      fontSize: 14,
                      color: COLORS.descFont,
                      marginBottom: '1.5%',
                      marginTop: '7%',
                    }}>
                    Subject
                  </Text>
                  <AppTextInput
                    item={{title: 'Subject'}}
                    value={data.complainTitle}
                    setValue={text => setData({...data, complainTitle: text})}
                  />
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Medium',
                      fontSize: 14,
                      color: COLORS.descFont,
                      marginBottom: '1.5%',
                      marginTop: '7%',
                    }}>
                    Note
                  </Text>
                  <AppTextInput
                    item={{title: 'Note'}}
                    multiline
                    value={data.description}
                    setValue={text => setData({...data, description: text})}
                    cntStyle={{
                      height: 129,
                      alignItems: 'flex-start',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Medium',
                      fontSize: 14,
                      color: COLORS.descFont,
                      marginBottom: '1.5%',
                      marginTop: '7%',
                    }}>
                    Attach File
                  </Text>
                  <View
                    style={{
                      borderRadius: 10,
                      borderWidth: 2,
                      height: 130,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: '1%',
                      borderColor: '#DEDEDE',
                      borderStyle: 'dashed',
                    }}>
                    <Menu
                      visible={visible}
                      style={styles.cameraOptionsCnt}
                      anchor={
                        <>
                          <TouchableOpacity
                            onPress={showMenu}
                            style={{alignSelf: 'center'}}>
                            <AddFileIcon />
                          </TouchableOpacity>
                          <Text>Upload Certificate </Text>
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
                                  }, 500);
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
                    {route?.name === 'UpdateComplaint' && (
                      <TouchableOpacity style={styles.statusButton}>
                        <View style={styles.statusCnt}>
                          <DescriptionText
                            text={'Status'}
                            style={{color: '#ffffff'}}
                          />
                          <Image
                            source={{
                              uri: 'https://cdn-icons-png.flaticon.com/512/2985/2985150.png',
                            }}
                            style={styles.bottomAerrowStyle}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Axiforma-Regular',
                      fontSize: 12,
                      color: COLORS.descFont,
                      marginVertical: '2%',
                    }}>
                    Mandotary Only PDF, JPG, PNG, JPEG File Accepted
                  </Text>
                  <FlatList
                    data={data.attachedImage}
                    horizontal
                    style={{alignSelf: 'flex-end', marginTop: '3%'}}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('ImageViewScreen', {
                              img: item.uri,
                            })
                          }
                          onLongPress={() => deleteImage(index)}>
                          <Image
                            source={{uri: item?.uri}}
                            style={[styles.img]}
                          />
                        </TouchableOpacity>
                      );
                    }}
                  />
                  <View style={{marginTop: '7%'}}>
                    <AppButton
                      buttonTitle={'Submit'}
                      onPress={ComplaintAction}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.cnt}></View>
      </View>
    </>
  );
};

export default AddComplaints;

const styles = StyleSheet.create({
  cnt: {
    ...shadow,
    shadowRadius: 2,
    backgroundColor: 'white',
    flex: 0.65,
    borderRadius: 16,
    padding: 13,
    marginBottom: '1%',
  },
  InnerCardDetail: {height: '85%'},
  cardTitle: {
    alignSelf: 'center',
    marginTop: '1.5%',
    color: COLORS.themeColor,
  },
  SubjectInput: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  devider: {
    borderWidth: 0.5,
    borderColor: '#D2D5DC',
    marginTop: '2%',
  },
  descInput: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.inputtext,
    marginTop: '2%',
    lineHeight: 19,
  },
  img: {
    height: 44,
    width: 44,
    backgroundColor: COLORS.themeColor,
    marginHorizontal: 3,
    borderRadius: 5,
  },
  cameraButton: {
    height: 36,
    width: 36,
    backgroundColor: COLORS.themeColor,
    margin: '2%',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomButtonView: {
    flexDirection: 'row',
    backgroundColor: COLORS.themeBackground,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  BottomButton: {
    width: '49%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.buttonColor,
  },
  operationButtonsCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '4%',
    marginTop: '4%',
  },
  cameraOptionsCnt: {marginTop: '10%', marginLeft: '4%'},
  statusButton: {
    backgroundColor: COLORS.themeColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  statusCnt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '3.5%',
  },
  bottomAerrowStyle: {
    height: 6.85,
    width: 20.53,
    tintColor: '#ffffff',
    marginTop: '1%',
    marginLeft: '2%',
  },
  statusOptionsCnt: {
    alignSelf: 'flex-end',
    width: '25%',
    backgroundColor: '#E9F5F8',
    marginHorizontal: '4%',
    marginTop: '2%',
    borderRadius: 6,
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderColor: COLORS.themeColor,
  },
});
