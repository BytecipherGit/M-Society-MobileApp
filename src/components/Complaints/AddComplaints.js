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
import AppButton from '../../ReUsableComponents/AppButton';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import SuccessModal from '../../ReUsableComponents/SuccessModal';
import {useSelector} from 'react-redux';
import {API_URL, postFormData} from '../../assets/services';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";

const buttonArray = [
  {id: 1, title: 'Cancel'},
  {id: 2, title: 'Submit'},
];

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
      Alert.alert('Only one image is valid');
    }
  };

  const deleteImage = index => {
    let arr = complaintImage;
    arr.splice(index, 1);
    setData({...data, attachedImage: [...arr]});
  };

  const ComplaintAction = async id => {
    if (id === 1) {
      navigation.goBack();
    } else {
      if (!data.complainTitle || !data.description) {
        return Alert.alert('Please Enter Subject and Note First');
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
            Alert.alert(Result.message);
            navigation.popToTop();
          } else {
            Alert.alert(Result.message);
          }
        } else {
          return Alert.alert('Please Select Status First For This Complaint.');
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
            Alert.alert(Result.message);
            navigation.popToTop();
          } else {
            Alert.alert(Result.message);
          }
        } catch (e) {
          Alert.alert('Something Went Wrong, please Try Again Later.');
        }
      }
    }
  };

  return (
    <Fragment>
      <SuccessModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        navigationScreenName="ComplaintScreen"
        desc="Your Complaint Has Been Successfully Register"
      />
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title="Complaint" />
        <FullCardBackground
          styles={{backgroundColor: COLORS.themeBackground}}
          RenderUI={() => (
            <>
              <View style={styles.cnt}>
                <View style={styles.InnerCardDetail}>
                  <AddComplainDocumentIcon style={{alignSelf: 'center'}} />
                  <TitleText
                    text={
                      route?.name === 'UpdateComplaint'
                        ? 'Reply'
                        : 'Add Compaint'
                    }
                    style={styles.cardTitle}
                  />
                  <ScrollView style={{marginTop: '2%'}}>
                    <TextInput
                      placeholder="Subject"
                      placeholderTextColor={'black'}
                      defaultValue={data.complainTitle}
                      onChangeText={text =>
                        setData({...data, complainTitle: text})
                      }
                      style={styles.SubjectInput}
                    />
                    <View style={styles.devider} />
                    <TextInput
                      placeholder="Note"
                      onChangeText={text =>
                        setData({...data, description: text})
                      }
                      placeholderTextColor={COLORS.inputtext}
                      style={styles.descInput}
                    />
                  </ScrollView>
                </View>
                <FlatList
                  data={data.attachedImage}
                  horizontal
                  style={{alignSelf: 'flex-end'}}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ImageViewScreen', {
                            img: item.uri,
                          })
                        }
                        onLongPress={() => deleteImage(index)}>
                        <Image source={{uri: item?.uri}} style={[styles.img]} />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View style={styles.operationButtonsCnt}>
                <Menu
                  visible={visible}
                  style={styles.cameraOptionsCnt}
                  anchor={
                    <TouchableOpacity
                      onPress={showMenu}
                      style={styles.cameraButton}>
                      <CameraIcon />
                    </TouchableOpacity>
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
              {route?.name === 'UpdateComplaint' && (
                <View
                  style={[
                    styles.statusOptionsCnt,
                    statusOption === route.params.data.status && {
                      backgroundColor: '#D1F0F7',
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() =>
                      setStatusOption(
                        statusOption ? '' : route.params.data.status,
                      )
                    }>
                    <DescriptionText
                      text={route.params.data.status}
                      style={{color: COLORS.themeColor}}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        />
        <View style={styles.BottomButtonView}>
          {buttonArray.map((item, index) => {
            return (
              <AppButton
                key={index}
                buttonTitle={item.title}
                onPress={() => ComplaintAction(item.id)}
                buttonStyle={[
                  styles.BottomButton,
                  item.id === 1 && {backgroundColor: 'transparent'},
                ]}
                TextStyle={item.id === 1 ? {color: COLORS.buttonColor} : {}}
              />
            );
          })}
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
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
