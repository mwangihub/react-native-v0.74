
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuthContext } from '@/context/authContext';

export function SplashScreen({ navigation }) {
    const { signIn, signOut, session, isLoading } = useAuthContext();
    return (
        <ThemedView style={styles.container}>
            <ThemedText >Loading...</ThemedText>
            <ActivityIndicator size="large" />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        padding: 30,
        backgroundColor: 'lightblue',
    },
    textStyles: {
        fontSize: 25,
        margin: 20,
        color: 'blue'
    },
    textLoad: {
        fontSize: 25,
        margin: 20,
        color: "red"
    }
});
