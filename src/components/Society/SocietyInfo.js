import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import React, {Fragment, useEffect} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import {useDispatch, useSelector} from 'react-redux';
import {API_URL, GetData} from '../../assets/services';
import {SOCIETY_DETAIL_REQUEST} from '../../redux/Actions';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import moment from 'moment';
import {SocietyInfoArray} from '../../assets/Jsons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';

const SocietyInfo = ({navigation, route}) => {
  const SocietyId = useSelector(
    state => state.AuthReducer.userDetail.data.societyId,
  );
  const data = useSelector(state => state.SocietyReducer);
  const {isAdmin} = useSelector(state => state.AuthReducer);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      dispatch({type: SOCIETY_DETAIL_REQUEST, payload: SocietyId._id});
  }, [isFocused]);

  return (
    <View style={globalStyle.cnt}>
      {/* Header */}
      <ImageBackground
        source={{
          uri: 'https://img.freepik.com/free-photo/analog-landscape-city-with-buildings_23-2149661456.jpg?w=1800&t=st=1681467853~exp=1681468453~hmac=2a4d43b5ce3021fa00974f7761f613faf74ba2e68427231142da0ae1a17a11f4',
        }}
        style={{
          height: 347,
          backgroundColor: COLORS.themeColor,
        }}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0,0,0,.4)'}}>
          <Text
            style={{
              fontFamily: 'Axiforma-SemiBold',
              color: 'white',
              alignSelf: 'center',
              marginTop: '2%',
            }}>
            Society Info
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: '4%',
              marginTop: '-4.5%',
              alignSelf: 'flex-start',
            }}
            onPress={() => navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              style={{
                fontSize: 25,
                color: 'white',
              }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
      {/* Society Detail */}
      {data.data.society ? (
        <FlatList
          data={[1]}
          showsVerticalScrollIndicator={false}
          style={{marginTop: '-18%'}}
          renderItem={() => {
            const {
              registrationNumber,
              country,
              state,
              city,
              pin,
              address,
              uniqueId,
              createdDate,
              subscriptionType,
              description,
            } = data.data.society;
            return (
              <View
                style={{
                  margin: 20,
                  padding: 15,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  ...shadow,
                }}>
                <Text style={[styles.MainTitle, {marginBottom: '7%'}]}>
                  Society Name{' '}
                  <Text
                    onPress={() =>
                      navigation.navigate('SocietyEditScreen', {
                        data: data.data.society,
                      })
                    }>
                    {isAdmin && (
                      <AntDesign name="edit" style={{fontSize: 20}} />
                    )}
                  </Text>
                </Text>
                <Text style={styles.detailTitle}>Registration Number</Text>
                <Text style={styles.detailDesc}>{registrationNumber}</Text>
                {/* Country and State */}
                {[
                  {
                    first: {label: 'Country', value: country},
                    second: {label: 'State', value: state},
                  },
                  {
                    first: {label: 'City', value: city},
                    second: {label: 'Zip/Pin Code', value: pin},
                  },
                ].map((item, index) => (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{width: '65%'}}>
                      <Text style={styles.detailTitle}>{item.first.label}</Text>
                      <Text style={styles.detailDesc}>{item.first.value}</Text>
                    </View>
                    <View>
                      <Text style={styles.detailTitle}>
                        {item.second.label}
                      </Text>
                      <Text style={styles.detailDesc}>{item.second.value}</Text>
                    </View>
                  </View>
                ))}
                <View>
                  <Text style={styles.detailTitle}>Society Address</Text>
                  <Text style={[styles.detailDesc]}>{address}</Text>
                </View>
                {[
                  {
                    first: {label: 'Unique ID', value: uniqueId},
                    second: {label: 'Date', value: createdDate},
                  },
                ].map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{width: '65%'}}>
                      <Text style={styles.detailTitle}>{item.first.label}</Text>
                      <Text style={styles.detailDesc}>{item.first.value}</Text>
                    </View>
                    <View>
                      <Text style={styles.detailTitle}>
                        {item.second.label}
                      </Text>
                      <Text style={styles.detailDesc}>
                        {moment(`${item.second.value}`).format('DD/MMM/YYYY')}
                      </Text>
                    </View>
                  </View>
                ))}
                <View>
                  <Text style={styles.detailTitle}>Subscription Plan</Text>
                  <Text style={styles.detailDesc}>{subscriptionType}</Text>
                </View>
                <View>
                  <Text style={styles.MainTitle}>Society Description</Text>
                  <Text style={styles.detailDesc}>
                    {description ? description : '----'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.MainTitle}>Society Image</Text>
                  <ScrollView
                    contentContainerStyle={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                    horizontal={true}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginTop: '5%',
                      }}>
                      {data.data.society &&
                        data.data.society.images.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() =>
                                navigation.navigate('ImageViewScreen', {
                                  img: item,
                                })
                              }
                              style={{
                                width: 90,
                                height: 90,
                                margin: '3%',
                                marginHorizontal: '1.90%',
                                borderRadius: 7,
                                backgroundColor: COLORS.themeColor,
                                marginBottom: '3%',
                                ...shadow,
                              }}>
                              <Image
                                style={{
                                  flex: 1,
                                  borderRadius: 7,
                                  backgroundColor: 'red',
                                }}
                                source={{uri: item}}
                              />
                            </TouchableOpacity>
                          );
                        })}
                    </View>
                  </ScrollView>
                </View>
              </View>
            );
          }}
          ListFooterComponent={() => <View style={{height: 50}} />}
        />
      ) : (
        <AppLoaderSrceen loader={true} />
      )}
    </View>
  );
};

export default SocietyInfo;

const styles = StyleSheet.create({
  MainTitle: {
    fontFamily: 'Axiforma-SemiBold',
    fontSize: 20,
    color: '#262626',
    marginBottom: '3%',
  },
  detailTitle: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 14,
    color: '#A7A7A7',
    marginBottom: '1%',
  },
  detailDesc: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 15,
    color: '#707070',
    marginBottom: 15,
    lineHeight: 25,
  },
});
