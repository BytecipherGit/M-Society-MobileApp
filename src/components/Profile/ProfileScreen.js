import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import {GuardprofileOptions, profileOptions} from '../../assets/Jsons';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import ForwardAerrow from '../../assets/images/ForwardAerrow.svg';
import SuccessModal from '../../ReUsableComponents/SuccessModal';
import {useSelector} from 'react-redux';

const ProfileScreen = ({navigation, route}) => {
  const [logoutPopup, setLogoutPopup] = useState(false);
  const User = useSelector(state => state.AuthReducer.userDetail);

  const renderOptions = () => {
    return (
      <View>
        <TitleText style={styles.profileText} text="Profile" />
        <FlatList
          data={
            User.data.userType === 'guard'
              ? GuardprofileOptions
              : profileOptions
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.optionCards}
              onPress={() => {
                item.title === 'Logout'
                  ? setLogoutPopup(true)
                  : navigation.navigate(item.navigationScreen, {item: User});
              }}>
              {/* Icon UI */}
              <View style={styles.cardIconCnt}>{item.icon}</View>
              <View style={{width: '76%'}}>
                <TitleText text={item.title} style={styles.cardTitle} />
              </View>
              <ForwardAerrow />
            </TouchableOpacity>
          )}
          ListFooterComponent={() => <View style={{height: 10}} />}
          extraData={({item, index}) => item.id}
        />
      </View>
    );
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <SuccessModal
          isVisible={logoutPopup}
          setIsVisible={setLogoutPopup}
          type={'Logout'}
          navigationScreenName="Logout"
          desc="Do you want to Logout Your Account ?"
        />
        <AppHeader title={'Profile'} navigation={navigation} />
        <View style={{flex: 0.34, alignItems: 'center'}}>
          <ImageBackground
            style={[styles.profileImageCnt]}
            imageStyle={[
              {borderRadius: 1000},
              !User.data.profileImage && {tintColor: COLORS.buttonColor},
            ]}
            source={{
              uri: User.data.profileImage
                ? User.data.profileImage
                : 'https://cdn-icons-png.flaticon.com/512/2102/2102647.png',
            }}
          />
          <Text style={styles.userName}>{User.data.name}</Text>
          <DescriptionText
            style={styles.userContact}
            text={`${User.data.countryCode} ${User.data.phoneNumber}`}
          />
        </View>
        <FullCardBackground
          RenderUI={() => renderOptions()}
          styles={styles.detailCardCnt}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileImageCnt: {
    backgroundColor: COLORS.themeBackground,
    height: 75,
    width: 75,
    borderRadius: 1000,
  },
  userName: {
    fontWeight: '400',
    fontSize: 26,
    marginTop: 16,
    color: '#FAFEFF',
  },
  userContact: {color: '#E9F5F8', marginTop: 4},
  detailCardCnt: {padding: 16, backgroundColor: COLORS.themeBackground},
  profileText: {color: '#384252', marginBottom: '1.5%'},
  optionCards: {
    ...shadow,
    shadowOpacity: 0.4,
    shadowRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2.5%',
    marginHorizontal: '.5%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardIconCnt: {
    height: 35,
    width: 35,
    borderRadius: 1000,
    borderWidth: 1.15,
    borderColor: COLORS.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {fontWeight: '400', color: COLORS.blackFont},
});
