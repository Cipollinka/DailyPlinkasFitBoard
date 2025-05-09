import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function EditorSection({ value, onChange, onSubmit }) {
    const canSubmit = !!value.trim();
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Task Title"
                placeholderTextColor="#FFFFFF80"
                value={value}
                onChangeText={onChange}
            />
            <TouchableOpacity
                style={[styles.button, canSubmit && styles.buttonActive]}
                disabled={!canSubmit}
                onPress={onSubmit}
            >
                <Text style={styles.buttonText}>Set</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFBA4A',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#F79900',
        borderRadius: 12,
        padding: 16,
        fontFamily: 'Fredoka',
        fontWeight: '300',
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#FF80B8',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: '#FB0A75',
    },
    buttonText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
});
