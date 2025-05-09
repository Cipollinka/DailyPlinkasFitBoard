import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useImagesFlag() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('hasSeenImages').then(value => {
            if (value !== 'true') setEnabled(true);
        });
    }, []);

    const disable = async () => {
        if (enabled) {
            setEnabled(false);
            await AsyncStorage.setItem('hasSeenImages', 'true');
        }
    };

    return [enabled, disable];
}
