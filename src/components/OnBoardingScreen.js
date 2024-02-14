import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import HomeSvg from '../assets/images/HomeSvg';
import SearchSvg from '../assets/images/SearchSvg';
import WalkSvg from '../assets/images/WalkSvg';
import {StoreData} from '../assets/services';
import {COLORS} from '../assets/theme';
import LinearGradient from 'react-native-linear-gradient';

const slides = [
  {
    key: '1',
    title: '',
    text: 'Paying bills, managing budgets, collecting rent & maintenance fees. ',
    Icon: <HomeSvg width={370} />,
  },
  {
    key: '2',
    title: '',
    text: 'Providing administrative support, security, and access control.',
    Icon: <SearchSvg width={370} />,
  },
  {
    key: '3',
    title: '',
    text: 'A seamless vendor management system for various community needs.',
    Icon: <WalkSvg width={250} />,
  },
];

const OnboardingScreen = ({navigation, route}) => {
  const sliderRef = useRef(null);
  const onSkip = () => {
    StoreData('OnBoard', 'true');
    navigation.replace('LoginOptionsScreen');
  };

  const slideView = () => {
    const currentSlide = sliderRef.current.state.activeIndex;

    if (currentSlide === 2) {
      return onSkip();
    }

    sliderRef.current.goToSlide(currentSlide + 1);
  };

  const _renderItem = ({item}) => (
    <View style={[styles.cnt]}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '60%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          {item.Icon}
        </View>
        <View style={{height: 235, paddingHorizontal: 15, width: '100%'}}>
          <View
            style={{
              height: 200,
              width: '100%',
              backgroundColor: 'white',
              padding: 14,
              borderRadius: 25,
            }}>
            {/* <Text
              style={{
                fontFamily: 'Axiforma-SemiBold',
                fontSize: 26,
                color: COLORS.titleFont,
                marginVertical: '2%',
              }}>
              {item.title}
            </Text> */}
            <Text
              style={{
                fontFamily: 'Axiforma-Regular',
                fontSize: 13,
                lineHeight: 22,
                color: COLORS.descFont,
                marginVertical: '2%',
              }}
              numberOfLines={4}>
              {item?.text}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={{}} onPress={slideView}>
            <LinearGradient
              colors={['#FFA13C', '#FF7334']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              angle={210.29}
              style={{
                height: 80,
                width: 80,
                alignSelf: 'center',
                marginTop: '-12%',
                borderRadius: 1000,
                borderWidth: 10,
                borderColor: COLORS.themeColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={slideView}>
                <Image
                  source={require('../assets/images/nextAerrow.png')}
                  style={{width: 22.09, height: 24}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.cnt}>
      <ImageBackground
        style={styles.cnt}
        source={require('../assets/images/gridBackground.png')}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            borderBottomWidth: 1,
            marginHorizontal: 10,
            borderColor: COLORS.titleFont,
          }}
          onPress={onSkip}>
          <Text
            style={{
              // marginHorizontal: 10,
              fontFamily: 'Axiforma-Regular',
              fontSize: 16,
              color: COLORS.titleFont,
              borderBottomWidth: 1,
            }}>
            SKIP
          </Text>
        </TouchableOpacity>
        {/* {_renderItem({item: slides[0]})} */}
        <AppIntroSlider
          ref={sliderRef}
          renderItem={_renderItem}
          data={slides}
          nextLabel={''}
          doneLabel={''}
          renderDoneButton={() => null}
          renderNextButton={() => null}
          style={{flex: 1}}
          activeDotStyle={styles.acriveDot}
          dotStyle={[styles.inActiveDot]}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  acriveDot: {
    backgroundColor: '#5FB6FF',
    width: 25,
    height: 6,
    marginBottom:
      Dimensions.get('window').height /
      (Platform.OS === 'android' ? 1.4 : 1.55),
  },
  inActiveDot: {
    width: 16,
    height: 6,
    backgroundColor: '#D1D1D1',
    marginBottom:
      Dimensions.get('window').height /
      (Platform.OS === 'android' ? 1.4 : 1.55),
  },
  cnt: {flex: 1, backgroundColor: COLORS.themeColor},
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
