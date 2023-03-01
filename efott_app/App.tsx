import * as React from 'react';
import HomeScreen from './components/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventScreen from './components/EventScreen';
import SwipeScreen from './components/SwipeScreen';
import MapScreen from './components/MapScreen';
import SettingsScreen from './components/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Kezdőlap'
          component={HomeScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='Események'
          component={EventScreen}
          options={
            {
              headerStyle: { backgroundColor: '#E86B3E' },
              headerBackTitle: 'Vissza',
              headerLargeTitleStyle: { color: 'white', fontFamily: 'Jost', fontWeight: 'bold' }, headerBackTitleStyle: { fontFamily: 'Jost' }, headerTintColor: 'white', headerLargeTitle: true
            }
          }/>
          <Stack.Screen
            name='iN/Touch'
            component={SwipeScreen}
            options={
              {
                headerStyle: { backgroundColor: '#E86B3E' },
                headerBackTitle: 'Vissza',
                headerLargeTitleStyle: { color: 'white', fontFamily: 'Jost', fontWeight: 'bold' }, headerBackTitleStyle: { fontFamily: 'Jost' }, headerTintColor: 'white', headerLargeTitle: true
              }
            }/>
            <Stack.Screen
            name='Térkép'
            component={MapScreen}
            options={
              {
                headerStyle: { backgroundColor: '#E86B3E' },
                headerBackTitle: 'Vissza',
                headerLargeTitleStyle: { color: 'white', fontFamily: 'Jost', fontWeight: 'bold' }, headerBackTitleStyle: { fontFamily: 'Jost' }, headerTintColor: 'white', headerLargeTitle: true
              }
            }/>
            <Stack.Screen
            name='Beállítások'
            component={SettingsScreen}
            options={
              {
                headerStyle: { backgroundColor: '#E86B3E' },
                headerBackTitle: 'Vissza',
                headerLargeTitleStyle: { color: 'white', fontFamily: 'Jost', fontWeight: 'bold' }, headerBackTitleStyle: { fontFamily: 'Jost' }, headerTintColor: 'white', headerLargeTitle: true
              }
            }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
