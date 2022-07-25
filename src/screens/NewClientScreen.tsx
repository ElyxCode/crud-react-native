import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';

import {useForm} from '../hooks/useForm';
import {UserFormData} from '../interface/UserFormData';
import globalStyles from '../styles/globalStyles';
import {createClient} from '../api/createClient';
import {RootStackParams} from '../navigator/StackNavigator';
import {updateClient} from '../api/updateClient';

interface Props extends StackScreenProps<RootStackParams, 'NewClientScreen'> {}

export const NewClientScreen = ({route, navigation}: Props) => {
  const {setApiCalled} = route.params;
  const {item} = route.params;

  const [visible, setVisible] = useState<boolean>(false);
  const {id, name, phone, email, business, setFormValue, onChange} =
    useForm<UserFormData>({
      name: '',
      phone: '',
      email: '',
      business: '',
    });

  useEffect(() => {
    if (item != null || item != undefined) {
      return setFormValue({
        id: item.id,
        name: item.name,
        phone: item.phone,
        email: item.email,
        business: item.business,
      });
    }
  }, []);

  const handleFormData = async ({
    name,
    phone,
    email,
    business,
  }: UserFormData) => {
    if ([name, phone, email, business].includes('')) {
      return setVisible(true);
    }

    if (route.params.item) {
      // Update client
      updateClient({id, name, phone, email, business});
    } else {
      // Generate client object
      const client = {name, phone, email, business};

      // API save database
      createClient(client);
    }

    // Clear Fields
    clearFields();

    //redirect
    navigation.navigate('HomeScreen' as any);

    // Change true for call api
    setApiCalled(true);
  };

  const clearFields = () => {
    setFormValue({
      name: '',
      phone: '',
      email: '',
      business: '',
    });
  };

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>
        {item ? 'Edit client' : 'Add New Client'}
      </Headline>

      <TextInput
        style={styles.input}
        label="Name"
        placeholder="pepito"
        onChangeText={value => onChange(value, 'name')}
        value={name}
      />
      <TextInput
        style={styles.input}
        label="Phone"
        placeholder="77777777"
        keyboardType="numeric"
        onChangeText={value => onChange(value, 'phone')}
        value={phone}
      />
      <TextInput
        style={styles.input}
        label="Email"
        placeholder="email@email.com"
        keyboardType="email-address"
        onChangeText={value => onChange(value, 'email')}
        value={email}
      />
      <TextInput
        style={styles.input}
        label="Business"
        placeholder="things S.A"
        onChangeText={value => onChange(value, 'business')}
        value={business}
      />

      <Button
        onPress={() => handleFormData({name, phone, email, business})}
        icon="pencil-circle"
        mode="contained">
        Save item
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>CRUD Native</Dialog.Title>
          <Dialog.Content>
            <Paragraph>All fields are required</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});
