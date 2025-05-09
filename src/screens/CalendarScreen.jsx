import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    ImageBackground,
    Image,
    Dimensions,
    Alert,
    StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import useImagesFlag from '../hooks/useImagesFlag';
import useDateLabel from '../hooks/useDateLabel';
import useConfirm from '../hooks/useConfirm';

import DateHeader from '../components/DateHeader';
import WeekDays from '../components/WeekDays';
import CreateTaskForm from '../components/CreateTaskForm';

import useWeekDays from '../hooks/useWeekDays';
import useMarkedDates from '../hooks/useMarkedDates';

import {
    addTask,
    toggleComplete,
    clearCompleted,
    uncompleteAll,
    deleteTasks,
} from '../store/slices/tasksSlice';

import girlImg from '../assets/calendar/girl.png';

const bg = require('../assets/bg.png');
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CalendarScreen() {
    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);

    const [selectedDate, setSelectedDate] = useState(todayKey);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [timeRange, setTimeRange] = useState('');
    const [duration, setDuration] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);

    const [imagesEnabled, disableImages] = useImagesFlag();
    const dateLabel = useDateLabel(selectedDate);
    const confirm = useConfirm();
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const parentNav = navigation.getParent();

    const tasksForDate = tasks.filter(t => t.date === selectedDate);
    const showGuide = tasksForDate.length === 0 && !showForm;

    useEffect(() => {
        return navigation.addListener('beforeRemove', e => {
            if (!selectedIds.length) {return;}
            e.preventDefault();
            Alert.alert(
                'Delete Task?',
                'Are you sure you want to delete these tasks?',
                [
                    {
                        text: 'Cancel', style: 'cancel',
                        onPress: () => {
                            dispatch(uncompleteAll());
                            navigation.dispatch(e.data.action);
                        },
                    },
                    {
                        text: 'Delete', style: 'destructive',
                        onPress: () => {
                            dispatch(clearCompleted());
                            navigation.dispatch(e.data.action);
                        },
                    },
                ]
            );
        });
    }, [navigation, selectedIds, dispatch]);

    useEffect(() => {
        if (!parentNav) {return;}
        return parentNav.addListener('tabPress', e => {
            if (!isFocused || !selectedIds.length) {return;}
            e.preventDefault();
            Alert.alert(
                'Delete Task?',
                'Are you sure you want to delete these tasks?',
                [
                    {
                        text: 'Cancel', style: 'cancel',
                        onPress: () => {
                            dispatch(uncompleteAll());
                            parentNav.dispatch({ ...e.data.action, target: e.target });
                        },
                    },
                    {
                        text: 'Delete', style: 'destructive',
                        onPress: () => {
                            dispatch(clearCompleted());
                            parentNav.dispatch({ ...e.data.action, target: e.target });
                        },
                    },
                ]
            );
        });
    }, [parentNav, isFocused, selectedIds, dispatch]);

    const onPress = action => () => {
        disableImages();
        action();
    };

    const handleSubmit = () => {
        dispatch(
            addTask({ date: selectedDate, title, timeRange, duration })
        );
        setTitle(''); setTimeRange(''); setDuration(''); setShowForm(false);
    };

    const days = useWeekDays(today);
    const markedDates = useMarkedDates(tasks, todayKey, selectedDate);

    return (
        <ImageBackground source={bg} style={styles.bg}>
            <SafeAreaView style={styles.safe}>
                <Header
                    title="Your FitBoard Journey"
                    subtitle="Tap a day to log your achievements, trainings, or notes!"
                />

                <View style={[styles.content, { marginTop: 162 }]}>
                    <DateHeader
                        dateLabel={dateLabel}
                        onCalendarToggle={onPress(() => {
                            setShowCalendar(v => !v);
                            setShowForm(false);
                        })}
                        onFormToggle={onPress(() => {
                            setShowForm(v => !v);
                            setShowCalendar(false);
                        })}
                        showGuide={showGuide}
                        imagesEnabled={imagesEnabled}
                    />

                    {showCalendar && (
                        <>
                            <Calendar
                                markingType="custom"
                                markedDates={markedDates}
                                onDayPress={day => {
                                    setSelectedDate(day.dateString);
                                    setShowCalendar(false);
                                }}
                                style={styles.calendar}
                                theme={{
                                    backgroundColor: '#043182',
                                    calendarBackground: '#043182',
                                    textSectionTitleColor: '#FFFFFF',
                                    monthTextColor: '#FFFFFF',
                                    arrowColor: '#FFFFFF',
                                    todayTextColor: '#FB0A75',
                                    dayTextColor: '#FFFFFF',
                                    textDisabledColor: '#666666',
                                }}
                            />
                            <View style={{ height: 16 }} />
                        </>
                    )}

                    <WeekDays
                        days={days}
                        selectedDate={selectedDate}
                        onDayPress={key => {
                            setSelectedDate(key);
                            setShowForm(false);
                        }}
                    />

                    {showForm && (
                        <CreateTaskForm
                            title={title}
                            timeRange={timeRange}
                            duration={duration}
                            onChangeTitle={setTitle}
                            onChangeTimeRange={setTimeRange}
                            onChangeDuration={setDuration}
                            onSubmit={handleSubmit}
                            disabled={!(title && timeRange && duration)}
                        />
                    )}

                    {!showForm && tasksForDate.length > 0 && (
                        <View style={{ marginTop: 16 }}>
                            {tasksForDate.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onToggle={() => dispatch(toggleComplete(task.id))}
                                    onLongPress={() =>
                                        task.completed &&
                                        confirm(
                                            {
                                                title: 'Delete Task?',
                                                message: 'Are you sure you want to delete this task?',
                                                confirmText: 'Delete',
                                                cancelText: 'Cancel',
                                            },
                                            () => dispatch(deleteTasks([task.id]))
                                        )
                                    }
                                />
                            ))}
                        </View>
                    )}
                </View>

                {showGuide && imagesEnabled && (
                    <Image
                        source={girlImg}
                        style={[
                            styles.girl,
                            {
                                width: SCREEN_WIDTH - 28,
                                aspectRatio:
                                    Image.resolveAssetSource(girlImg).width /
                                    Image.resolveAssetSource(girlImg).height,
                            },
                        ]}
                    />
                )}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1, backgroundColor: '#3B4CCA' },
    safe: { flex: 1 },
    content: { paddingHorizontal: 24, paddingBottom: 16 },
    calendar: { borderRadius: 12 },
    girl: {
        position: 'absolute',
        left: 14,
        bottom: -60,
        resizeMode: 'contain',
    },
});
