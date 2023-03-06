import * as React from 'react';
import { useCallback, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Pressable, Linking, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font'
import { Session } from '@supabase/supabase-js';
import LoginScreen from './LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationScreen from './RegistrationScreen';
import AuthContext from '../AuthContext';

export default function HomeScreen({ navigation}: { navigation: any, session: Session }) {
    const { session } = useContext(AuthContext);
    const [loaded] = useFonts({
        'Jost': require('../assets/fonts/Jost-VariableFont_wght.ttf'),
    });
    if (!loaded) {
        return null
    }

    return (
        <View>
            <ImageBackground source={require('../assets/Post_image.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.column}>
                        <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('Események')}>
                            <View style={styles.button}>
                                <Ionicons name='ios-calendar-outline' size={100} color='white' />
                                <Text style={styles.buttonText}>Események</Text>
                            </View>
                        </Pressable>
                        <Image source={require('../assets/festival.png')} style={{ marginTop: '10%', width: '80%', borderRadius: 20 }} />
                        <OpenURLButton url='https://www.foodpanda.hu/?ef_id=Y-8bFwAAAI6CCgXD:20230301094521:s' />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.headerText}>HOME</Text>
                        <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('iN/Touch')}>
                            <View style={styles.button}>
                                <Ionicons name='ios-people-outline' size={100} color='white' />
                                <Text style={styles.buttonText}>iN/Touch</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('Térkép')}>
                            <View style={styles.button}>
                                <Ionicons name='ios-map-outline' size={100} color='white' />
                                <Text style={styles.buttonText}>Térkép</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('Beállítások')}>
                            <View style={styles.button}>
                                <Ionicons name='ios-settings-outline' size={100} color='white' />
                                <Text style={styles.buttonText}>Beállítások</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const OpenURLButton = ({ url }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <Pressable style={styles.buttonContainer} onPress={handlePress}>
        <View style={styles.button}>
            <Ionicons name='ios-basket-outline' size={100} color='white' />
            <Text style={styles.buttonText}>Rendelés</Text>
        </View>
    </Pressable>
};

const styles = StyleSheet.create({
    container: {
        paddingTop: '5%',
        paddingBottom: '20%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '20%'
    },
    buttonContainer: {
        height: '24.5%',
        marginTop: '10%',
        width: '80%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(97,42,122,0.95)',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 3
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Jost',
        fontWeight: '900'
    },
    headerText: {
        color: 'white',
        fontSize: 40,
        fontFamily: 'Jost',
        fontWeight: '900'
    },
    button: {
        height: '24.5%',
        marginTop: '10%',
        width: '80%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})