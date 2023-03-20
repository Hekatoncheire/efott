import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font'
import AuthContext from '../lib/AuthContext';
import { supabase } from '../lib/supabase_config';
import Swiper from 'react-native-deck-swiper';

export default function SwipeScreen() {
    const { session } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (session) {
            getUsers();
        }
    }, [session])

    async function getUsers() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            let { data, error, status } = await supabase.from('profiles').select('*').neq('id', session?.user.id)
            
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setUsers(data)
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
        <ImageBackground source={require('../assets/login.png')} style={{ height: '120%', width: '100%', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '30%' }}>
            <View style={styles.swipeCard}>
                <Text style={styles.cardTitle}>IN/TOUCH</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    swipeCard: {
        backgroundColor: 'rgba(97,42,122,0.9)',
        height: '67%',
        width: '90%',
        marginTop: '54%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5%'
    },
    cardTitle: {
        color: 'white',
        fontFamily: 'Jost',
        fontSize: 30
    }
})


