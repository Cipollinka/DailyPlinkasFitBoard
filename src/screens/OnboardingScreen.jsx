import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useDispatch } from 'react-redux';
import { setHasSeenOnboarding } from '../store/slices/settingsSlice';

export default function OnboardingScreen({ navigation }) {
    const bg = require('../assets/onboarding/bg.png');
    const dispatch = useDispatch();

    const finish = () => {
        dispatch(setHasSeenOnboarding(true));
        navigation.replace('Main');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ImageBackground
                source={bg}
                style={styles.bgContainer}
                imageStyle={styles.bgImageStyle}
            >
                <View style={styles.card}>
                    <MaskedView
                        maskElement={
                            <Text style={styles.title}>
                                Welcome to Daily{'\n'}Plinka’s FitBoard!
                            </Text>
                        }
                    >
                        <LinearGradient
                            colors={['#FFAD07', '#FCF003']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                        >
                            <Text style={[styles.title, { opacity: 0 }]}>
                                Welcome to Daily{'\n'}Plinka’s FitBoard!
                            </Text>
                        </LinearGradient>
                    </MaskedView>
                    <Text style={styles.subtitle}>
                        Hey there, Champion! I’m Plinka, your sporty sidekick.{'\n\n'}
                        Together, we’ll track your training, plan your days,
                        and celebrate every little victory!
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={finish}
                    >
                        <Text style={styles.buttonText}>Let’s Get Started!</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#3B4CCA',
    },
    bgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgImageStyle: {
        resizeMode: 'contain',
        width: '100%',
    },
    card: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 16,
        backgroundColor: '#043182',
        borderRadius: 12,
        paddingTop: 32,
        paddingRight: 24,
        paddingBottom: 32,
        paddingLeft: 24,
    },
    title: {
        fontFamily: 'Fredoka One',
        fontWeight: '400',
        fontSize: 27,
        textAlign: 'center',
        marginBottom: 24,
        textShadowColor: '#9A1C0A',
        textShadowOffset: { width: 3, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'left',
        marginBottom: 24,
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#FB0A75',
        borderRadius: 12,
        paddingTop: 16,
        paddingRight: 13,
        paddingBottom: 16,
        paddingLeft: 13,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
});
