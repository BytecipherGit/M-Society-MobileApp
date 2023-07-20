import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import PhoneIcon from '../../assets/images/PhoneIcon.svg';
import {API_URL, GetData, PostData, SnackError} from '../../assets/services';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import Rating from 'react-native-rating';
import {Easing} from 'react-native';
import AppReviewModal from '../../ReUsableComponents/AppReviewModal';

const ServiceDetail = ({navigation, route}) => {
  const [data, setData] = useState({
    error: '',
    data: {},
    loading: false,
  });
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    console.log(route.params.detail._id); // eslint-disable-line no-console
    getDetail();
    postCount();
  }, []);

  const postCount = async silent => {
    try {
      await PostData({
        url: API_URL + 'serviceProvider/count',
        body: {
          serviceProviderId: route.params.detail._id,
        },
      });
    } catch (e) {}
  };

  const getDetail = async silent => {
    try {
      changeDatavalue(true, {}, '');

      const Result = await GetData({
        url: API_URL + 'serviceProvider/' + route.params.detail._id,
      });

      if (Result.response) {
        changeDatavalue(false, {}, Result.response.data.message);
      } else {
        changeDatavalue(false, Result.data.data, '');
      }
    } catch (e) {
      changeDatavalue(
        false,
        {},
        'Something went wrong please try again later.',
      );
    }
  };

  const changeDatavalue = (loadingState, dataState, errorState) => {
    setData({
      loading: loadingState,
      data: dataState,
      error: errorState,
    });
  };

  return (
    <View style={globalStyle.cnt}>
      <AppReviewModal
        visible={reviewModal}
        setVisible={setReviewModal}
        servicePorviderId={route.params.detail._id}
        reviews={data.data?.review}
        onRefresh={() => getDetail('silent')}
      />
      <AppHeader navigation={navigation} title={'Service Detail'} />
      {data.loading || data.error ? (
        <AppLoaderSrceen loader={data.loading} error={data.error} />
      ) : (
        <FlatList
          data={[1]}
          style={{flex: 1}}
          renderItem={() => (
            <>
              <View style={style.cardCnt}>
                <Text style={style.cardProfessionTitle}>
                  {`${data.data?.user?.serviceName}`.toUpperCase()}
                </Text>
                {[
                  {
                    id: 1,
                    title: 'Name',
                    value: data.data?.user?.name,
                  },
                  {
                    id: 2,
                    title: 'Address',
                    value: data.data?.user?.address,
                  },
                  {
                    id: 3,
                    title: 'Contact Number',
                    value: `${
                      data.data?.user?.countryCode +
                      ' ' +
                      data.data?.user?.phoneNumber
                    }`,
                  },
                ].map((item, index) => (
                  <View key={index}>
                    <Text style={style.detailTitle}>{item.title}</Text>
                    <Text style={style.detailTxt}>{item.value}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    Linking.openURL(`tel:${data.data.user.phoneNumber}`)
                  }
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <PhoneIcon />
                  <Text style={style.tapToCall}>Tap To Call Now</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={style.cardCnt}
                activeOpacity={0.7}
                onPress={() => setReviewModal(true)}>
                <Text
                  style={[
                    style.detailTitle,
                    {fontWeight: '700', color: 'black'},
                  ]}>
                  Review
                </Text>
                <Rating
                  onChange={rating => console.log(rating)}
                  selectedStar={require('../../assets/images/likeHighlight.png')}
                  unselectedStar={require('../../assets/images/likeUnhighlight.png')}
                  config={{
                    easing: Easing.inOut(Easing.ease),
                    duration: 350,
                  }}
                  initial={data.data?.user?.rating}
                  stagger={80}
                  maxScale={0.5}
                  starStyle={{
                    width: 25,
                    height: 20,
                    marginTop: '1%',
                  }}
                  editable={false}
                />
              </TouchableOpacity>
              <View style={style.cardCnt}>
                <Text
                  style={[
                    style.detailTitle,
                    {fontWeight: '700', color: 'black'},
                  ]}>
                  Id Proof
                </Text>
                <Image
                  source={{uri: data.data?.user?.idProof}}
                  // source={{
                  //   uri: 'https://2.bp.blogspot.com/-w9UpeoC8I48/U0TjA2de28I/AAAAAAAAAEU/bvoeL3jH4i4/s1600/scan0001.jpg',
                  // }}
                  style={{
                    height: 200,
                    width: '90%',
                    marginTop: '2%',
                  }}
                  resizeMode="contain"
                />
              </View>
              <View style={style.cardCnt}>
                <Text
                  style={[
                    style.detailTitle,
                    {fontWeight: '700', color: 'black'},
                  ]}>
                  Gallery
                </Text>
                {data.data?.user?.images.map((imgItem, imgIndex) => {
                  return (
                    <Image
                      source={{uri: imgItem}}
                      // source={{
                      //   uri: 'https://2.bp.blogspot.com/-w9UpeoC8I48/U0TjA2de28I/AAAAAAAAAEU/bvoeL3jH4i4/s1600/scan0001.jpg',
                      // }}
                      style={{
                        height: 200,
                        width: '90%',
                        marginTop: '2%',
                      }}
                      resizeMode="contain"
                    />
                  );
                })}
              </View>
            </>
          )}
        />
      )}
    </View>
  );
};
// Linking.openURL(`tel:${item.phoneNumber}`)

export default ServiceDetail;

const style = StyleSheet.create({
  cardCnt: {
    borderRadius: 10,
    padding: 15,
    margin: 20,
    backgroundColor: 'white',
    ...shadow,
  },
  cardProfessionTitle: {
    fontFamily: 'Axiforma-SemiBold',
    fontSize: 20,
    color: '#262626',
    marginBottom: '3%',
    letterSpacing: 0.3,
    alignSelf: 'center',
  },
  detailTitle: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 14,
    color: '#A7A7A7',
    marginBottom: '1%',
  },
  detailTxt: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 15,
    color: '#707070',
    marginBottom: 15,
    lineHeight: 25,
  },
  tapToCall: {
    fontFamily: 'Axiforma-SemiBold',
    fontSize: 15,
    marginLeft: '3%',
    color: COLORS.blackFont,
  },
});
