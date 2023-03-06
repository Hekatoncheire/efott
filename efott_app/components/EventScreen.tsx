import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { supabase } from '../lib/supabase_config';
import { Session } from '@supabase/supabase-js';

export default function EventScreen({session}: {session: Session}) {
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        if (session) {
            getEvents();
        }
    }, [session])

    async function getEvents() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            let { data, error, status } = await supabase
                .from('events')
                .select(`artist, day, time, stage`)
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                console.log(data)
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