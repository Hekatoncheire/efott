import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Pressable, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext, useState } from 'react';
import { supabase } from '../lib/supabase_config';
import { useFonts } from 'expo-font'
import AuthContext from '../lib/AuthContext';

export default function RegistrationScreen({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [aszf, setAszf] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loaded] = useFonts({
        'Jost': require('../assets/fonts/Jost-VariableFont_wght.ttf'),
    });
    const { session } = useContext(AuthContext);

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
    async function signUpWithEmail() {
        if (email != '' && password != '') {
            setLoading(true)
            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })

            if (error) {
                Alert.alert(error.message)
            }
            else {
                Alert.alert("Sikeres regisztráció")
                signInWithEmail();
            }
            setLoading(false)
        }
        return;
    }
    async function updateProfile({
        username,
    }: {
        username: string
    }) {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                username,
            }

            let { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
            else {
                Alert.alert("Profil sikeresen frissítve")
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

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
                <Text style={styles.headerText}>Regisztráció</Text>
                <Text style={styles.labelText}>
                    Név
                </Text>
                <View style={[styles.inputContainer]}>
                    <Ionicons name='ios-person-outline' color='white' size={28} style={{ marginRight: '5%' }} />
                    <TextInput
                        onChangeText={(text) => setName(text)}
                        value={name}
                        placeholder="Kis Pista"
                        autoCapitalize={'none'} autoComplete={undefined}
                        autoCorrect={false}
                        placeholderTextColor='white' />
                </View>
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                    <View>
                        <Text style={{ width: 150, textAlign: 'center', color: 'white', fontFamily: 'Jost', fontSize: 20 }}>Belépés mint</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '5%' }}>
                    <Pressable>
                        <Ionicons name='logo-google' size={38} color='white' />
                    </Pressable>
                    <Pressable>
                        <Ionicons name='logo-facebook' size={38} color='white' />
                    </Pressable>
                    <Pressable>
                        <Ionicons name='logo-apple' size={38} color='white' />
                    </Pressable>
                </View>
                <Pressable style={{ alignItems: 'center' }} onPress={() => { signUpWithEmail(); }} disabled={loading}>
                    <View style={styles.loginButton}>
                        <Text style={styles.buttonText}>Regisztráció</Text>
                    </View>
                </Pressable>
                <View style={styles.textView}>
                    <Pressable onPress={() => { navigation.navigate('Bejelentkezés') }}>
                        <Text style={styles.clickableText}>Már van fiókod? Belépés</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    loginContainer: {
        backgroundColor: '#612A7A',
        height: '72.5%',
        width: '93%',
        marginTop: '25%',
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
        marginTop: '5%',
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