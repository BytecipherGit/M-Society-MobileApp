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
import {useSelector} from 'react-redux';
import Rating from 'react-native-rating';
import {Easing} from 'react-native';

const ServiceCategories = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [alertData, setAlertData] = useRecoilState(GlobalAppAlert);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getContactDetails = async () => {
      setLoader(true);
      const payload = {
        url: API_URL + 'serviceProvider/serviceName',
      };
      try {
        const Result = await GetData(payload);
        if (Result && Result.data && Result.data.success) {
          if (Result.data.data.length > 0) {
            if (route?.params?.screenName === 'Service') {
              let arr = [];
              Result.data.data.map((item, index) => {
                if (item.status === 'active') {
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
        renderItem={({item, index}) => {
          return (
            <View style={style.detailCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ContactScreen', {
                    screenName: 'Service',
                    serviceName: item.name,
                  })
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginLeft: '3%', width: '80%'}}>
                  <Text style={style.contactDetail}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ServiceCategories;

const style = StyleSheet.create({
  detailCard: {
    ...shadow,
    shadowOpacity: 0.4,
    shadowRadius: 1.5,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: '2%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 1,
    // alignItems: 'center',
    marginHorizontal: 15,
  },
  contactDetail: {
    fontSize: 16,
    fontFamily: 'Axiforma-SemiBold',
    color: COLORS.titleFont,
  },
});
