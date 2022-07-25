import 'react-native-gesture-handler';
import React from 'react';

import {CrudApp} from './src/CrudApp';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <CrudApp />
    </NavigationContainer>
  );
};

export default App;
