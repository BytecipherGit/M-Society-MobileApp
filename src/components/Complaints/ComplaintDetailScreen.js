import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {Fragment} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import DocumentIcon from '../../assets/images/DocumentIcon.svg';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import AppButton from '../../ReUsableComponents/AppButton';
import {useRecoilState} from 'recoil';
import {GlobalAppAlert} from '../../assets/GlobalStates/RecoilGloabalState';
import moment from 'moment';

const ComplaintDetailScreen = ({navigation, route}) => {
  const {
    attachedFile,
    complainTitle,
    applicantName,
    description,
    createdDate,
    attachedImage,
  } = route?.params?.data;
  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={complainTitle} />
      <FlatList
        data={[1]}
        renderItem={() => {
          return (
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
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 12,
                  color: '#ABACB0',
                  alignSelf: 'flex-end',
                }}>
                {moment(`${createdDate}`).format('DD/MMM/YYYY')}
              </Text>
              <Text
                style={{
                  fontFamily: 'Axiforma-Medium',
                  fontSize: 18,
                  color: '#262626',
                  marginTop: '7%',
                  marginBottom: '2%',
                }}>
                {complainTitle}
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

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ImageViewScreen', {
                    img: attachedFile,
                  })
                }
                style={{
                  height: 260,
                  width: '100%',
                  backgroundColor: COLORS.themeColor,
                  // marginLeft: 10,
                  marginTop: 20,
                  borderRadius: 8,
                  borderWidth: 0.5,
                  borderColor: 'grey',
                }}>
                <Image
                  source={{
                    uri: attachedImage,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 8,
                  }}
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
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 16,
    ...shadow,
    shadowRadius: 2,
    marginBottom: '1%',
  },
  whiteCard: {
    height: 40,
    width: 40,
    backgroundColor: 'rgba(233, 245, 248, 1)',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '3%',
  },
  desc: {
    paddingVertical: 15,
    lineHeight: 19.5,
    textAlign: 'justify',
  },
  images: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.themeColor,
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 8,
  },
});
