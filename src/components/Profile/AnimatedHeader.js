import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Animated} from 'react-native';
const HEADER_HEIGHT = 200;

export default AnimatedHeader = ({animatedValue}) => {
  const insets = useSafeAreaInsets();

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        backgroundColor: 'lightblue',
      }}
    />
  );
};
