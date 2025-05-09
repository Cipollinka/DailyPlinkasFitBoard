import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Animated,
    Dimensions,
    Image,
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import bg from '../assets/bg.png';
import figure from '../assets/game/figure.png';
import gameGirl from '../assets/game/gameGirl.png';
import GameHeader from '../components/GameHeader';
import Ball from '../components/Ball';

const BALLS = ['⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🥎', '🏉', '🥏', '🎱', '🪀', '🥌'];
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function GamePlayScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const rotateAnim = useRef(new Animated.Value(0)).current;
    const rotateLoopRef = useRef();
    const timerRef = useRef();
    const spawnRef = useRef();
    const frozenBallsRef = useRef([]);

    const [seconds, setSeconds] = useState(60);
    const [paused, setPaused] = useState(false);
    const [balls, setBalls] = useState([]);
    const [score, setScore] = useState(0);
    const [totalCaught, setTotalCaught] = useState(0);
    const [targetCount, setTargetCount] = useState(1);
    const [targetBall, setTargetBall] = useState(
        BALLS[Math.floor(Math.random() * BALLS.length)]
    );

    const resetGame = useCallback(() => {
        clearInterval(timerRef.current);
        clearInterval(spawnRef.current);
        setSeconds(60);
        setScore(0);
        setTotalCaught(0);
        setPaused(true);
        rotateAnim.setValue(0);
        setTargetCount(1);
        setTargetBall(BALLS[Math.floor(Math.random() * BALLS.length)]);
        setBalls([]);
        setPaused(false);
    }, [rotateAnim]);

    useEffect(() => {
        const loop = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 10000,
                useNativeDriver: true,
            }),
            { iterations: -1 }
        );
        rotateLoopRef.current = loop;
        loop.start();
        return () => loop.stop();
    }, [rotateAnim]);

    useEffect(() => {
        if (paused) {
            rotateLoopRef.current?.stop();
        } else {
            rotateAnim.setValue(0);
            rotateLoopRef.current?.start();
        }
    }, [paused, rotateAnim]);

    useEffect(() => {
        if (!paused && seconds > 0) {
            timerRef.current = setInterval(() => setSeconds(s => s - 1), 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [paused, seconds]);

    useEffect(() => {
        if (seconds === 0) {
            setPaused(true);
            rotateLoopRef.current?.stop();
            clearInterval(timerRef.current);
            clearInterval(spawnRef.current);
            Alert.alert(
                "Time's Up!",
                `You caught ${totalCaught} correct ball${totalCaught !== 1 ? 's' : ''}.`,
                [
                    { text: 'Menu', onPress: () => navigation.goBack() },
                    { text: 'Play Again', onPress: resetGame },
                ]
            );
        }
    }, [seconds, totalCaught, navigation, resetGame]);

    useEffect(() => {
        if (!paused && seconds > 0) {
            spawnRef.current = setInterval(() => {
                const x = Math.random() * (SCREEN_WIDTH - 40);
                const type = BALLS[Math.floor(Math.random() * BALLS.length)];
                const anim = new Animated.Value(0);
                const id = `${Date.now()}_${Math.random()}`;

                Animated.timing(anim, {
                    toValue: SCREEN_HEIGHT,
                    duration: 4000,
                    useNativeDriver: true,
                }).start(() => {
                    setBalls(bs => bs.filter(b => b.id !== id));
                });

                setBalls(bs => [...bs, { id, x, type, anim }]);
            }, 800);
        }
        return () => clearInterval(spawnRef.current);
    }, [paused, seconds]);

    const handleCatch = (id, type) => {
        if (paused || seconds === 0) return;

        if (type === targetBall) {
            setTotalCaught(tc => tc + 1);
            const newScore = score + 1;
            setScore(newScore);

            if (newScore === targetCount) {
                setTargetCount(c => (c < 5 ? c + 1 : 1));
                setScore(0);
                setTargetBall(
                    BALLS[Math.floor(Math.random() * BALLS.length)]
                );
            }
        } else {
            setPaused(true);
            rotateLoopRef.current?.stop();
            clearInterval(spawnRef.current);
            clearInterval(timerRef.current);
            Alert.alert(
                'Oops! Wrong Ball!',
                "That wasn't the target ball. Game Over!",
                [{ text: 'Menu', onPress: () => navigation.goBack() }]
            );
        }

        setBalls(bs => bs.filter(b => b.id !== id));
    };

    const onPause = () => {
        setPaused(true);
        clearInterval(timerRef.current);
        clearInterval(spawnRef.current);

        frozenBallsRef.current = balls.map(b => {
            b.anim.stopAnimation(v => (b.pausedY = v));
            return b;
        });

        Alert.alert(
            'Game Paused',
            'Tap Resume when you’re ready!',
            [
                { text: 'Exit', onPress: () => navigation.goBack() },
                {
                    text: 'Resume',
                    onPress: () => {
                        setPaused(false);
                        frozenBallsRef.current.forEach(b => {
                            const rem = SCREEN_HEIGHT - b.pausedY;
                            const dur = (rem / SCREEN_HEIGHT) * 4000;
                            Animated.timing(b.anim, {
                                toValue: SCREEN_HEIGHT,
                                duration: dur,
                                useNativeDriver: true,
                            }).start(() =>
                                setBalls(bs => bs.filter(x => x.id !== b.id))
                            );
                        });
                        frozenBallsRef.current = [];
                    },
                },
            ]
        );
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <ImageBackground source={bg} style={styles.bg}>
            <SafeAreaView style={styles.safe}>
                <GameHeader
                    seconds={seconds}
                    totalCaught={totalCaught}
                    onPause={onPause}
                />

                <View
                    style={[styles.gameArea, { top: insets.top + 138 }]}
                >
                    <Animated.Image
                        source={figure}
                        style={[
                            styles.figure,
                            { transform: [{ rotate }, { translateY: -40 }] },
                        ]}
                    />
                    {balls.map(b => (
                        <Ball
                            key={b.id}
                            id={b.id}
                            x={b.x}
                            anim={b.anim}
                            type={b.type}
                            onPress={handleCatch}
                        />
                    ))}
                </View>

                <View style={styles.speech}>
                    <View style={styles.speechBox}>
                        <Text style={styles.speechText}>
                            {Array(targetCount).fill(targetBall).join(' ')}
                        </Text>
                    </View>
                    <View style={styles.speechArrow} />
                </View>

                <Image source={gameGirl} style={styles.girl} />
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1, backgroundColor: '#414FC9' },
    safe: { flex: 1 },
    gameArea: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    figure: { width: 338, height: 296, marginTop: -160 },
    speech: {
        position: 'absolute',
        bottom: 180,
        left: 168,
        right: 24,
        alignItems: 'flex-start',
        zIndex: 2,
    },
    speechBox: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
    },
    speechText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 18,
        color: '#000',
    },
    speechArrow: {
        position: 'absolute',
        left: -10,
        top: 16,
        width: 0,
        height: 0,
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderRightWidth: 10,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#FFF',
    },
    girl: {
        position: 'absolute',
        bottom: 0,
        left: 14,
        width: 150,
        height: 320,
        zIndex: 1,
    },
});
