import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import EditSVG from '../assets/calendar/EditSVG';

export default function PersonCard({ person, onPress, onLongPress }) {
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            delayLongPress={500}
            style={({ pressed }) => [
                styles.card,
                pressed && { opacity: 0.6 },
            ]}
        >
            <View style={styles.header}>
                <Text style={styles.name}>{person.name}</Text>
                <EditSVG />
            </View>
            <Text style={styles.role}>{person.role}</Text>
            <Text style={styles.note}>{person.note}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFBA4A',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    name: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 18,
        color: '#FFFFFF',
    },
    role: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 14,
        color: '#000000',
        marginBottom: 10,
    },
    note: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 14,
        color: '#00000080',
    },
});
