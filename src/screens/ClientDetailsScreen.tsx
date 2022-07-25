import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, Headline, Subheading, Button, FAB} from 'react-native-paper';

import {RootStackParams} from '../navigator/StackNavigator';
import {deleteClient} from '../api/deleteClient';
import globalStyles from '../styles/globalStyles';

interface Props
  extends StackScreenProps<RootStackParams, 'ClientDetailsScreen'> {}

export const ClientDetailsScreen = ({navigation, route}: Props) => {
  const {item} = route.params;
  const {setApiCalled} = route.params;

  const showConfirmation = () => {
    Alert.alert(
      'CRUD App',
      'Are you sure yo want to delete this client?\nThe client cannot be retrieved',
      [
        {text: 'Yes, Delete', onPress: () => deleteContact()},
        {text: 'Cancel', style: 'cancel'},
      ],
    );
  };

  const deleteContact = async () => {
    console.log('Delete...');
    const serviceResp = await deleteClient(item.id!);

    if (!serviceResp) {
      return Alert.alert('CRUD App', 'The client could not be deleted');
    }
    setApiCalled(true);
    navigation.navigate('HomeScreen' as never);
  };

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>{item.name}</Headline>
      <Text style={styles.text}>
        Business: <Subheading>{item.business}</Subheading>
      </Text>
      <Text style={styles.text}>
        Email: <Subheading>{item.email}</Subheading>
      </Text>
      <Text style={styles.text}>
        Phone: <Subheading>{item.phone}</Subheading>
      </Text>

      <Button
        style={styles.buttonDelete}
        mode="contained"
        icon="cancel"
        onPress={() => showConfirmation()}>
        Delete client
      </Button>

      <FAB
        style={globalStyles.fab}
        icon="pencil"
        onPress={() =>
          navigation.navigate(
            'NewClientScreen' as never,
            {item, setApiCalled} as never,
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
  buttonDelete: {
    marginTop: 100,
    backgroundColor: '#F00',
  },
});
