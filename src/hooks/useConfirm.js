import { Alert } from 'react-native';
import { useCallback } from 'react';

export default function useConfirm() {
    return useCallback(
        (
            {
                title,
                message,
                confirmText = 'Remove',
                cancelText = 'Cancel',
                confirmStyle = 'destructive',
                cancelStyle = 'cancel',
            },
            onConfirm
        ) => {
            Alert.alert(
                title,
                message,
                [
                    { text: cancelText, style: cancelStyle },
                    { text: confirmText, style: confirmStyle, onPress: onConfirm },
                ]
            );
        },
        []
    );
}
