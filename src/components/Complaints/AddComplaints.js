import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Appearance,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import AddFileIcon from '../../assets/images/AddFileIcon.svg';
import AppButton from '../../ReUsableComponents/AppButton';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import SuccessModal from '../../ReUsableComponents/SuccessModal';
import {useSelector} from 'react-redux';
import {API_URL, SnackError, postFormData} from '../../assets/services';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import AppTextInput from '../../ReUsableComponents/AppTextInput';
import {Dropdown} from 'react-native-element-dropdown';
import AppFilePicker from '../../ReUsableComponents/AppFilePicker';
import Entypo from 'react-native-vector-icons/Entypo';

const AddComplaints = ({route}) => {
  const navigation = useNavigation();
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
  const [isFocus, setIsFocus] = useState(false);
  const [loader, setLoader] = useState(false);

  const user = useSelector(state => state.AuthReducer.userDetail.data);
  const colorScheme = Appearance.getColorScheme();

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
        launchCamera(
          {
            opacity: 0.5,
          },
          response => {
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
          },
        );
      } else {
        launchImageLibrary(
          {
            opacity: 0.5,
          },
          response => {
            if (response.didCancel) {
              console.log('Permission cancelled', response);
            } else if (response.error) {
              console.log('error =>', response);
            } else {
              let arr = [];
              arr = complaintImage;
              arr.push(response.assets[0]);
              console.log(response.assets[0]);
              setData({...data, attachedImage: [...arr]});
            }
          },
        );
      }
    } else {
      SnackError('You only select one image not more than 1.');
    }
  };

  const deleteImage = index => {
    let arr = complaintImage;
    arr.splice(index, 1);
    setData({...data, attachedImage: [...arr]});
  };

  const ComplaintAction = async () => {
    if (!data.complainTitle || !data.description) {
      return SnackError('Please Enter All Mendatory Fields');
    }

    // if (data.attachedImage.length <= 0) {
    //   return SnackError('Please Select Complaint Image.');
    // }

    if (route?.name === 'UpdateComplaint') {
      if (statusOption) {
        const payloadData = {
          id: route.params.data.id,
          description: data.description,
          status: statusOption,
          attachedImage: data.attachedImage,
        };

        const payload = {
          url: API_URL + 'complaint/',
          body: payloadData,
        };

        console.log(payload);
        setLoader(true);
        const Result = await postFormData(payload, 'PUT');
        if (Result.success) {
          setAlertData({
            visible: true,
            message: Result.message,
          });
          navigation.goBack();
        } else {
          ErrorAlert(Result.message);
        }
      } else {
        return ErrorAlert('Please Select Status First For This Complaint.');
      }
      setLoader(false);
    } else {
      try {
        const payload = {
          url: API_URL + 'complaint/',
          body: data,
        };
        console.log(payload);
        setLoader(true);
        const Result = await postFormData(payload);

        // Result = JSON.parse(Result);
        if (Result.success) {
          setAlertData({
            visible: true,
            message: Result.message,
          });
          navigation.goBack();
        } else {
          ErrorAlert(Result.message);
        }
      } catch (e) {
        ErrorAlert('Something went wrong please try again later.');
      }
      setLoader(false);
    }
  };

  const ErrorAlert = msg => {
    setAlertData({
      visible: true,
      message: msg,
      iconType: 'error',
    });
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
              : 'New Complaint'
          }
        />
        <View style={styles.card}>
          <FlatList
            data={[1]}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <View
                style={{
                  height: 100,
                }}
              />
            )}
            renderItem={() => {
              return (
                <View>
                  {route?.params &&
                  route?.params.data.status &&
                  route?.params.data.status.length > 0 ? null : (
                    <>
                      <Text style={styles.subject}>Subject</Text>
                      <AppTextInput
                        item={{title: 'Subject'}}
                        value={data.complainTitle}
                        setValue={text =>
                          setData({...data, complainTitle: text})
                        }
                      />
                    </>
                  )}
                  <Text style={styles.note}>Note</Text>
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
                  <Text style={styles.attachFileTxt}>Attach File</Text>
                  <AppFilePicker
                    titleText={'Upload Certificate'}
                    onPress={op => pickImage(op)}
                  />
                  <Text style={styles.filePicknote}>
                    Mandotary Only PDF, JPG, PNG, JPEG File Accepted
                  </Text>
                  <FlatList
                    data={data.attachedImage}
                    horizontal
                    style={{alignSelf: 'flex-end', marginTop: '3%'}}
                    renderItem={({item, index}) => {
                      return (
                        <View style={{padding: 20}}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('ImageViewScreen', {
                                img: item.uri,
                              })
                            }>
                            <ImageBackground
                              source={{uri: item?.uri}}
                              style={[styles.img]}
                              imageStyle={{borderRadius: 5}}></ImageBackground>
                            <TouchableOpacity
                              style={styles.closeIconCnt}
                              onPress={() => deleteImage(index)}>
                              <Entypo
                                name="cross"
                                size={23}
                                color="red"
                                style={{
                                  backgroundColor: 'white',
                                  borderRadius: 1000,
                                  marginBottom: '4%',
                                }}
                              />
                            </TouchableOpacity>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                  {route?.params &&
                    route?.params.data.status &&
                    route?.params.data.status.length > 0 && (
                      <>
                        <Text style={styles.attachFileTxt}>Select Status</Text>
                        <Dropdown
                          style={[
                            styles.dropdown,
                            isFocus && {borderColor: 'blue'},
                          ]}
                          containerStyle={
                            colorScheme === 'dark'
                              ? {backgroundColor: COLORS.titleFont}
                              : {}
                          }
                          activeColor={
                            colorScheme === 'dark' ? 'black' : 'white'
                          }
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={route.params.data.status}
                          search
                          maxHeight={300}
                          labelField="Title"
                          valueField="value"
                          placeholder={!isFocus ? 'Select item' : '...'}
                          searchPlaceholder="Search..."
                          value={statusOption}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setStatusOption(item.value);
                            setIsFocus(false);
                          }}
                        />
                      </>
                    )}

                  <View style={{marginTop: '7%'}}>
                    <AppButton
                      buttonTitle={'Submit'}
                      onPress={ComplaintAction}
                      btnLoader={loader}
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

  img: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.themeColor,
    marginHorizontal: 3,
    borderRadius: 5,
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
  card: {
    borderRadius: 10,
    ...shadow,
    margin: 20,
    padding: 15,
    backgroundColor: 'white',
  },
  subject: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 14,
    color: COLORS.descFont,
    marginBottom: '1.5%',
    marginTop: '7%',
  },
  note: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 14,
    color: COLORS.descFont,
    marginBottom: '1.5%',
    marginTop: '7%',
  },
  attachFileTxt: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 14,
    color: COLORS.descFont,
    marginBottom: '1.5%',
    marginTop: '7%',
  },
  filePickerCnt: {
    borderRadius: 10,
    borderWidth: 2,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '1%',
    borderColor: '#DEDEDE',
    borderStyle: 'dashed',
  },
  filePicknote: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 12,
    color: COLORS.descFont,
    marginVertical: '2%',
  },

  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  closeIconCnt: {
    alignSelf: 'flex-end',
    position: 'absolute',
    marginTop: '-7%',
    marginRight: '-10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
  },
});
