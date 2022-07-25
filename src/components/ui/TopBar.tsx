import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Button} from 'react-native-paper';

export const TopBar = ({navigation, route}: any) => {
  //console.log(route);
  const handlePress = () => {
    navigation.navigate('NewClientScreen');
  };

  return (
    <View style={styles.container}>
      <Button
        icon="plus-circle-outline"
        color="#FFF"
        onPress={() => handlePress()}>
        Client
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
});
