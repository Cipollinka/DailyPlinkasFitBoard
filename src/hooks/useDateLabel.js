export default function useDateLabel(selectedDate) {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const sel = new Date(selectedDate);
    const tod = new Date(todayKey);
    const diff = Math.round((sel - tod) / 86400000);

    if (diff === 0) {return 'Today';}
    if (diff === 1) {return 'Tomorrow';}
    if (diff === 2) {return 'Day after tomorrow';}
    if (diff === -1) {return 'Yesterday';}
    if (diff === -2) {return 'Day before yesterday';}
    return sel.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
