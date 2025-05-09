import { useMemo } from 'react';

export default function useWeekDays(today) {
    return useMemo(() => {
        const dow = today.getDay();
        const mondayOffset = (dow + 6) % 7;
        const startDay = Math.max(1, today.getDate() - mondayOffset);
        const year = today.getFullYear();
        const month = today.getMonth();
        const lastDayCurrent = new Date(year, month + 1, 0).getDate();

        const days = [];
        for (let d = startDay; d <= lastDayCurrent; d++) {
            const key = [
                year,
                String(month + 1).padStart(2, '0'),
                String(d).padStart(2, '0'),
            ].join('-');
            const label = new Date(year, month, d).toLocaleDateString('en-US', {
                weekday: 'short',
            });
            days.push({ date: d, key, label });
        }

        const nextYear = month === 11 ? year + 1 : year;
        const nextMonth = (month + 1) % 12;
        const lastDayNext = new Date(nextYear, nextMonth + 1, 0).getDate();

        for (let d = 1; d <= lastDayNext; d++) {
            const key = [
                nextYear,
                String(nextMonth + 1).padStart(2, '0'),
                String(d).padStart(2, '0'),
            ].join('-');
            const label = new Date(nextYear, nextMonth, d).toLocaleDateString('en-US', {
                weekday: 'short',
            });
            days.push({ date: d, key, label });
        }

        return days;
    }, [today]);
}
