import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import AddFileIcon from '../assets/images/AddFileIcon.svg';

const AppFilePicker = ({titleText, onPress = () => null}) => {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 2,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '1%',
        borderColor: '#DEDEDE',
        borderStyle: 'dashed',
      }}>
      <Menu
        visible={visible}
        style={{marginTop: '10%', marginLeft: '4%'}}
        anchor={
          <>
            <TouchableOpacity onPress={showMenu} style={{alignSelf: 'center'}}>
              <AddFileIcon />
            </TouchableOpacity>
            <Text>{titleText}</Text>
          </>
        }
        onRequestClose={hideMenu}>
        <FlatList
          data={['camera', 'gallery']}
          renderItem={({item, index}) => (
            <>
              <MenuItem
                onPress={() => {
                  hideMenu(),
                    setTimeout(() => {
                      onPress(item);
                    }, 500);
                }}>
                <Text style={{fontWeight: 'bold', color: 'grey'}}>
                  {' '}
                  Pick From {item?.toLocaleUpperCase()}
                </Text>
              </MenuItem>
              <MenuDivider />
            </>
          )}
        />
      </Menu>
    </View>
  );
};

export default AppFilePicker;
