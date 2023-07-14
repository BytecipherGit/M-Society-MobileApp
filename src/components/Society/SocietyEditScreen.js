import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, globalStyle} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import {shadow} from '../../assets/theme';
import AppFilePicker from '../../ReUsableComponents/AppFilePicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AppTextInput from '../../ReUsableComponents/AppTextInput';
import ColorPicker from 'react-native-wheel-color-picker';
import AppButton from '../../ReUsableComponents/AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ColorsArray} from '../../assets/Jsons';
import {
  API_URL,
  PutData,
  SnackError,
  StoreData,
  SuccessAlert,
  getAsyncValue,
  putSocietyImages,
} from '../../assets/services';
import {useDispatch} from 'react-redux';
import {USER_DATA} from '../../redux/Actions';

const SocietyEditScreen = ({navigation, route}) => {
  const [societyImages, setSocietyImages] = useState([]);
  const [data, setData] = useState({
    primaryColour: route.params.data.primaryColour,
    buttonHoverBgColour: route.params.data.buttonHoverBgColour,
    buttonHoverfontColour: route.params.data.buttonHoverfontColour,
    fontColour: route.params.data.fontColour,
    id: route?.params?.data?._id,
    description: route?.params?.data?.description,
  });
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const pickImage = (type, setType) => {
    // Image, Logo
    if (type === 'camera') {
      launchCamera({}, response => {
        if (response.didCancel) {
          console.log('Permission cancelled', response);
        } else if (response.error) {
          console.log('error =>', response);
        } else {
          setImage(response.assets[0], setType);
        }
      });
    } else {
      launchImageLibrary({}, response => {
        if (response.didCancel) {
          console.log('Permission cancelled', response);
        } else if (response.error) {
          console.log('error =>', response);
        } else {
          setImage(response.assets[0], setType);
        }
      });
    }
  };

  const setImage = (Imagedata, type) => {
    if (type === 'Image') {
      setSocietyImages([
        ...societyImages,
        {
          uri: Imagedata.uri,
          type: Imagedata.type,
          name: Imagedata.fileName,
        },
      ]);
    } else {
      setData({
        ...data,
        logo: {
          uri: Imagedata.uri,
          type: Imagedata.type,
          name: Imagedata.fileName,
        },
        primaryColour: data.primaryColour,
        buttonHoverBgColour: data.buttonHoverBgColour,
        buttonHoverfontColour: data.buttonHoverfontColour,
        fontColour: data.fontColour,

        description: data?.description,
      });
    }
  };

  const updateSociety = async () => {
    setLoader(true);
    try {
      console.log(route?.params?.data?._id);
      let Result = '';
      if ((data?.logo && data?.logo?.uri) || societyImages.length > 0) {
        Result = await putSocietyImages({
          url: API_URL + 'society/',
          body: {
            ...data,
            ...{images: societyImages, description: data.description},
            ...{body: data && data.logo ? data.logo : ''},
          },
        });
      } else {
        Result = await PutData({
          url: API_URL + 'society/',
          body: data,
        });
      }
      if (Result.response) {
        SnackError(Result.response.data.message);
      } else {
        let User = await getAsyncValue('user');
        User = JSON.parse(User);
        User.societyId = Result.data.data;
        await StoreData('user', JSON.stringify(User));
        dispatch({type: USER_DATA, payload: User});
        SuccessAlert('Society Info Updated Succefully.');
        navigation.goBack();
      }
    } catch (e) {
      SnackError('Something went wrong, please try again later.');
    }

    setLoader(false);
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={'Edit Society'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        {/* Description */}
        <View style={styles.cardCnt}>
          <Text style={styles.attachFileTxt}>Description</Text>
          <AppTextInput
            item={{title: 'Description'}}
            value={data.description}
            setValue={text => setData({...data, description: text})}
          />
        </View>
        {/* Pick Images */}
        <View style={styles.cardCnt}>
          <Text style={styles.attachFileTxt}>Pick Society View Images</Text>
          <AppFilePicker
            titleText={'Pick Society Images'}
            onPress={op => pickImage(op, 'Image')}
          />
          {societyImages.length > 0 && (
            <FlatList
              horizontal
              data={societyImages}
              renderItem={({item, index}) => (
                <ImageBackground
                  source={{uri: item.uri}}
                  imageStyle={{borderRadius: 10}}
                  style={styles.societyImagesCnt}>
                  <TouchableOpacity
                    style={styles.imagesImg}
                    onPress={() => {
                      let arr = [];
                      arr = societyImages;
                      arr.splice(index, 1);
                      setSocietyImages([...arr]);
                    }}>
                    <AntDesign
                      name="closecircle"
                      size={20}
                      color={COLORS.buttonColor}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              )}
            />
          )}
        </View>
        {/* Logo */}
        <View style={styles.cardCnt}>
          <Text style={styles.attachFileTxt}>Society Logo</Text>

          {data && data.logo && data.logo.uri ? (
            <>
              <ImageBackground
                source={{uri: data.logo.uri}}
                style={{height: 135, width: '100%', borderRadius: 10}}
                imageStyle={{borderRadius: 10}}>
                <TouchableOpacity
                  style={styles.logoImg}
                  onPress={() => setData({...data, logo: {}})}>
                  <AntDesign
                    name="closecircle"
                    size={30}
                    color={COLORS.buttonColor}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </>
          ) : (
            <AppFilePicker
              titleText={'Pick Society Image'}
              onPress={op => pickImage(op, 'Logo')}
            />
          )}
        </View>

        {/* Primary Color */}
        {ColorsArray.map((item, index) => (
          <View style={styles.cardCnt} key={item.id}>
            <Text style={styles.attachFileTxt}>{item.title}</Text>
            <ColorPicker
              color={data[item.param]}
              swatchesOnly={false}
              onColorChange={() => null}
              onColorChangeComplete={color =>
                setData({...data, [item.param]: color})
              }
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              row={true}
              swatchesLast={true}
              swatches={true}
              discrete={true}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={[styles.colorDot, {backgroundColor: data[item.param]}]}
              />
              <Text style={styles.colorTxt}>{data[item.param]}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <AppButton
        buttonStyle={{
          width: '90%',
          alignSelf: 'center',
          marginBottom: '2%',
        }}
        btnLoader={loader}
        buttonTitle={'Update Society Theme'}
        onPress={updateSociety}
      />
    </View>
  );
};

export default SocietyEditScreen;

const styles = StyleSheet.create({
  attachFileTxt: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 14,
    color: COLORS.descFont,
    marginBottom: '3%',
    marginTop: '0%',
  },
  cardCnt: {
    padding: 15,
    backgroundColor: COLORS.white,
    margin: 15,
    borderRadius: 10,
    ...shadow,
  },
  societyImagesCnt: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.themeColor,
    borderRadius: 10,
    margin: 5,
    marginTop: 15,
  },
  imagesImg: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: -7,
    backgroundColor: 'white',
    borderRadius: 1000,
  },
  logoImg: {
    alignSelf: 'flex-end',
    marginTop: '-4%',
    marginRight: '-2%',
    backgroundColor: 'white',
    borderRadius: 1000,
  },
  colorDot: {
    height: 20,
    width: 20,

    borderRadius: 1000,
    borderWidth: 0.5,
  },
  colorTxt: {
    fontFamily: 'Axiforma-SemiBold',
    color: COLORS.blackFont,
    marginLeft: '2%',
    marginTop: '1%',
  },
});
