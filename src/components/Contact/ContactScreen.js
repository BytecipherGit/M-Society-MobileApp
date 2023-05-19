import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import LocationIcon from '../../assets/images/LocationIcon.svg';
import PhoneIcon from '../../assets/images/PhoneIcon.svg';
import {API_URL, DeleteData, GetData, SnackError} from '../../assets/services';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import AppRoundAddActionButton from '../../ReUsableComponents/AppRoundAddActionButton';
import {useIsFocused} from '@react-navigation/native';
import AppCrudActionButton from '../../ReUsableComponents/AppCrudActionButton';

const ContactScreen = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);
  const [deleteLoader, setDeleteLoader] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const getContactDetails = async () => {
      setLoader(true);
      const payload = {
        url:
          API_URL +
          (route?.params?.screenName === 'Service'
            ? 'serviceProvider/all'
            : 'directory/resident/all'),
      };
      try {
        const Result = await GetData(payload);
        if (Result && Result.data && Result.data.success) {
          if (Result.data.data.length > 0) {
            if (route?.params?.screenName === 'Service') {
              let arr = [];
              Result.data.data.map((item, index) => {
                if (item.isVerify) {
                  arr.push(item);
                }
              });
              setData([...arr]);
            } else {
              setData(Result?.data?.data);
              setError('');
            }
          } else {
            setError('No Contact Found');
          }
        } else {
          setAlertData({
            visible: true,
            message: Result.data.message,
            iconType: 'error',
          });
          setError(Result.data.message);
        }
      } catch (e) {
        setError('Something Went Wrong');
      }
      setLoader(false);
    };
    isFocused && getContactDetails();
  }, [isFocused]);

  const doActions = async (item, type, index) => {
    //Edit,Delete

    if (type === 'Edit') {
      return;
      // return navigation.navigate('EditContact', {documentDetail: item});
    }
    setDeleteLoader(item._id);

    try {
      const Result = await DeleteData({
        url: API_URL + 'directory/',
        body: {id: item._id},
      });

      console.log(Result);

      if (Result.response) {
        SnackError(
          Result.response.data.error
            ? Result.response.data.error
            : Result.response.data.message,
        );
      } else {
        if (Result.success == true) {
          let arr = data;

          arr.splice(index, 1);
          setData([...arr]);
        } else {
          SnackError(Result.message);
        }
      }
    } catch (e) {
      SnackError('Something went wrong, please try again later.');
    }
    setDeleteLoader('');
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader
        navigation={navigation}
        title={route?.params?.screenName === 'Service' ? 'Service' : 'Contact'}
      />

      <FlatList
        data={data}
        ListEmptyComponent={() => (
          <AppLoaderSrceen loader={loader} error={error} />
        )}
        style={{marginTop: '3%'}}
        renderItem={({item, index}) => (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ContactDetailScreen', {detail: item})
              }
              style={style.detailCard}>
              <PhoneIcon />
              <View style={{marginLeft: '3%'}}>
                <Text style={style.contactDetail}>
                  {item.name + (item.profession ? ' - ' + item.profession : '')}
                </Text>
              </View>
            </TouchableOpacity>
            <AppCrudActionButton
              item={item}
              index={index}
              loaderIndex={deleteLoader}
              doActions={doActions}
            />
          </>
        )}
      />
      <AppRoundAddActionButton
        onPress={() => navigation.navigate('CreateContact')}
      />
    </View>
  );
};

export default ContactScreen;

const style = StyleSheet.create({
  container: {
    ...shadow,
    shadowOpacity: 0.4,
    shadowRadius: 1.5,
    padding: Platform.OS === 'android' ? 0 : 15,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: COLORS.themeBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3%',
  },
  search: {
    fontSize: 16,
    fontWeight: '400',
    color: '#595959',
    width: '93%',
  },
  detailCard: {
    ...shadow,
    shadowOpacity: 0.4,
    shadowRadius: 1.5,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: '2%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 1,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  phoneIconView: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.themeColor,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  contactDetail: {
    fontSize: 16,
    fontFamily: 'Axiforma-SemiBold',
    color: COLORS.titleFont,
  },
  contactNumber: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4C5564',
    marginBottom: '1%',
  },
  contactAddress: {
    fontWeight: '400',
    fontSize: 12,
    color: '#6B737F',
    marginBottom: '1%',
  },
});
