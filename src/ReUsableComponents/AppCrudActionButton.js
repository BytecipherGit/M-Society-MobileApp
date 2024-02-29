import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme';
import {useSelector} from 'react-redux';

const AppCrudActionButton = ({
  doActions = () => null,
  item = {},
  index,
  loaderIndex = '',
  hideEdit = false,
  hideDelete = false,
}) => {
  const state = useSelector(state => state.AuthReducer.userDetail);
  const array = hideEdit
    ? ['Delete']
    : hideDelete
    ? ['Edit']
    : ['Edit', 'Delete'];
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
          // marginBottom: 20,
          // marginTop: 10,
        },
        array.length === 1 && {justifyContent: 'flex-start', marginLeft: '6%'},
      ]}>
      {array.map((action, i) => {
        return (
          <TouchableOpacity
            style={{
              flex: 0.3,
              backgroundColor:
                state && state.data && state.data.societyId
                  ? state.data.societyId.buttonHoverBgColour
                  : COLORS.buttonColor,
              padding: 10,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            key={i}
            onPress={() =>
              action === 'Delete'
                ? Alert.alert('', 'Are you sure you want to delete?', [
                    {
                      text: 'Cancel',
                      // onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => doActions(item, action, index),
                    },
                  ])
                : doActions(item, action, index)
            }>
            {loaderIndex === item._id ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text
                style={{
                  fontFamily: 'Axiforma-Medium',
                  color:
                    state && state.data && state.data.societyId
                      ? state.data.societyId.fontColour
                      : COLORS.white,
                }}>
                {action.toUpperCase()}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AppCrudActionButton;
