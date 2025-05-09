import React from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import TimeSVG from '../assets/calendar/TimeSVG';

export default function CreateTaskForm({
    title,
    timeRange,
    duration,
    onChangeTitle,
    onChangeTimeRange,
    onChangeDuration,
    onSubmit,
    disabled,
}) {
    return (
        <View style={styles.form}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Task Title"
                    placeholderTextColor="#FFFFFF80"
                    value={title}
                    onChangeText={onChangeTitle}
                />
            </View>
            <View style={{ height: 16 }} />
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { paddingRight: 40 }]}
                    placeholder="Time"
                    placeholderTextColor="#FFFFFF80"
                    value={timeRange}
                    onChangeText={onChangeTimeRange}
                />
                <TimeSVG style={styles.iconInside} />
            </View>
            <View style={{ height: 16 }} />
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { paddingRight: 40 }]}
                    placeholder="Duration"
                    placeholderTextColor="#FFFFFF80"
                    keyboardType="numeric"
                    value={duration}
                    onChangeText={onChangeDuration}
                />
                <Text style={[styles.iconInside, styles.minInside]}>min</Text>
            </View>
            <View style={{ height: 16 }} />
            <TouchableOpacity
                style={[styles.setButton, disabled && styles.setDisabled]}
                onPress={onSubmit}
                disabled={disabled}
            >
                <Text style={styles.setText}>Set</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#FFBA4A',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
    },
    inputContainer: { position: 'relative' },
    input: {
        backgroundColor: '#F79900',
        borderRadius: 12,
        padding: 16,
        color: '#FFFFFF',
        fontFamily: 'Fredoka',
        fontWeight: '300',
        fontSize: 16,
    },
    iconInside: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    minInside: {
        color: '#FFFFFF',
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 16,
    },
    setButton: {
        backgroundColor: '#FB0A75',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    setDisabled: { opacity: 0.5 },
    setText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
});
