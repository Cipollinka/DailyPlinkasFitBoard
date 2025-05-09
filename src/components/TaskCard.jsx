import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import CheckboxSVG from '../assets/todo/CheckboxSVG';
import ActiveCheckboxSVG from '../assets/todo/ActiveCheckboxSVG';

export default function TaskCard({ task, onToggle, onLongPress }) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onToggle(task.id)}
            onLongPress={() => onLongPress(task.id)}
        >
            {task.completed ? <ActiveCheckboxSVG /> : <CheckboxSVG />}
            <View style={styles.wrap}>
                <View style={styles.header}>
                    <Text style={[styles.title, task.completed && styles.completed]}>
                        {task.title}
                    </Text>
                    <Text style={[styles.time, task.completed && styles.completed]}>
                        {task.timeRange}
                    </Text>
                </View>
                <Text style={styles.duration}>{task.duration} min</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFBA4A',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
    },
    wrap: { flex: 1, marginLeft: 8 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    time: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 14,
        color: '#FFFFFF',
    },
    duration: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 13,
        color: '#000000',
        marginTop: 2,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#FB0A75',
    },
});
