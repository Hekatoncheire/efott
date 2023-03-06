import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font'
import { supabase } from '../lib/supabase_config';

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Pressable onPress={async () => await supabase.auth.signOut()}>
                <Text>Kijelentkezés</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})