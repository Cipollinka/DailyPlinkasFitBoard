import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function WeekDays({ days, selectedDate, onDayPress }) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysRow}
        >
            {days.map(d => (
                <TouchableOpacity
                    key={d.key}
                    style={[
                        styles.dayBox,
                        d.key === selectedDate && styles.activeDay,
                    ]}
                    onPress={() => onDayPress(d.key)}
                >
                    <Text style={styles.dayDate}>{d.date}</Text>
                    <Text style={styles.dayLabel}>{d.label}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    daysRow: { paddingHorizontal: 6 },
    dayBox: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#043182',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeDay: { backgroundColor: '#FB0A75' },
    dayDate: {
        color: '#FFFFFF',
        fontFamily: 'Fredoka',
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 4,
    },
    dayLabel: {
        color: '#FFFFFF',
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 12,
    },
});
