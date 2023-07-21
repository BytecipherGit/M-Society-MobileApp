import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, globalStyle} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import {AddGuardJson} from '../../assets/Jsons';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import AppTextInput from '../../ReUsableComponents/AppTextInput';
import AppButton from '../../ReUsableComponents/AppButton';
import AppFilePicker from '../../ReUsableComponents/AppFilePicker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  API_URL,
  CreateGuardAPI,
  PostData,
  PutData,
  SnackError,
  SuccessAlert,
} from '../../assets/services';

const CreateGuard = ({navigation, route}) => {
  const isEditable = route && route.params && route.params.data ? true : false;
  const [data, setData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    profileImage: {},
    dob: '',
    shift: '',
    countryCode: '91',
    joiningDate: '',
  });
  const [datePicker, setDatePicker] = useState({
    visible: false,
    param: '',
  });
  const [loader, setLoader] = useState(false);
  const [cloneProfileImg, setCloneProfileImg] = useState('');

  useEffect(() => {
    if (isEditable) {
      setData({
        id: route.params.data._id,
        name: route.params.data.name,
        address: route.params.data.address,
        phoneNumber: route.params.data.phoneNumber,
        dob: route.params.data.dob,
        shift: route.params.data.shift,
        countryCode: route.params.data.countryCode,
        joiningDate: route.params.data.joiningDate,
      });
      setCloneProfileImg(route.params.data.profileImage);
    }
  }, [isEditable]);

  const formatDate = dateString => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const pickImage = (type, setType) => {
    // Image, Logo
    if (type === 'camera') {
      launchCamera(
        {
          quality: 0.5,
        },
        response => {
          if (response.didCancel) {
            console.log('Permission cancelled', response);
          } else if (response.error) {
            console.log('error =>', response);
          } else {
            setImage(response.assets[0], setType);
          }
        },
      );
    } else {
      launchImageLibrary(
        {
          quality: 0.5,
        },
        response => {
          if (response.didCancel) {
            console.log('Permission cancelled', response);
          } else if (response.error) {
            console.log('error =>', response);
          } else {
            setImage(response.assets[0], setType);
          }
        },
      );
    }
  };

  const setImage = d => {
    setData({
      ...data,
      profileImage: {
        uri: d.uri,
        type: d.type,
        name: d.fileName,
      },
    });
  };

  const createGuard = async () => {
    if (
      !data.address ||
      !data.countryCode ||
      !data.dob ||
      !data.joiningDate ||
      !data.name ||
      !data.phoneNumber ||
      !data.shift ||
      !data.profileImage.uri
    ) {
      return SnackError("Please fill all the data's");
    }
    setLoader(true);
    try {
      const Result = await CreateGuardAPI({
        url: API_URL + 'guard/',
        body: {
          ...data,
          idProof: data.profileImage,
          countryCode: '+' + data.countryCode,
        },
      });

      if (Result.response) {
        SnackError(Result.response.data.message);
      } else {
        SuccessAlert('Guard Created Sucessfully.');
        navigation.goBack();
      }
    } catch (e) {
      SnackError('Something went wrong please try again later.');
    }
    setLoader(false);
  };

  const editGuard = async () => {
    if (
      !data.address ||
      !data.countryCode ||
      !data.dob ||
      !data.joiningDate ||
      !data.name ||
      !data.phoneNumber ||
      !data.shift
    ) {
      return SnackError("Please fill all the data's");
    }

    if (!cloneProfileImg && !data.profileImage.uri) {
      return SnackError('Please select profile image');
    }

    setLoader(true);

    try {
      const Result = await CreateGuardAPI({
        url: API_URL + 'guard/profileUpdate',
        body: {
          ...data,
          idProof: data.profileImage,
          countryCode: '+' + data.countryCode,
        },
        update: true,
      });

      if (Result.response) {
        SnackError(Result.response.data.message);
      } else {
        SuccessAlert('Updated successfully.');
        navigation.goBack();
      }
    } catch (e) {
      SnackError('Something went wrong please try again later.');
    }
    setLoader(false);
  };

  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  return (
    <View style={globalStyle.cnt}>
      <AppHeader
        navigation={navigation}
        title={isEditable ? 'Update Guard' : 'Add Guard'}
      />
      {console.log(datePicker.param)}
      {datePicker.param === 'dob' ? (
        <DatePicker
          modal
          open={datePicker.visible}
          mode="date"
          date={new Date()}
          maximumDate={eighteenYearsAgo}
          onConfirm={date => {
            setDatePicker({...datePicker, visible: false});
            setData({...data, [datePicker.param]: `${date}`});
          }}
          onCancel={() => {
            setDatePicker({...datePicker, visible: false, param: ''});
          }}
        />
      ) : (
        <DatePicker
          modal
          open={datePicker.visible}
          mode="date"
          date={new Date()}
          minimumDate={new Date()}
          onConfirm={date => {
            setDatePicker({...datePicker, visible: false});
            setData({...data, [datePicker.param]: `${date}`});
          }}
          onCancel={() => {
            setDatePicker({...datePicker, visible: false, param: ''});
          }}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          height: Dimensions.get('window').height,
          flexGrow: 0.5,
        }}>
        {AddGuardJson.map((item, index) => {
          return (
            <View style={{width: '90%', alignSelf: 'center'}} key={item.id}>
              <DescriptionText text={item.title} style={style.detailTitle} />
              {item.param === 'phoneNumber' ? (
                <AppTextInput
                  item={{title: item.placeHolder, ...item}}
                  value={data[item.param]}
                  stopEditable={isEditable}
                  countryCode={data.countryCode}
                  onSelectCountry={e => {
                    setData({...data, countryCode: e.callingCode});
                  }}
                  setValue={txt => setData({...data, [item.param]: txt})}
                />
              ) : item.param === 'profileImage' ? (
                cloneProfileImg ? (
                  <ImageBackground
                    source={{uri: cloneProfileImg}}
                    style={{height: 135, width: '100%', borderRadius: 10}}
                    imageStyle={{borderRadius: 10}}
                    resizeMode="contain">
                    <TouchableOpacity
                      style={style.logoImg}
                      onPress={() => setCloneProfileImg('')}>
                      <AntDesign
                        name="closecircle"
                        size={30}
                        color={COLORS.buttonColor}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                ) : data.profileImage && data.profileImage.uri ? (
                  <ImageBackground
                    source={{uri: data.profileImage.uri}}
                    style={{height: 135, width: '100%', borderRadius: 10}}
                    imageStyle={{borderRadius: 10}}>
                    <TouchableOpacity
                      style={style.logoImg}
                      onPress={() => setData({...data, profileImage: {}})}>
                      <AntDesign
                        name="closecircle"
                        size={30}
                        color={COLORS.buttonColor}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                ) : (
                  <AppFilePicker
                    titleText={item.placeHolder}
                    onPress={op => pickImage(op, 'Image')}
                  />
                )
              ) : item.param === 'dob' || item.param === 'joiningDate' ? (
                <TouchableOpacity
                  onPress={() =>
                    setDatePicker({visible: true, param: item.param})
                  }
                  style={[style.datepickerCnt]}>
                  <Text
                    style={{
                      color: data[item.param]
                        ? COLORS.inputTitleBlack
                        : COLORS.inputPlaceholder,
                    }}>
                    {data[item.param]
                      ? formatDate(data[item.param])
                      : item.placeHolder}
                  </Text>
                </TouchableOpacity>
              ) : item.param === 'shift' ? (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  {['day', 'night'].map((st, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setData({...data, [item.param]: st})}
                        key={index}
                        style={{
                          backgroundColor:
                            data[item.param] === st
                              ? COLORS.buttonColor
                              : COLORS.greyFont,
                          ...style.shiftCnt,
                        }}>
                        <Text style={style.shiftButtonTitle}>
                          {st.toLocaleUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : (
                <AppTextInput
                  item={{title: item.placeHolder}}
                  value={data[item.param]}
                  setValue={txt => setData({...data, [item.param]: txt})}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
      <AppButton
        buttonTitle={isEditable ? 'UPDATE' : 'ADD NEW GUARD'}
        buttonStyle={style.addGuardButton}
        btnLoader={loader}
        onPress={isEditable ? editGuard : createGuard}
      />
    </View>
  );
};

export default CreateGuard;

const style = StyleSheet.create({
  detailTitle: {
    marginBottom: '2%',
    color: COLORS.titleFont,
    marginTop: '7%',
  },
  datepickerCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    marginVertical: 2,
    height: 50,
  },
  shiftCnt: {
    padding: 15,
    marginRight: 10,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  shiftButtonTitle: {
    color: COLORS.white,
    fontFamily: 'Axiforma-SemiBold',
  },
  logoImg: {
    alignSelf: 'flex-end',
    marginTop: '-4%',
    marginRight: '-2%',
    backgroundColor: 'white',
    borderRadius: 1000,
  },
  addGuardButton: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: '3%',
  },
});
