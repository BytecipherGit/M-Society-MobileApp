import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import Rating from 'react-native-rating';
import {Easing} from 'react-native';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import {API_URL, PostData, SnackError, SuccessAlert} from '../assets/services';
import {COLORS} from '../assets/theme';

const AppReviewModal = ({
  visible = false,
  setVisible,
  servicePorviderId,
  reviews = [],
  onRefresh = () => null,
}) => {
  const [currentRating, setCurrentRating] = useState(0);
  const [comment, setComment] = useState('');
  const [postLoader, setPostLoader] = useState(false);

  const postReview = async () => {
    setPostLoader(true);
    try {
      const Result = await PostData({
        url: API_URL + 'serviceProvider/comment',
        body: {
          serviceProviderId: servicePorviderId,
          rating: `${currentRating}`,
          comment: comment,
        },
      });

      if (Result.response) {
        SnackError(Result.response.data.message);
      } else {
        SuccessAlert('Your post added');
        setComment('');
        setCurrentRating(0);
        setPostLoader(false);
        setVisible(false);
        onRefresh();
      }
    } catch (e) {
      SnackError('Something went wrong please try again later.');
    }
  };
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={() => {
        setVisible(false), setCurrentRating(0);
      }}
      onBackButtonPress={() => {
        setVisible(false), setCurrentRating(0);
      }}>
      <View style={{flex: 1, backgroundColor: 'white', borderRadius: 10}}>
        <View
          style={{marginTop: '10%', alignSelf: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Axiforma-Bold',
              width: '90%',
              marginBottom: '4%',
            }}>
            Add Your Review and comment
          </Text>
          <Rating
            onChange={rating => setCurrentRating(rating)}
            selectedStar={require('../assets/images/likeHighlight.png')}
            unselectedStar={require('../assets/images/likeUnhighlight.png')}
            config={{
              easing: Easing.inOut(Easing.ease),
              duration: 350,
            }}
            initial={currentRating}
            stagger={80}
            maxScale={0.5}
            starStyle={{
              width: 35,
              height: 30,
              marginTop: '1%',
            }}
          />

          <AppTextInput
            item={{
              title: 'Write your review here....',
            }}
            cntStyle={{
              width: '90%',
              marginTop: '3%',
            }}
            value={comment}
            setValue={text => setComment(text)}
          />

          {currentRating > 0 &&
            (!postLoader ? (
              <Text
                style={{
                  alignSelf: 'flex-end',
                  marginTop: '4%',
                  fontFamily: 'Axiforma-SemiBold',
                  color: 'red',
                }}
                onPress={postReview}>
                Post Now
              </Text>
            ) : (
              <ActivityIndicator
                style={{
                  marginTop: '3%',
                  alignSelf: 'flex-end',
                }}
                color={'red'}
              />
            ))}
        </View>
        <FlatList
          data={reviews}
          style={{flex: 1, marginTop: '10%'}}
          renderItem={({item}) => (
            <View
              style={{
                padding: 10,
                borderBottomWidth: 0.3,
                borderColor: 'grey',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Axiforma-SemiBold',
                  color: 'black',
                }}>
                {item.userId.name}
              </Text>

              <Rating
                onChange={rating => setCurrentRating(rating)}
                selectedStar={require('../assets/images/likeHighlight.png')}
                unselectedStar={require('../assets/images/likeUnhighlight.png')}
                config={{
                  easing: Easing.inOut(Easing.ease),
                  duration: 350,
                }}
                initial={item.rating}
                stagger={80}
                maxScale={0.5}
                starStyle={{
                  width: 15,
                  height: 15,
                  marginTop: '2%',
                }}
                editable={false}
              />

              <Text
                style={{
                  marginTop: '1%',
                  color: COLORS.titleFont,
                }}>
                {item.comment}
              </Text>
            </View>
          )}
        />
      </View>
    </ReactNativeModal>
  );
};

export default AppReviewModal;
