import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({ title, subtitle }) {
    const insets = useSafeAreaInsets();
    const HEADER_HEIGHT = insets.top + 138;
    return (
        <View style={[styles.header, { height: HEADER_HEIGHT }]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        backgroundColor: '#043182',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingTop: 24,
        paddingHorizontal: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 26,
        color: '#FFFFFF',
        marginBottom: 2,
    },
    subtitle: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
});
