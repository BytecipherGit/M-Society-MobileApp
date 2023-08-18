import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {Fragment} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import moment from 'moment';

const ComplaintDetailScreen = ({navigation, route}) => {
  const {attachedFile, complainTitle, description, createdDate, attachedImage} =
    route?.params?.data;
  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={complainTitle} />
      <FlatList
        data={[1]}
        renderItem={() => {
          return (
            <View style={style.card}>
              <Text style={style.cardDate}>
                {moment(`${createdDate}`).format('DD/MMM/YYYY')}
              </Text>
              <Text style={style.cardTitle}>{complainTitle}</Text>
              <Text style={style.cardDesc}>{description}</Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ImageViewScreen', {
                    img: attachedFile,
                  })
                }
                style={style.imageCnt}>
                <Image
                  source={{
                    uri: attachedImage,
                  }}
                  style={style.image}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ComplaintDetailScreen;

const style = StyleSheet.create({
  card: {
    margin: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    ...shadow,
  },
  cardDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#ABACB0',
    alignSelf: 'flex-end',
  },
  cardTitle: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 18,
    color: COLORS.blackFont,
    marginTop: '7%',
    marginBottom: '2%',
  },
  cardDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.greyFont,
    marginBottom: '2%',
    lineHeight: 25,
  },
  imageCnt: {
    height: 260,
    width: '100%',
    backgroundColor: COLORS.themeColor,
    // marginLeft: 10,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
});
