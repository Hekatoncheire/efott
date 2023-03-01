import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font'

export default function EventScreen() {
    return (
        <ImageBackground source={require('../assets/event_background.png')} style={{height: '100%', width: '100%'}}>
            <View style={styles.eventColumn}>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    eventColumn: {
        flex: 1
    }
})