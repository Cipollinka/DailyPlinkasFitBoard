import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import bg from '../assets/bg.png';
import girlInfo from '../assets/game/girlInfo.png';
import CancelSVG from '../assets/team/CancelSVG';

export default function GameInfoScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const HEADER_HEIGHT = insets.top + 138;

    return (
        <ImageBackground source={bg} style={styles.bg}>
            <SafeAreaView style={styles.safe}>
                <View style={[styles.header, { paddingTop: insets.top }]}>
                    <Text style={styles.headerTitle}>How to Play</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <CancelSVG />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingTop: HEADER_HEIGHT - 68,
                        paddingBottom: insets.bottom + 24 + 43 + 16,
                    }}
                >
                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            Plinka will give you a specific sport ball to catch.

                            {'\n\n'}Balls from various sports will fall from the top — soccer, tennis, basketball and more!

                            {'\n\n'}Tap only the ball that matches the target sport.

                            {'\n\n'}If you tap the wrong one — game over!

                            {'\n\n'}Try to catch as many as you can in 1 minute.
                        </Text>
                    </View>
                </ScrollView>

                <Image source={girlInfo} style={styles.girl} resizeMode="contain" />

                <TouchableOpacity
                    style={[styles.button, { bottom: insets.bottom + 24 }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Got it! Let’s Play</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1, backgroundColor: '#414FC9' },
    safe: { flex: 1 },
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 138,
        backgroundColor: '#043182',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 2,
    },
    headerTitle: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 26,
        color: '#FFFFFF',
    },
    textBox: {
        backgroundColor: '#043182',
        borderRadius: 12,
        paddingTop: 32,
        paddingRight: 24,
        paddingBottom: 32,
        paddingLeft: 24,
        marginBottom: 24,
        zIndex: 1,
    },
    text: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 18,
        color: '#FFFFFF',
        lineHeight: 24,
    },
    girl: {
        position: 'absolute',
        bottom: 0,
        width: 180,
        height: 360,
        alignSelf: 'center',
        zIndex: 1,
    },
    button: {
        position: 'absolute',
        left: 24,
        right: 24,
        height: 43,
        backgroundColor: '#FFBA4A',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
    },
    buttonText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
});
