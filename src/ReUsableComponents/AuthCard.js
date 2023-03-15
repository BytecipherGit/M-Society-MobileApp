import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {COLORS, shadow} from '../assets/theme';

const AuthCard = ({
  cardTitle,
  buttonTitle,
  onSubmitPress,
  renderSecondDesign,
  btnLoader,
  hideButton,
  withCancelButton,
  onCancelPress,
}) => {
  return (
    <View style={style.cnt}>
      <View style={style.cardCnt}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{flexGrow: 0.3}}>
          <Text style={style.cardTitle}>{cardTitle}</Text>
          {renderSecondDesign}
        </ScrollView>
        <View style={{flex: 1}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {withCancelButton && (
            <TouchableOpacity
              style={[
                style.button,
                withCancelButton && {width: '49%'},
                {
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: COLORS.buttonColor,
                },
              ]}
              onPress={() => onCancelPress()}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Inter-Medium',
                  color: COLORS.buttonColor,
                }}>
                {'Cancel'}
              </Text>
            </TouchableOpacity>
          )}
          {!hideButton && (
            <TouchableOpacity
              style={[style.button, withCancelButton && {width: '49%'}]}
              onPress={() => onSubmitPress()}>
              {btnLoader ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    color: 'white',
                  }}>
                  {buttonTitle}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default AuthCard;

const style = StyleSheet.create({
  cnt: {flex: 1, justifyContent: 'flex-end', backgroundColor: 'white'},
  cardCnt: {
    ...shadow,
    height: 550,
    width: '100%',
    backgroundColor: '#F6FDFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  cardTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Medium',
    color: COLORS.primary,
    marginBottom: 15,
  },
  button: {
    height: 47,
    width: '100%',
    backgroundColor: COLORS.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: '1%',
  },
});
