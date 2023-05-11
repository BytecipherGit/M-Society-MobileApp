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
import {COLORS, globalStyle, shadow} from '../assets/theme';
import moment from 'moment';
import BellIcon from '../assets/images/Caledor.svg';

const NoticeDetailScreen = ({navigation, route}) => {
  const {title, description, createdDate, attachedFile, societyAdminId} =
    route?.params?.item;

  return (
    <View style={[globalStyle.cnt]}>
      <AppHeader title={'Notice'} navigation={navigation} />
      <View style={style.card}>
        <View style={style.dateCnt}>
          <BellIcon />
          <Text style={style.dateTxt}>
            {moment(`${createdDate}`).format('DD/MMM/YYYY')}
          </Text>
        </View>
        <Text style={style.title}>{title}</Text>
        <Text style={style.desc}>{description}</Text>
        <Text style={style.secretory}>{'Secretory'}</Text>
        <Text style={style.adminName}>{societyAdminId.name}</Text>
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
  card: {
    margin: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    ...shadow,
  },
  dateCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTxt: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#ABACB0',
  },
  title: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 18,
    color: COLORS.blackFont,
    marginTop: '7%',
    marginBottom: '2%',
  },
  desc: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.greyFont,
    marginBottom: '2%',
    lineHeight: 25,
  },
  secretory: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 16,
    color: COLORS.descFont,
    marginTop: '2%',
  },
  adminName: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 16,
    color: COLORS.blackFont,
    marginTop: '1.5%',
  },
});
