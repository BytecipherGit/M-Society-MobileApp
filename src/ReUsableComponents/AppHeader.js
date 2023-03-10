import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import BackIcon from '../assets/images/BackIcon.svg';
import {COLORS} from '../assets/theme';

const AppHeader = ({
  title,
  navigation,
  ThreeActionDotVisible,
  ThreeActionDot,
  cntStyle,
}) => {
  return (
    <View style={[styles.cnt, cntStyle && cntStyle]}>
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon style={{marginLeft: 3}} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {ThreeActionDotVisible && ThreeActionDot()}
        </View>
      </View>
    </View>
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
  },
});
