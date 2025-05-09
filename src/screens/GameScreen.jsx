import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import InfoSVG from '../assets/game/InfoSVG';
import bg from '../assets/bg.png';
import mainImg from '../assets/game/main.png';

export default function GameScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const HEADER_HEIGHT = insets.top + 138;
    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    return (
        <ImageBackground source={bg} style={styles.bg}>
            <SafeAreaView style={styles.safe}>
                <Header
                    title="Plinka’s Ball Catch!"
                    subtitle="Catch only the correct type of sport ball in 1 minute. Tap to begin!"
                />

                <View style={[styles.container, { marginTop: HEADER_HEIGHT - 84 }]}>
                    <Image
                        source={mainImg}
                        style={{ width: '100%' }}
                        resizeMode="contain"
                    />
                </View>

                <View style={[styles.howTo, { top: HEADER_HEIGHT + 16 }]}>
                    <Text style={styles.howToText}>How to Play</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('GameInfo')}>
                        <InfoSVG />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.playBtn, { bottom: 130 }]}
                    onPress={() => navigation.navigate('GamePlay')}
                >
                    <Text style={styles.playText}>Play</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1, backgroundColor: '#414FC9' },
    safe: { flex: 1 },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    howTo: {
        position: 'absolute',
        right: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    howToText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
        marginRight: 8,
    },
    playBtn: {
        position: 'absolute',
        left: 24,
        right: 24,
        height: 43,
        backgroundColor: '#FFBA4A',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
});
