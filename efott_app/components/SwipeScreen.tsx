import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Alert, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font'
import AuthContext from '../lib/AuthContext';
import { supabase } from '../lib/supabase_config';
import Swiper from 'react-native-deck-swiper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatchScreen from './MatchScreen';

export default function SwipeScreen() {
    const { session } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const Tab = createBottomTabNavigator();

    useEffect(() => {
        if (session) {
            getUsers();
        }
    }, [session])

    async function getUsers() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            let { data, error, status } = await supabase.from('profiles').select('*')

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
    function SwipeComponent () {
        return (
            <ImageBackground source={require('../assets/event_background.png')} style={{ height: '150%', width: '100%', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '50%' }}>
            <Swiper
                cards={users}
                renderCard={(card) => {
                    if (!card) {
                        return <View><Text>Loading...</Text></View>;
                    }
                    return (
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingLeft: '20%'
                        }}>
                            <Text style={styles.cardTitle}>{card.username}</Text>
                            <Image source={require('../assets/festival.png')} style={{ height: 300, width: 300, resizeMode: 'cover' }} onError={(e) => console.log(e)} />
                        </View>
                    );
                }}
                verticalSwipe={false}
                onSwipedAll={() => { }}
                onSwipedLeft={() => { }}
                onSwipedRight={() => { }}
                onTapCard={() => { }}
                containerStyle={styles.swipeCard}
                cardStyle={styles.swiperCard}
            />
        </ImageBackground>
        )
    }
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: '#612A7A'}}}>
            <Tab.Screen name='IN/TOUCH' component={SwipeComponent}/>
            <Tab.Screen name='Párok' component={MatchScreen}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    swipeCard: {
        backgroundColor: 'rgba(97,42,122,0.9)',
        height: 420,
        width: '90%',
        marginTop: '20%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '25%',
        marginLeft: '5%',
        position: 'absolute',
        zIndex: 0
    },
    cardTitle: {
        color: 'white',
        fontFamily: 'Jost',
        fontSize: 26,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: '5%'
    },
    swiperCard: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: '10%',
        alignItems: 'center',
        zIndex: 1
    },
    button: {
        height: 75,
        marginTop: '75%',
        marginHorizontal: '5%',
        width: 500,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(97,42,122,0.95)',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 3
    }
})


