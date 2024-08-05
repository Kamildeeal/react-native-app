import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import tw from '../twrnc';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import PaymentScreen from './screens/PaymentScreen';
import TabNavigator from './navigators/TabNavigator';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

//add splash screen

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
