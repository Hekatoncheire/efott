"use strict";
exports.__esModule = true;
var React = require("react");
var HomeScreen_1 = require("./components/HomeScreen");
var native_1 = require("@react-navigation/native");
var native_stack_1 = require("@react-navigation/native-stack");
var EventScreen_1 = require("./components/EventScreen");
var SwipeScreen_1 = require("./components/SwipeScreen");
var MapScreen_1 = require("./components/MapScreen");
var SettingsScreen_1 = require("./components/SettingsScreen");
var Stack = (0, native_stack_1.createNativeStackNavigator)();
function App() {
    return (<native_1.NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Kezdőlap' component={HomeScreen_1["default"]} options={{ headerShown: false }}/>
        <Stack.Screen name='Események' component={EventScreen_1["default"]} options={{
            headerStyle: { backgroundColor: '#E86B3E' },
            headerBackTitle: 'Vissza',
            headerLargeTitleStyle: { color: 'white', fontFamily: 'Jost', fontWeight: 'bold' }, headerBackTitleStyle: { fontFamily: 'Jost' }, headerTintColor: 'white', headerLargeTitle: true
        }}/>
          <Stack.Screen name='iN/Touch' component={SwipeScreen_1["default"]} options={{
            headerStyle: { backgroundColor: '#E86B3E' },
            headerBackTitle: 'Vissza',
            headerLargeTitleStyle: { color: 'white', fontFamily: 'Jost', fontWeight: 'bold' }, headerBackTitleStyle: { fontFamily: 'Jost' }, headerTintColor: 'white', headerLargeTitle: true
        }}/>
            <Stack.Screen name='Térkép' component={MapScreen_1["default"]} options={{
            headerStyle: { backgroundColor: '#E86B3E' },
            headerBackTitle: 'Vissza',
            headerLargeTitleStyle: { color: 'white', fontFamily: 'Jost', fontWeight: 'bold' }, headerBackTitleStyle: { fontFamily: 'Jost' }, headerTintColor: 'white', headerLargeTitle: true
        }}/>
            <Stack.Screen name='Beállítások' component={SettingsScreen_1["default"]} options={{
            headerStyle: { backgroundColor: '#E86B3E' },
            headerBackTitle: 'Vissza',
            headerLargeTitleStyle: { color: 'white', fontFamily: 'Jost', fontWeight: 'bold' }, headerBackTitleStyle: { fontFamily: 'Jost' }, headerTintColor: 'white', headerLargeTitle: true
        }}/>
      </Stack.Navigator>
    </native_1.NavigationContainer>);
}
exports["default"] = App;
