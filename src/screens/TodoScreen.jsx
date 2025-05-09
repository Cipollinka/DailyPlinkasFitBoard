import React, { useState, useMemo, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector, useDispatch } from 'react-redux';

import CalendarSVG from '../assets/calendar/CalendarSVG';
import EditSVG from '../assets/calendar/EditSVG';
import girlImg from '../assets/todo/girl.png';
import notifyImg from '../assets/calendar/notify.png';

import {
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
} from '../store/slices/todoSlice';

import TaskItem from '../components/TaskItem';
import EditorSection from '../components/EditorSection';

const bg = require('../assets/bg.png');
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TodoScreen() {
    const insets = useSafeAreaInsets();
    const HEADER_CONTENT_HEIGHT = 138;
    const headerTotal = insets.top + HEADER_CONTENT_HEIGHT;

    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [hasOpenedEditor, setHasOpenedEditor] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.todos.items);

    useEffect(() => {
        dispatch(loadTodos());
    }, [dispatch]);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirmDate = d => {
        setDate(d);
        hideDatePicker();
    };

    const handleAddTask = () => {
        if (!taskTitle.trim()) {return;}
        dispatch(
            addTodo({
                id: Date.now().toString(),
                title: taskTitle.trim(),
                date: date.toISOString(),
                completed: false,
            })
        );
        setTaskTitle('');
        setIsEditing(false);
        setHasOpenedEditor(true);
    };

    const onToggle = id => dispatch(toggleTodo(id));
    const onDelete = id => dispatch(deleteTodo(id));

    const tasksByDate = useMemo(() => {
        const groups = {};
        tasks.forEach(t => {
            const dt = new Date(t.date);
            const key = dt.toLocaleString('en-US', {
                day: '2-digit',
                month: 'short',
            });
            if (!groups[key]) {groups[key] = [];}
            groups[key].push(t);
        });
        return groups;
    }, [tasks]);

    const todayKey = date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
    });
    const todayTasks = tasksByDate[todayKey] || [];
    const otherDates = Object.keys(tasksByDate)
        .filter(k => k !== todayKey)
        .sort((a, b) => parseInt(b) - parseInt(a));

    const showImages = !hasOpenedEditor && tasks.length === 0;
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const dateLabel = `${day} ${month}`;

    const imgSrc = Image.resolveAssetSource(girlImg);
    const aspect = imgSrc.width / imgSrc.height;

    return (
        <ImageBackground source={bg} style={styles.bg}>
            <SafeAreaView style={styles.safe}>
                <View
                    style={[
                        styles.header,
                        { height: headerTotal, paddingTop: insets.top + 24 },
                    ]}
                >
                    <Text style={styles.title}>Today's To-Do</Text>
                    <View style={styles.dateRow}>
                        <View style={styles.dateLeft}>
                            <TouchableOpacity onPress={showDatePicker}>
                                <CalendarSVG />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.todayText}>Today</Text>
                                <Text style={styles.dateText}>{dateLabel}</Text>
                            </View>
                        </View>
                        <View style={styles.editContainer}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => {
                                    if (!hasOpenedEditor) {setHasOpenedEditor(true);}
                                    setIsEditing(v => !v);
                                }}
                            >
                                <EditSVG />
                            </TouchableOpacity>
                            {showImages && (
                                <Image
                                    source={notifyImg}
                                    style={styles.notify}
                                    pointerEvents="none"
                                />
                            )}
                        </View>
                    </View>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    date={date}
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                />

                <ScrollView
                    contentContainerStyle={{
                        paddingTop: headerTotal - 24,
                        paddingHorizontal: 24,
                    }}
                >
                    {isEditing && (
                        <EditorSection
                            value={taskTitle}
                            onChange={setTaskTitle}
                            onSubmit={handleAddTask}
                        />
                    )}

                    {todayTasks.map((t, i) => (
                        <TaskItem
                            key={t.id}
                            task={t}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            style={i < todayTasks.length - 1 && { marginBottom: 8 }}
                        />
                    ))}

                    {otherDates.map(dk => (
                        <View key={dk} style={{ marginTop: 24 }}>
                            <Text style={styles.groupDate}>{dk}</Text>
                            {tasksByDate[dk].map((t, j) => (
                                <TaskItem
                                    key={t.id}
                                    task={t}
                                    onToggle={onToggle}
                                    onDelete={onDelete}
                                    style={j < tasksByDate[dk].length - 1 && { marginBottom: 8 }}
                                />
                            ))}
                        </View>
                    ))}
                </ScrollView>

                {showImages && (
                    <View style={{ flex: 1 }}>
                        <Image
                            source={girlImg}
                            style={{
                                position: 'absolute',
                                left: 14,
                                bottom: -86,
                                width: SCREEN_WIDTH - 28,
                                aspectRatio: aspect,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1, backgroundColor: '#3B4CCA' },
    safe: { flex: 1 },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#043182',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingHorizontal: 23,
        alignItems: 'center',
        zIndex: 10,
    },
    title: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 26,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    dateRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 11,
    },
    todayText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 4,
        marginLeft: 8,
    },
    dateText: {
        fontFamily: 'Fredoka',
        fontWeight: '600',
        fontSize: 22,
        color: '#FFFFFF',
        marginLeft: 8,
    },
    editContainer: {
        position: 'relative',
        zIndex: 11,
    },
    editButton: {
        width: 44,
        height: 44,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#FFBA4A',
    },
    notify: {
        position: 'absolute',
        top: 52,
        right: -10,
        width: 230,
        height: 35,
        resizeMode: 'contain',
    },
    groupDate: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 12,
    },
});
