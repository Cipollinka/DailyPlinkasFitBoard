import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PauseSVG from '../assets/game/PauseSVG';

export default function GameHeader({ seconds, totalCaught, onPause }) {
    const insets = useSafeAreaInsets();
    const minutes = Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    const formattedTime = `${minutes}:${secs}`;

    return (
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <Text style={styles.timerText}>{formattedTime}</Text>
            <Text style={styles.scoreText}>{totalCaught}</Text>
            <TouchableOpacity onPress={onPause}>
                <PauseSVG />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 138,
        backgroundColor: '#043182',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 3,
    },
    timerText: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 26,
        color: '#FFF',
    },
    scoreText: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 26,
        color: '#FFBA4A',
    },
});
