import React from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function Ball({ id, x, anim, type, onPress }) {
    return (
        <Animated.Text
            key={id}
            style={[styles.ball, { left: x, transform: [{ translateY: anim }] }]}
            onPress={() => onPress(id, type)}
        >
            {type}
        </Animated.Text>
    );
}

const styles = StyleSheet.create({
    ball: {
        position: 'absolute',
        top: 0,
        width: 40,
        height: 40,
        fontSize: 32,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
