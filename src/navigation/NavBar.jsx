import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CalendarSVG from '../assets/navbar/CalendarSVG';
import TodoSVG from '../assets/navbar/TodoSVG';
import TeamsSVG from '../assets/navbar/TeamsSVG';
import GameSVG from '../assets/navbar/GameSVG';
import SettingsSVG from '../assets/navbar/SettingsSVG';

export default function NavBar({ state, navigation }) {
    const insets = useSafeAreaInsets();
    const bottomOffset = (insets.bottom || 0) + 8; 

    const tabs = [
        { name: 'Calendar', Icon: CalendarSVG },
        { name: 'Todo', Icon: TodoSVG },
        { name: 'Teams', Icon: TeamsSVG },
        { name: 'Game', Icon: GameSVG },
        { name: 'Settings', Icon: SettingsSVG },
    ];

    return (
        <View style={[styles.wrapper, { bottom: bottomOffset }]}>
            <View intensity={36} tint="light" style={styles.container}>
                {tabs.map((tab, idx) => {
                    const focused = state.index === idx;
                    return (
                        <TouchableOpacity
                            key={tab.name}
                            style={[styles.button, focused && styles.activeButton]}
                            onPress={() => navigation.navigate(tab.name)}
                        >
                            <tab.Icon fill={focused ? '#fff' : '#888'} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 24,
        right: 24,
        borderRadius: 12,
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#043182',
        padding: 4,
    },
    button: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    activeButton: {
        backgroundColor: '#FB0A75',
    },
});
