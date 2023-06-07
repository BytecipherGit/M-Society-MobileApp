import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme';
import {useSelector} from 'react-redux';

const AppCrudActionButton = ({
  doActions = () => null,
  item = {},
  index,
  loaderIndex = '',
}) => {
  const state = useSelector(state => state.AuthReducer.userDetail);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
      }}>
      {['Edit', 'Delete'].map((action, i) => (
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
          onPress={() => doActions(item, action, index)}>
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
      ))}
    </View>
  );
};

export default AppCrudActionButton;
