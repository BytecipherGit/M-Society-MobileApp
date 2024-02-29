import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
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
  CreateDocumentAPI,
  CreateSociety,
  SnackError,
  SuccessAlert,
} from '../../assets/services';
import {useSelector} from 'react-redux';

const CreateDocument = ({navigation}) => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const state = useSelector(state => state.AuthReducer.userDetail);

  const createDocumentfun = async () => {
    if (
      !data.documentName ||
      !data.description ||
      !data.status ||
      !data.documentImageFile ||
      !data.documentImageFile.uri
    ) {
      return SnackError('Please Fill All the fileds first.');
    }
    setLoader(true);

    const Result = await CreateDocumentAPI(data);

    if (Result.success) {
      SuccessAlert('Your document created successfully.');
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
        documentImageFile: {
          uri: result[0].uri,
          type: result[0].type,
          name: result[0].name,
        },
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        // console.log('User cancelled document picker.');
      } else {
        // Error!
        // console.log('Error picking document:', err);
      }
    }
  }

  let fileTyep =
    data &&
    data.documentImageFile &&
    data.documentImageFile.uri &&
    data?.documentImageFile?.type?.slice(
      data?.documentImageFile?.type.length - 3,
      data?.documentImageFile?.type.length - 0,
    );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader navigation={navigation} title={'Create New Document'} />
      <FlatList
        data={[
          {id: 1, title: 'Document Name', params: 'documentName'},
          {id: 2, title: 'Description', params: 'description'},
          {id: 3, title: 'Status', params: 'status'},
          {id: 4, title: 'Attach File', params: 'documentImageFile'},
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
                data.documentImageFile && data.documentImageFile.uri ? (
                  <View>
                    {fileTyep && fileTyep === 'pdf' ? (
                      <View
                        style={{
                          height: 200,
                          width: '100%',
                          borderRadius: 10,
                          borderWidth: 0.5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLORS.titleFont,
                            fontFamily: 'Axiforma-Bold',
                            fontSize: 15,
                          }}>
                          {data.documentImageFile.name}
                        </Text>
                        <Text
                          style={{
                            color: 'red',
                          }}>
                          No Preview Available
                        </Text>
                      </View>
                    ) : (
                      <Image
                        style={{height: 200, width: '100%', borderRadius: 10}}
                        source={{uri: data.documentImageFile.uri}}
                        resizeMode="contain"
                      />
                    )}
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
                      onPress={() => setData({...data, documentImageFile: {}})}>
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
        buttonTitle="Create Document"
        onPress={createDocumentfun}
      />
    </View>
  );
};

export default CreateDocument;
