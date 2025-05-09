import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import CalendarSVG from '../assets/calendar/CalendarSVG';
import EditSVG from '../assets/calendar/EditSVG';
import notifyImg from '../assets/calendar/notify.png';

export default function DateHeader({
    dateLabel,
    onCalendarToggle,
    onFormToggle,
    showGuide,
    imagesEnabled,
}) {
    return (
        <View style={styles.todayRow}>
            <TouchableOpacity style={styles.todayLabel} onPress={onCalendarToggle}>
                <CalendarSVG />
                <Text style={styles.todayText}>{dateLabel}</Text>
            </TouchableOpacity>
            <View style={styles.editWrap}>
                <TouchableOpacity style={styles.editButton} onPress={onFormToggle}>
                    <EditSVG />
                </TouchableOpacity>
                {showGuide && imagesEnabled && (
                    <Image source={notifyImg} style={styles.notify} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    todayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    todayLabel: { flexDirection: 'row', alignItems: 'center' },
    todayText: { color: '#FFFFFF', fontSize: 16, marginLeft: 12 },
    editWrap: { position: 'relative' },
    editButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FFBA4A',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notify: {
        position: 'absolute',
        top: 44,
        right: -10,
        width: 230,
        height: 35,
        resizeMode: 'contain',
        zIndex: 2,
    },
});
