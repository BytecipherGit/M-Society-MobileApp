import {View, FlatList} from 'react-native';
import React, {useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import AppTextInput from '../../ReUsableComponents/AppTextInput';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import DocumentPicker from 'react-native-document-picker';
import AppButton from '../../ReUsableComponents/AppButton';
import {
  API_URL,
  PostData,
  SnackError,
  SuccessAlert,
} from '../../assets/services';

const CreateContact = ({navigation}) => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [countryCode, setCountryCode] = useState('91');

  const createDocumentfun = async () => {
    if (!data.name || !data.address || !data.phoneNumber || !data.profession) {
      return SnackError('Please Fill All the fileds first.');
    }
    try {
      setLoader(true);
      const Result = await PostData({
        url: API_URL + 'directory',
        body: {
          ...data,
          ...{
            latitude: 0,
            longitude: 0,
          },
          countryCode: '+' + countryCode,
        },
      });

      if (Result.data.success) {
        SuccessAlert('Contact Created Successfully.');
        navigation.goBack();
      } else {
        SnackError(Result.data.message);
      }
      setLoader(false);
    } catch (e) {
      setLoader(false);
      SnackError('Something Went wrong, please try again later.');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader navigation={navigation} title={'Create New Contact'} />
      <FlatList
        data={[
          {id: 1, title: 'Name', params: 'name'},
          {id: 2, title: 'address', params: 'address'},
          {id: 3, title: 'Phone Number', params: 'phoneNumber'},
          {id: 4, title: 'Profession', params: 'profession'},
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
              <View style={{...shadow}}>
                {item.id === 3 ? (
                  <AppTextInput
                    item={{title: item.title, keyboardType: 'number-pad'}}
                    value={data[item.params]}
                    countryCode={countryCode}
                    setValue={txt => setData({...data, [item.params]: txt})}
                    onSelectCountry={e => {
                      setData({...data, countryCode: e.callingCode});
                    }}
                  />
                ) : (
                  <AppTextInput
                    item={{title: item.title}}
                    value={data[item.params]}
                    setValue={txt => setData({...data, [item.params]: txt})}
                  />
                )}
                {/* <AppTextInput
                  item={item}
                  value={data[item.param]}
                  style={styles.inputStyle}
                  countryCode={item.countryCode}
                  showEyeIcon={item.showEyeIcon}
                  onSelectCountry={e => {
                    let arr = inputFieldsClone;
                    arr[index].countryCode = `${e.callingCode}`;
                    setInputFieldsClone([...arr]);
                  }}
                  renderIcon={item.renderIcon}
                  onPressEye={() => {
                    let arr = inputFieldsClone;
                    arr[index].secureTextEntry = !arr[index].secureTextEntry;
                    setInputFieldsClone([...arr]);
                  }}
                  setValue={text => {
                    setData({...data, [item.param]: text});
                    (error.phoneNumber || error.password) &&
                      setError({phoneNumber: '', password: ''});
                  }}
                /> */}
              </View>
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
        buttonTitle="Create Contact"
        onPress={createDocumentfun}
      />
    </View>
  );
};

export default CreateContact;
