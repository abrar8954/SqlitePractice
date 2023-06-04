

import React, { useState } from 'react';

import {

  Text,

  View,
} from 'react-native';
import FirstScreen from './components/FirstScreen';
import UserDetails from './components/UserDetails';
import MainScreen from './components/Card';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateScreen from './components/UpdateScreen';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <View style={{ flex: 1 }}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="UserDetails" component={UserDetails} />
          <Stack.Screen name="UpdateScreen" component={UpdateScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}



export default App;
