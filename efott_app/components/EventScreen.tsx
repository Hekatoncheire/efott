import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { supabase } from '../lib/supabase_config';
import AuthContext from '../lib/AuthContext';

type Event = {
    id: number,
    artist: string
}

export default function EventScreen() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true)
    const { session } = useContext(AuthContext);
    const [loaded] = useFonts({
        'Jost': require('../assets/fonts/Jost-VariableFont_wght.ttf'),
    });

    useEffect(() => {
        if (session) {
            getEvents();
        }
    }, [session])

    if (!loaded) {
        return null
    }

    async function getEvents() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            let { data, error } = await supabase
                .from('events')
                .select('*')
            if (error) {
                throw error
            }
            if (data) {
                setEvents(data)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(true)
        }
    }

    return (
        <ImageBackground source={require('../assets/event_background.png')} style={{ height: '100%', width: '100%' }}>
            <View style={styles.eventColumn}>
                {events.map((item) => (
                    <View key={item.id}>
                        <Text >{item.artist}</Text>
                    </View>
                ))}
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    eventColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})