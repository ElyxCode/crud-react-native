import React, {useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import {List, Headline, Button, FAB} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';

import {getClients} from '../api/getClients';
import {UserFormData} from '../interface/UserFormData';
import {RootStackParams} from '../navigator/StackNavigator';
import {useFocusEffect} from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const [dataClients, setDataClients] = useState<UserFormData[]>([]);
  const [apiCalled, setApiCalled] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      if (apiCalled) {
        const getDataClients = async () => {
          const data = await getClients();
          setApiCalled(false);

          if (data != null) {
            console.log('entre en el if effect');
            setDataClients(data);
          }
        };

        getDataClients();
      }
    }, [apiCalled]),
  );

  console.log('in the state', dataClients);

  return (
    <View style={globalStyles.container}>
      <Button
        icon="plus-circle"
        onPress={() =>
          navigation.navigate(
            'NewClientScreen' as never,
            {setApiCalled} as never,
          )
        }>
        New client
      </Button>

      <Headline style={globalStyles.title}>
        {dataClients.length > 0 ? 'Clients' : 'No Clients'}
      </Headline>

      <FlatList
        data={dataClients}
        keyExtractor={({id}) => id!.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.name}
            description={item.business}
            onPress={() =>
              navigation.navigate(
                'ClientDetailsScreen' as never,
                {item, setApiCalled} as never,
              )
            }
          />
        )}
      />

      <FAB
        style={globalStyles.fab}
        icon="plus"
        onPress={() =>
          navigation.navigate(
            'NewClientScreen' as never,
            {setApiCalled} as never,
          )
        }
      />
    </View>
  );
};
