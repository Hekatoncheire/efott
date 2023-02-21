import { Text, View } from 'react-native';
import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native' ;
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from '../efott_app/components/HomeScreen'

const Tab = createBottomTabNavigator();


function CalendarScreen(){
  return (
    <View>
      <Text>Calendar</Text>
    </View>
  )
}

function ConnectScreen(){
  return (
    <View>
      <Text>in/Touch</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
            } else if (route.name === 'in/Touch') {
              iconName = focused ? 'ios-people' : 'ios-people-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name='Home' component={HomeScreen}/>
        <Tab.Screen name='Calendar' component={CalendarScreen}/>
        <Tab.Screen name='in/Touch' component={ConnectScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
