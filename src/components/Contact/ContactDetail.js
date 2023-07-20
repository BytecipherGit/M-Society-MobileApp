import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import PhoneIcon from '../../assets/images/PhoneIcon.svg';

const ContactDetail = ({navigation, route}) => {
  const {
    address,
    countryCode,
    createdDate,
    name,
    phoneNumber,
    profession,
    status,
  } = route.params.detail;
  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={'Phone Directory Detail'} />
      <View style={style.cardCnt}>
        {profession && (
          <Text style={style.cardProfessionTitle}>
            {`${profession}`.toUpperCase()}
          </Text>
        )}
        {[
          {
            id: 1,
            title: 'Name',
            value: name,
          },
          {
            id: 2,
            title: 'Address',
            value: address,
          },
          {
            id: 3,
            title: 'Contact Number',
            value: `${countryCode + '' + phoneNumber}`,
          },
        ].map((item, index) => (
          <View key={index}>
            <Text style={style.detailTitle}>{item.title}</Text>
            <Text style={style.detailTxt}>{item.value}</Text>
          </View>
        ))}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <PhoneIcon />
          <Text style={style.tapToCall}>Tap To Call Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// Linking.openURL(`tel:${item.phoneNumber}`)

export default ContactDetail;

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
