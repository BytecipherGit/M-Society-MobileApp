import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Fragment} from 'react';
import AppHeader from '../ReUsableComponents/AppHeader';
import {COLORS, globalStyle} from '../assets/theme';
import FullCardBackground from '../ReUsableComponents/FullCardBackground';
import AppButton from '../ReUsableComponents/AppButton';
import IButton from '../assets/images/IButton.svg';
import TitleText from "../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../ReUsableComponents/Text's/DescriptionText";
import moment from 'moment';
import BellIcon from '../assets/images/Caledor.svg';

const NoticeDetailScreen = ({navigation, route}) => {
  console.log(route.params.item);
  const {title, description, createdDate, attachedFile, societyAdminId} =
    route?.params?.item;
  const renderDetail = () => {
    return (
      <View style={{flex: 1}}>
        <View style={style.cnt}>
          <IButton style={{alignSelf: 'center'}} />
          <TitleText text={title} style={style.noticeTitle} />
          <Text style={style.descTxt}>{description}</Text>
          <View style={style.userDetailCnt}>
            <DescriptionText text={'Secretory'} style={{fontWeight: '500'}} />
            <DescriptionText
              text={societyAdminId.name}
              style={{fontWeight: '500', color: '#4C5564'}}
            />
            <DescriptionText
              text={moment(`${createdDate}`).format('DD/MMM/YYYY')}
              style={{fontWeight: '500', color: '#4C5564'}}
            />
          </View>
          <View style={{flex: 1}}>
            <FlatList
              data={[1]}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{alignSelf: 'flex-end'}}
              renderItem={({item, index}) => (
                <View style={style.imgCnt}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ImageViewScreen', {
                        img: attachedFile,
                      })
                    }>
                    <Image
                      source={{
                        uri: attachedFile,
                      }}
                      style={{height: '100%', width: '100%', borderRadius: 8}}
                    />
                  </TouchableOpacity>
                </View>
              )}
              extraData={({item, index}) => index}
            />
          </View>
        </View>
        <AppButton
          buttonStyle={{width: '90%', alignSelf: 'center'}}
          buttonTitle="Ok"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  };

  return (
    <View style={[globalStyle.cnt]}>
      <AppHeader title={'Notice'} navigation={navigation} />
      <View
        style={{
          margin: 20,
          padding: 15,
          backgroundColor: 'white',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1.84,

          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <BellIcon />
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 12,
              color: '#ABACB0',
            }}>
            {moment(`${createdDate}`).format('DD/MMM/YYYY')}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Axiforma-Medium',
            fontSize: 18,
            color: '#262626',
            marginTop: '7%',
            marginBottom: '2%',
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 16,
            color: '#72767C',
            marginBottom: '2%',
            lineHeight: 25,
          }}>
          {description}
        </Text>
        <Text
          style={{
            fontFamily: 'Axiforma-Medium',
            fontSize: 16,
            color: '#9b9b9b',
            marginTop: '2%',
          }}>
          {'Secretory'}
        </Text>
        <Text
          style={{
            fontFamily: 'Axiforma-Medium',
            fontSize: 16,
            color: '#262626',
            marginTop: '1.5%',
          }}>
          {societyAdminId.name}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ImageViewScreen', {
              img: attachedFile,
            })
          }
          style={style.imgCnt}>
          <Image
            source={{
              uri: attachedFile,
            }}
            style={{height: '100%', width: '100%', borderRadius: 8}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoticeDetailScreen;

const style = StyleSheet.create({
  cnt: {flex: 1, padding: 16},
  noticeTitle: {
    alignSelf: 'center',
    marginTop: '1.5%',
    color: COLORS.themeColor,
  },
  descTxt: {
    lineHeight: 19.6,
    fontSize: 14,
    fontWeight: '400',
    color: '#6B737F',
    marginTop: 16,
    textAlign: 'justify',
  },
  userDetailCnt: {
    marginTop: 16,
    height: 65,
    justifyContent: 'space-between',
  },
  imgCnt: {
    height: 260,
    width: '100%',
    backgroundColor: COLORS.themeColor,
    // marginLeft: 10,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
});
