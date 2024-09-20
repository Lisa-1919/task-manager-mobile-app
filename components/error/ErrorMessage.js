import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ErrorMessage = ({ message }) => {
    if (!message) return null; 

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f8d7da',
        borderRadius: 5,
    },
    text: {
        color: '#721c24',
    },
});

export default ErrorMessage;
