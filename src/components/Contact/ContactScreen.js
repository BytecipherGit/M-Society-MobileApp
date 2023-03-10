import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import LocationIcon from '../../assets/images/LocationIcon.svg';
import PhoneIcon from '../../assets/images/PhoneIcon.svg';
import {API_URL, GetData} from '../../assets/services';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';

const ContactScreen = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const getContactDetails = async () => {
      setLoader(true);
      const payload = {
        url: API_URL + 'directory/resident/all',
      };
      try {
        const Result = await GetData(payload);
        console.log(Result.data);
        if (Result && Result.data && Result.data.success) {
          if (Result.data.data.length > 0) {
            setData(Result?.data?.data);
            setError('');
          } else {
            setError('No Contact Found');
          }
        } else {
          Alert.alert(Result.data.message);
          setError(Result.data.message);
        }
      } catch (e) {
        setError('Something Went Wrong');
      }
      setLoader(false);
    };
    getContactDetails();
  }, []);

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title="Contact" />
        <FullCardBackground
          styles={{backgroundColor: COLORS.themeBackground, padding: 16}}
          RenderUI={() => (
            <View>
              <View
                style={{
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
                }}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={'#595959'}
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: '#595959',
                    width: '93%',
                  }}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    height: 16,
                    width: 16,
                  }}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png',
                    }}
                    style={{flex: 1, tintColor: '#6B737F'}}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                data={data}
                ListEmptyComponent={() => (
                  <AppLoaderSrceen loader={loader} error={error} />
                )}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}
                    style={{
                      ...shadow,
                      shadowOpacity: 0.4,
                      shadowRadius: 1.5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: '4%',
                      padding: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      marginHorizontal: 1,
                    }}>
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        backgroundColor: COLORS.themeColor,
                        borderRadius: 1000,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      {/* <Image
                        source={{uri: 'www.google.com'}}
                        style={{
                          height: '96%',
                          width: '96%',
                          backgroundColor: 'white',
                          borderRadius: 1000,
                        }}
                      /> */}
                      <PhoneIcon />
                    </View>
                    <View style={{width: '82%'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#4C5564',
                          marginBottom: '1%',
                        }}>
                        {item.name + ' - ' + item.profession}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                          color: '#4C5564',
                          marginBottom: '1%',
                        }}>
                        {item.phoneNumber}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <LocationIcon />
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: 12,
                            color: '#6B737F',
                            marginBottom: '1%',
                          }}>
                          {' '}
                          {item.address}
                        </Text>
                      </View>
                    </View>
                    {/* <TouchableOpacity
                      onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}
                      style={{
                        height: 34,
                        width: 34,
                        backgroundColor: COLORS.buttonColor,
                        alignSelf: 'center',
                        borderRadius: 1000,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <PhoneIcon />
                    </TouchableOpacity> */}
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default ContactScreen;
