import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme} from 'react-native-paper';
import {Provider as PaperProvider} from 'react-native-paper';

import {HomeScreen} from '../screens/HomeScreen';
import {NewClientScreen} from '../screens/NewClientScreen';
import {ClientDetailsScreen} from '../screens/ClientDetailsScreen';
import {UserFormData} from '../interface/UserFormData';
// import { TopBar } from '../components/ui/TopBar';

export type RootStackParams = {
  HomeScreen: undefined;
  NewClientScreen: {
    setApiCalled: React.Dispatch<React.SetStateAction<boolean>>;
    item: UserFormData;
  };
  ClientDetailsScreen: {
    setApiCalled: React.Dispatch<React.SetStateAction<boolean>>;
    item: UserFormData;
  };
};

const Stack = createStackNavigator<RootStackParams>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF',
  },
};

export const StackNavigator = () => {
  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({navigation, route}) => ({
            headerTitleAlign: 'center',
            // headerLeft: props => (
            //   <TopBar {...props} navigation={navigation} route={route} />
            // ),
          })}
        />

        <Stack.Screen
          name="NewClientScreen"
          component={NewClientScreen}
          options={{title: 'New Client'}}
        />

        <Stack.Screen
          name="ClientDetailsScreen"
          component={ClientDetailsScreen}
          options={{title: 'Client Details'}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
};
