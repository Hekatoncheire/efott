import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Pressable, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font'
import { useState } from 'react';
import { supabase } from '../lib/supabase_config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function LoginScreen({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [loaded] = useFonts({
        'Jost': require('../assets/fonts/Jost-VariableFont_wght.ttf'),
    });
    if (!loaded) {
        return null
    }

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            Alert.alert(error.message)
        }
        else {
            Alert.alert("Sikeres bejelentkezés")
        }
        setLoading(false)
    }

    const Stack = createNativeStackNavigator();

    return (
        <ImageBackground
            source={require('../assets/login.png')}
            style={
                {
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    zIndex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }>
            <View style={styles.loginContainer}>
                <Text style={styles.headerText}>Bejelentkezés</Text>
                <Text style={styles.labelText}>
                    E-mail cím
                </Text>
                <View style={[styles.inputContainer]}>
                    <Ionicons name='ios-mail-outline' color='white' size={28} style={{ marginRight: '5%' }} />
                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="keresztnev.vezeteknev@bce.bitclub.com"
                        autoCapitalize={'none'} autoComplete={undefined}
                        autoCorrect={false}
                        placeholderTextColor='white' />
                </View>
                <Text style={styles.labelText}>
                    Jelszó
                </Text>
                <View style={[styles.inputContainer]}>
                    <Ionicons name='ios-key-outline' color='white' size={28} style={{ marginRight: '5%' }} />
                    <TextInput
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="#Bitizenvagyok420"
                        autoCapitalize={'none'} autoComplete={undefined}
                        autoCorrect={false}
                        placeholderTextColor='white' />
                </View>
                <Pressable style={{ alignItems: 'center' }} onPress={() => signInWithEmail()} disabled={loading}>
                    <View style={styles.loginButton}>
                        <Text style={styles.buttonText}>Belépés</Text>
                    </View>
                </Pressable>
                <View style={styles.textView}>
                    <Pressable onPress={() => { navigation.navigate('Regisztráció') }}>
                        <Text style={styles.clickableText}>Még nincs fiókod? Regisztráció</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>

    )
}



const styles = StyleSheet.create({
    loginContainer: {
        backgroundColor: '#612A7A',
        height: 467,
        width: 360,
        marginTop: '35%',
        paddingHorizontal: '5%',
        justifyContent: 'flex-start',
        paddingTop: '5%'
    },
    headerText: {
        fontSize: 36,
        fontFamily: 'Jost',
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '5%',
        textAlign: 'center'
    },
    labelText: {
        fontFamily: 'Jost',
        color: 'white',
        fontSize: 20,
        marginVertical: '2.5%'
    },
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderColor: 'white',
        borderWidth: 3,
        height: 50,
        marginBottom: '5%',
        width: '100%',
        padding: '2%',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 4,
            height: 5
        }
    },
    loginButton: {
        marginTop: '10%',
        backgroundColor: '#FEC001',
        width: '70%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 4
        }
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Jost',
        fontWeight: 'bold',
        fontSize: 34,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 4,
            height: 5
        }
    },
    textView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '5%'
    },
    clickableText: {
        textDecorationLine: 'underline',
        color: 'white',
        fontFamily: 'Jost'
    }
})