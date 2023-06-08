import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import AppTextInput from '../../ReUsableComponents/AppTextInput';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import DocumentPicker from 'react-native-document-picker';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import AddFileIcon from '../../assets/images/AddFileIcon.svg';
import Entypo from 'react-native-vector-icons/Entypo';
import AppButton from '../../ReUsableComponents/AppButton';
import {
  API_URL,
  CreateSociety,
  PutData,
  SnackError,
  SuccessAlert,
} from '../../assets/services';
import {useSelector} from 'react-redux';
import {createNoticeJson} from '../../assets/Jsons';

const EditNotice = ({navigation, route}) => {
  const {title, description, status, attachedFile, _id} =
    route.params.noticeDetail;
  const [data, setData] = useState({
    title: title,
    description: description,
    status: status,
    attachedFile: {
      uri: attachedFile,
      type: '',
      name: '',
    },
    id: _id,
  });
  const [loader, setLoader] = useState(false);
  const state = useSelector(state => state.AuthReducer.userDetail);

  const createNotice = async () => {
    if (
      !data.title ||
      !data.description ||
      !data.status ||
      !data.attachedFile ||
      !data.attachedFile.uri
    ) {
      return SnackError('Please Fill All the fileds first.');
    }
    setLoader(true);

    const payload = data.attachedFile.type
      ? data
      : {
          title: data.title,
          description: data.description,
          status: data.status,
          id: data.id,
        };

    try {
      const Result = data.attachedFile.type
        ? await CreateSociety(payload, 'edit', data.attachedFile.type)
        : await PutData({url: API_URL + 'notice/update', body: payload});

      if (data.attachedFile.type) {
        if (Result.success) {
          SuccessAlert('Your notice updated successfully.');
          navigation.goBack();
        } else {
          SnackError(Result.message);
        }
      } else {
        if (Result.data.success) {
          SuccessAlert('Your notice updated successfully.');
          navigation.goBack();
        } else {
          SnackError(Result.data.message);
        }
      }
    } catch (e) {
      SnackError('something went wrong please try again later.');
    }
    setLoader(false);
  };

  async function pickDocument() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setData({
        ...data,
        attachedFile: {
          uri: result[0].uri,
          type: result[0].type,
          name: result[0].name,
        },
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled document picker.');
      } else {
        // Error!
        console.log('Error picking document:', err);
      }
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader navigation={navigation} title={'Edit Notice'} />
      <FlatList
        data={createNoticeJson}
        showsVerticalScrollIndicator={false}
        style={{marginTop: '0%'}}
        renderItem={({item, index}) => {
          return (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <DescriptionText
                text={item.title}
                style={{
                  marginBottom: '2%',
                  color: COLORS.titleFont,
                  marginTop: '7%',
                }}
              />
              {item.id === 3 ? (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  {['draft', 'published'].map((st, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setData({...data, status: st})}
                        key={index}
                        style={{
                          backgroundColor:
                            data.status === st
                              ? state && state.data && state.data.societyId
                                ? state.data.societyId.buttonHoverBgColour
                                : COLORS.buttonColor
                              : COLORS.greyFont,
                          padding: 15,
                          marginRight: 10,
                          width: 120,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 7,
                        }}>
                        <Text
                          style={{
                            color:
                              state && state.data && state.data.societyId
                                ? state.data.societyId.fontColour
                                : COLORS.white,
                            fontFamily: 'Axiforma-SemiBold',
                          }}>
                          {st.toLocaleUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : item.id === 4 ? (
                data.attachedFile && data.attachedFile.uri ? (
                  <View>
                    <Image
                      style={{height: 200, width: '100%', borderRadius: 10}}
                      source={{uri: data.attachedFile.uri}}
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        height: 30,
                        width: 30,
                        backgroundColor: COLORS.themeColor,
                        borderRadius: 1000,
                        alignSelf: 'flex-end',
                        marginTop: -10,
                        marginRight: -5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => setData({...data, attachedFile: {}})}>
                      <Entypo name="cross" size={23} color="red" />
                    </TouchableOpacity>
                  </View>
                ) : (
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
                    <TouchableOpacity
                      onPress={() => pickDocument()}
                      style={{alignSelf: 'center'}}>
                      <AddFileIcon />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: COLORS.titleFont,
                        fontFamily: 'Axiforma-SemiBold',
                      }}>
                      Upload File
                    </Text>
                  </View>
                )
              ) : (
                <View style={{...shadow}}>
                  <AppTextInput
                    item={{title: item.title}}
                    value={data[item.params]}
                    setValue={txt => setData({...data, [item.params]: txt})}
                  />
                </View>
              )}
            </View>
          );
        }}
        ListFooterComponent={() => <View style={{height: 400}} />}
      />
      <AppButton
        buttonStyle={{
          width: '90%',
          alignSelf: 'center',
          marginBottom: '2%',
        }}
        btnLoader={loader}
        buttonTitle="Update Notice"
        onPress={createNotice}
      />
    </View>
  );
};

export default EditNotice;
