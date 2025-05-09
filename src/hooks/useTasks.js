import { useState } from 'react';

export default function useTasks() {
    const [tasks, setTasks] = useState([]);

    const addTask = ({ date, title, timeRange, duration }) => {
        const newTask = {
            id: Date.now(),
            date,
            title,
            timeRange,
            duration,
            completed: false,
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const toggleComplete = id => {
        setTasks(prev =>
            prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    };

    const forDate = date => tasks.filter(t => t.date === date);

    return { tasks, addTask, toggleComplete, forDate };
}
