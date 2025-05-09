import { useMemo } from 'react';

export default function useMarkedDates(tasks, todayKey, selectedDate) {
    return useMemo(() => {
        const taskDates = tasks.reduce((acc, t) => {
            acc[t.date] = true;
            return acc;
        }, {});

        const base = {
            [todayKey]: {
                customStyles: {
                    container: { borderColor: '#FB0A75', borderWidth: 2, borderRadius: 12 },
                    text: { color: '#FB0A75', fontWeight: 'bold' },
                },
            },
            [selectedDate]: {
                customStyles: {
                    container: { backgroundColor: '#FB0A75', borderRadius: 12 },
                    text: { color: '#FFFFFF', fontWeight: 'bold' },
                },
            },
        };

        Object.keys(taskDates).forEach(date => {
            if (date === todayKey || date === selectedDate) return;
            base[date] = {
                customStyles: {
                    container: { backgroundColor: '#FFFFFF30', borderRadius: 12 },
                    text: { color: '#FFFFFF' },
                },
            };
        });

        return base;
    }, [tasks, todayKey, selectedDate]);
}
