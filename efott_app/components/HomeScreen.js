import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from '@react-native-material/core';
import Ionicons from '@expo/vector-icons/Ionicons'

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Events featured by All/In Festival</Text>
            <View style={[styles.container, styles.eventContainer]}>
                <View style={styles.eventButton}>
                    <Text>Valmar</Text>
                    <Text>22:00-22:30</Text>
                </View>
                <Divider color='gray' />
                <View style={styles.eventButton}>
                    <Text>Valmar</Text>
                    <Text>22:00-22:30</Text>
                </View>
                <Divider color='gray' />
                <View style={styles.eventButton}>
                    <Text>Valmar</Text>
                    <Text>22:00-22:30</Text>
                </View>
                <Divider color='gray' />
                <View style={styles.eventButton}>
                    <Text>Valmar</Text>
                    <Text>22:00-22:30</Text>
                </View>
                <Divider color='gray' />
                <View style={styles.loadMoreButton}>
                    <Ionicons color='black' name='ios-reload' size= '25'></Ionicons>
                    <Text style={styles.loadMoreText}>Load more events...</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: '10%'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    eventContainer: {
        backgroundColor: 'white',
        height: '80%',
        marginTop: '10%',
        borderRadius: 25,
        shadowColor: 'gray',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.3
    },
    eventButton: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginTop: '10%'
    },
    loadMoreText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loadMoreButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '10%',
        marginHorizontal: '10%'
    }
})