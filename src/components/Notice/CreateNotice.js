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
import {CreateSociety, SnackError, SuccessAlert} from '../../assets/services';
import {useSelector} from 'react-redux';

const CreateNotice = ({navigation}) => {
  const [data, setData] = useState({});
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

    const Result = await CreateSociety(data);

    if (Result.success) {
      SuccessAlert('Your notice created successfully.');
      navigation.goBack();
    } else {
      SnackError(Result.message);
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
      <AppHeader navigation={navigation} title={'Create New Notice'} />
      <FlatList
        data={[
          {id: 1, title: 'Title', params: 'title'},
          {id: 2, title: 'Description', params: 'description'},
          {id: 3, title: 'Status', params: 'status'},
          {id: 4, title: 'Attach File', params: 'attachedFile'},
        ]}
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
        buttonTitle="Create Notice"
        onPress={createNotice}
      />
    </View>
  );
};

export default CreateNotice;
