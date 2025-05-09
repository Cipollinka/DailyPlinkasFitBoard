import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import CheckboxSVG from '../assets/todo/CheckboxSVG';
import ActiveCheckboxSVG from '../assets/todo/ActiveCheckboxSVG';

export default function TaskItem({ task, onToggle, onDelete, style }) {
    return (
        <TouchableOpacity
            style={[styles.item, style]}
            onPress={() => onToggle(task.id)}
            onLongPress={() => {
                if (!task.completed) {return;}
                Alert.alert(
                    'Delete Task?',
                    'Are you sure you want to delete this task?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () => onDelete(task.id),
                        },
                    ]
                );
            }}
        >
            {task.completed ? <ActiveCheckboxSVG /> : <CheckboxSVG />}
            <Text
                style={[
                    styles.text,
                    task.completed && styles.textActive,
                    { marginLeft: 10 },
                ]}
            >
                {task.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFBA4A',
        borderRadius: 12,
        padding: 16,
    },
    text: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    textActive: {
        color: '#FB0A75',
        textDecorationLine: 'line-through',
    },
});
