import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Alert, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font'
import AuthContext from '../lib/AuthContext';
import { supabase } from '../lib/supabase_config';

export default function ChatScreen (){
    return(
        <View>
            <Text>Messages</Text>
        </View>
    )
}