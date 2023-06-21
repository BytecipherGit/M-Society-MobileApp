import {View, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import AppTextInput from '../../ReUsableComponents/AppTextInput';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import AppButton from '../../ReUsableComponents/AppButton';
import {
  API_URL,
  PostData,
  PutData,
  SnackError,
  SuccessAlert,
} from '../../assets/services';
import {useDispatch} from 'react-redux';
import {GET_CONTACT_PROFESSION_REQUEST} from '../../redux/Actions';

const CreateContact = ({navigation, route}) => {
  const isUpdate = route && route.params && route.params.data ? true : false;

  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [countryCode, setCountryCode] = useState('91');
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      setData(route.params.data);
    }
  }, [isUpdate]);

  const createDocumentfun = async () => {
    if (!data.name || !data.address || !data.phoneNumber || !data.profession) {
      return SnackError('Please Fill All the fileds first.');
    }
    try {
      setLoader(true);
      const paylaod = {
        ...data,
        ...{
          latitude: 0,
          longitude: 0,
        },
        countryCode: '+' + countryCode,
      };
      const Result = isUpdate
        ? await PutData({
            url: API_URL + 'directory',
            body: {
              ...paylaod,
              id: data._id,
            },
          })
        : await PostData({
            url: API_URL + 'directory',
            body: paylaod,
          });

      if (Result.data.success) {
        SuccessAlert(
          `Contact ${isUpdate ? 'Updated' : 'Created'} Successfully.`,
        );
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

  useEffect(() => {
    dispatch({type: GET_CONTACT_PROFESSION_REQUEST});
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader
        navigation={navigation}
        title={isUpdate ? 'Update Contact' : 'Create New Contact'}
      />
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
        buttonTitle={isUpdate ? 'Update' : 'Create Contact'}
        onPress={createDocumentfun}
      />
    </View>
  );
};

export default CreateContact;
