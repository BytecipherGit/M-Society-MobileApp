import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import HomeSvg from '../assets/images/HomeSvg';
import SearchSvg from '../assets/images/SearchSvg';
import WalkSvg from '../assets/images/WalkSvg';
import {StoreData} from '../assets/services';
import {COLORS} from '../assets/theme';

const slides = [
  {
    key: '1',
    title: 'Our Society',
    text: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled ',
    Icon: <HomeSvg />,
  },
  {
    key: '2',
    title: 'online society services',
    text: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled ',
    Icon: <SearchSvg />,
  },
  {
    key: '3',
    title: 'Playing and walking',
    text: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled ',
    Icon: <WalkSvg />,
  },
];

const OnboardingScreen = ({navigation, route}) => {
  const onSkip = () => {
    StoreData('OnBoard', 'true');
    navigation.replace('LoginOptionsScreen');
  };

  const _renderItem = ({item}) => (
    <View style={styles.cnt}>
      <View style={styles.topImageCnt}>
        <Image
          source={require('../assets/images/registerTop.png')}
          style={{height: '100%', width: '100%'}}
        />
      </View>
      <View style={styles.detailCnt}>
        {item.Icon}
        <View style={styles.textCnt}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.text}</Text>
        </View>
      </View>
    </View>
  );

  const skipUI = () => {
    return (
      <TouchableOpacity
        onPress={onSkip}
        style={{
          marginTop: '60%',
          marginRight: '2%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#FFAA00', fontSize: 16, fontWeight: '500'}}>
          Skip{' '}
        </Text>
        <Image
          source={require('../assets/images/nextAerrow.png')}
          style={{height: 12, width: 12}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        nextLabel={''}
        doneLabel={''}
        renderDoneButton={skipUI}
        renderNextButton={skipUI}
        activeDotStyle={styles.acriveDot}
        dotStyle={styles.inActiveDot}
      />
    </>
  );
};

const styles = StyleSheet.create({
  acriveDot: {
    backgroundColor: '#49AFC8',
    width: 25,
    height: 8,
    marginBottom: '5%',
  },
  inActiveDot: {
    width: 16,
    height: 8,
    backgroundColor: '#CAE8EF',
    marginBottom: '5%',
  },
  cnt: {flex: 1, backgroundColor: 'white'},
  topImageCnt: {width: '100%', height: '17%'},
  detailCnt: {flex: 1, justifyContent: 'space-around', alignItems: 'center'},
  textCnt: {width: '70%', alignSelf: 'center'},
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Medium',
    color: COLORS.themeColor,
    marginBottom: 16,
    alignSelf: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#384252',
    textAlign: 'center',
    marginBottom: '15%',
    lineHeight: 16.94,
    letterSpacing: 0.1,
  },
});

export default OnboardingScreen;
