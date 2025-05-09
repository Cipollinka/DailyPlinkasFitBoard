import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import EditSVG from '../assets/calendar/EditSVG';

export default function CollectionCard({ collection, onPress, onLongPress }) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.6}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{collection.name}</Text>
                <EditSVG />
            </View>
            <Text style={styles.count}>{collection.people.length} people</Text>
        </TouchableOpacity>
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
    title: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 18,
        color: '#FFFFFF',
    },
    count: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 13,
        color: '#000000',
    },
});
