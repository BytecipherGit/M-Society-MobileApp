import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme';

const AppCrudActionButton = ({
  doActions = () => null,
  item = {},
  index,
  loaderIndex = '',
}) => {
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
            backgroundColor: COLORS.buttonColor,
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
                color: COLORS.white,
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
