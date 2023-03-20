import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { supabase } from '../lib/supabase_config';
import AuthContext from '../lib/AuthContext';



export default function EventScreen() {
    const [events, setEvents] = useState([]);
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

            let { data, error, status } = await supabase.from('events').select('*')
            if (error && status !== 406) {
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
        <ImageBackground source={require('../assets/event_background.png')} style={{ height: '100%', width: '100%', paddingTop: 175, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <ScrollView>
                {events.map((item) => (
                    <View key={item.id} style={styles.eventContainer}>
                        <ImageBackground source={require('../assets/Paralelogramma.png')} style={styles.imageBackground}>
                            <View style={styles.eventTextContainer}>
                                <Text style={styles.eventName}>{item.name}</Text>
                                <Text style={styles.eventStage}>{item.stage}</Text>
                            </View>
                            <View>
                                <Text style={styles.eventTime}>{item.time}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                ))}
            </ScrollView>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    eventColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        marginBottom: '2.5%'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    eventName: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Jost',
        fontWeight: 'bold',
    },
    eventStage: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Jost',
        marginVertical: '2.5%'
    },
    eventTextContainer: {
        paddingLeft: '5%',
        paddingVertical: '2.5%',
        width: '67%'
    },
    eventTime:{
        fontSize: 16,
        color: 'white',
        fontFamily: 'Jost',
        fontWeight: 'bold',
        paddingRight: '10%'
    }
})