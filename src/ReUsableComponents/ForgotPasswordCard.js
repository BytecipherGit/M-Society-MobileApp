import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {COLORS, globalStyle} from '../assets/theme';
import AppButton from './AppButton';

const ForgotPasswordCard = ({
  title,
  desc,
  onPressButton,
  loader,
  renderUI,
  renderDesc,
  buttonTitle,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        height: Dimensions.get('window').height,
      }}>
      <ImageBackground
        style={[
          globalStyle.cntWithTheme,
          {justifyContent: 'center', alignItems: 'center'},
        ]}
        source={require('..//assets/images/gridBackground.png')}>
        <Image
          source={require('../assets/images/SecureImage.png')}
          style={{
            width: 290,
            height: 345,
            marginBottom: '5%',
            marginTop: '6%',
          }}
          resizeMode="contain"
        />
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            width: '94%',
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Axiforma-SemiBold',
              fontSize: 20,
              color: COLORS.titleFont,
              marginBottom: '3%',
            }}>
            {title}
          </Text>
          {renderDesc ? (
            renderDesc()
          ) : (
            <Text
              style={{
                fontFamily: 'Axiforma-Regular',
                fontSize: 14,
                color: COLORS.descFont,
                marginBottom: '7%',
                lineHeight: 22,
              }}>
              {desc}
            </Text>
          )}
          {renderUI && renderUI()}
          <AppButton
            buttonStyle={{
              marginTop: '7%',
            }}
            buttonTitle={buttonTitle}
            btnLoader={loader}
            onPress={onPressButton}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ForgotPasswordCard;
