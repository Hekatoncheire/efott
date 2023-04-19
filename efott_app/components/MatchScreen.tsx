import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Alert, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font'
import AuthContext from '../lib/AuthContext';
import { supabase } from '../lib/supabase_config';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './ChatScreen';
import { LinearGradient } from 'expo-linear-gradient';
export default function MatchScreen() {
    const { session } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);

    const Stack = createStackNavigator();

    useEffect(() => {
        if (session) {
            getMatches();
        }
    }, [session])

    async function getMatches() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            let { data, error, status } = await supabase.from('matches').select('*')

            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setMatches(data)
            }

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(true)
        }
    }

    function MatchesComponent() {
        return (
            <LinearGradient colors={['#E86B3E', '#612A7A']} start={{ x: 0.4, y: 0 }} locations={[0.3, 0.85]} style={styles.container}>
                {matches.map((match) => (
                    <View>
                        <View>
                            <Image />
                            <View>
                                <Text>{match.id}</Text>
                                <Text></Text>
                            </View>
                        </View>
                    </View>
                ))}
            </LinearGradient>
        )
    }
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Párjaim' component={MatchesComponent} />
            <Stack.Screen name='Üzenetek' component={ChatScreen} />
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        paddingTop: '20%',
        paddingHorizontal: '5%',
        paddingBottom: '50%'
    }

})