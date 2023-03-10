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
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader title={'Notice'} navigation={navigation} />
        <FullCardBackground RenderUI={renderDetail} />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: 'white'}} />
    </Fragment>
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
    height: 60,
    width: 60,
    backgroundColor: COLORS.themeColor,
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 8,
  },
});
