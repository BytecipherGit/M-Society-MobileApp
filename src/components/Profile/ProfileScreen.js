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
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../ReUsableComponents/AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';

const ProfileScreen = ({navigation, route}) => {
  const [logoutPopup, setLogoutPopup] = useState(false);
  const focus = useIsFocused();
  const User = useSelector(({AuthReducer}) => AuthReducer.userDetail);
  const dispatch = useDispatch();
  let array =
    User?.data?.userType === 'guard' ? GuardprofileOptions : profileOptions;

  const logout = () => {
    dispatch({type: 'LOG_OUT'});
  };

  useEffect(() => {
    array =
      User?.data?.userType === 'guard' ? GuardprofileOptions : profileOptions;
  }, [focus]);

  const renderOptions = () => {
    return (
      <View
        style={{
          margin: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          ...shadow,
        }}>
        {array.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                style={styles.optionCards}
                onPress={() => {
                  item.id === 10
                    ? navigation.navigate(item.navigationScreen, {
                        screenName: item.param.screenName,
                        url: item.urlParam,
                      })
                    : item.param
                    ? navigation.navigate(item.navigationScreen, {
                        screenName: item.param.screenName,
                        url: item.urlParam,
                      })
                    : navigation.navigate(item.navigationScreen, {item: User});
                }}>
                {/* Icon UI */}
                <View style={styles.cardIconCnt}>{item.icon}</View>
                <View style={{width: '76%'}}>
                  <TitleText text={item.title} style={styles.cardTitle} />
                </View>
                <AntDesign
                  name="right"
                  style={{
                    fontSize: 15,
                    color: '#858585',
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: '83%',
                  alignSelf: 'flex-end',
                  borderColor: '#F3F3F3',
                }}
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={globalStyle.cnt}>
      <SuccessModal
        isVisible={logoutPopup}
        setIsVisible={setLogoutPopup}
        onPress={logout}
        type={'Logout'}
        navigationScreenName="Logout"
        desc="Do you want to Logout Your Account ?"
      />
      <AppHeader title={'Profile'} navigation={navigation} />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <ImageBackground
                  style={[styles.profileImageCnt]}
                  imageStyle={[
                    {borderRadius: 30},
                    !User.data.profileImage && {tintColor: COLORS.buttonColor},
                  ]}
                  source={{
                    uri: User.data.profileImage,
                  }}
                />
                <Text style={styles.userName}>{User.data.name}</Text>
                <DescriptionText
                  style={styles.userContact}
                  text={`${User.data.countryCode} ${User.data.phoneNumber}`}
                />
              </View>
              {renderOptions()}
            </>
          );
        }}
      />
      <View
        style={{
          height: 100,
          backgroundColor: 'white',
          // alignItems: 'center',
          // justifyContent: 'center',
          ...shadow,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <AppButton
          buttonTitle={'Log Out'}
          onPress={() => setLogoutPopup(true)}
          renderIcon={() => (
            <AntDesign
              name="logout"
              style={{
                fontSize: 15,
                alignSelf: 'center',
                marginRight: 10,
                color: 'white',
              }}
            />
          )}
          buttonStyle={{width: '80%', alignSelf: 'center', marginTop: '5%'}}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileImageCnt: {
    backgroundColor: COLORS.themeColor,
    height: 100,
    width: 100,
    borderRadius: 30,
    marginTop: 50,
  },
  userName: {
    fontFamily: 'Axiforma-Bold',
    fontSize: 18,
    color: COLORS.blackFont,
    marginTop: '4%',
  },
  userContact: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 14,
    color: COLORS.descFont,
    marginTop: '2%',
    marginBottom: 28,
  },
  detailCardCnt: {padding: 16, backgroundColor: COLORS.themeBackground},
  profileText: {color: '#384252', marginBottom: '1.5%'},
  optionCards: {
    // ...shadow,
    // shadowOpacity: 0.4,
    // shadowRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '.5%',
    // marginHorizontal: '.5%',
    padding: 10,
    // backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardIconCnt: {
    height: 35,
    width: 35,
    borderRadius: 1000,
    // borderWidth: 1.15,
    borderColor: COLORS.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 14,
    color: COLORS.blackFont,
  },
});
