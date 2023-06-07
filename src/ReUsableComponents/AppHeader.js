import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React from 'react';
import BackIcon from '../assets/images/BackIcon.svg';
import {COLORS} from '../assets/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

const AppHeader = ({
  title,
  navigation,
  ThreeActionDotVisible,
  ThreeActionDot,
  cntStyle,
}) => {
  const state = useSelector(state => state.AuthReducer.userDetail);
  return (
    <ImageBackground
      source={require('../assets/images/gridBackground.png')}
      style={{
        height: 120,
        backgroundColor:
          state && state.data && state.data.societyId
            ? state.data.societyId.primaryColour
            : COLORS.themeColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 25,
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity
        onPress={() => navigation && navigation.goBack()}
        style={{
          justifyContent: 'center',
        }}>
        <AntDesign
          name="arrowleft"
          style={{
            fontSize: 25,
            color:
              state && state.data && state.data.societyId
                ? state.data.societyId.fontColour
                : COLORS.titleFont,
          }}
        />
      </TouchableOpacity>
      <View style={{width: '100%'}}>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: 'Axiforma-SemiBold',
            fontSize: 16,
            color:
              state && state.data && state.data.societyId
                ? state.data.societyId.fontColour
                : COLORS.titleFont,
            marginLeft: '-14%',
          }}>
          {title}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  cnt: {
    height: 56,
    width: '100%',
    backgroundColor: COLORS.themeColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginLeft: '3.5%',
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
    // flex: 1,
  },
});
