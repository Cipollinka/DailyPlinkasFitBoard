import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    ImageBackground,
    Share,
    Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import ShareSVG from '../assets/settings/ShareSVG';
import { setNotificationsEnabled } from '../store/slices/settingsSlice';

export default function SettingsScreen() {
    const dispatch = useDispatch();
    const notificationsEnabled = useSelector(
        state => state.settings.notificationsEnabled
    );
    const insets = useSafeAreaInsets();
    const headerHeight = 138;

    const shareApp = () => {
        Share.share({message: 'Hi, I found a cool app! This is link!', url: 'https://apps.apple.com/us/app/daily-plinkas-fitboard/id6745701150'})
    }

    return (
        <ImageBackground
            source={require('../assets/bg.png')}
            style={styles.bg}
            imageStyle={styles.bgImage}
        >
            <SafeAreaView style={styles.safe}>
                <View
                    style={[
                        styles.header,
                        {
                            paddingTop: insets.top + 24,
                            height: headerHeight,
                        },
                    ]}
                >
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>

                <View style={[styles.container, { marginTop: headerHeight }]}>
                    <View style={styles.block}>
                        <Text style={styles.blockText}>Notifications</Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={value =>
                                dispatch(setNotificationsEnabled(value))
                            }
                            trackColor={{
                                false: 'rgba(255,255,255,0.3)',
                                true: '#FB0A75',
                            }}
                        />
                    </View>
                    <TouchableOpacity style={styles.block} onPress={shareApp}>
                        <Text style={styles.blockText}>Share the app</Text>
                        <ShareSVG />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.block} onPress={() => Linking.openURL('https://apps.apple.com/us/app/daily-plinkas-fitboard/id6745701150')}>
                        <Text style={styles.blockText}>Rate the app</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.block} onPress={() => Linking.openURL('https://www.termsfeed.com/live/fba2add0-aa01-4ade-8e15-152e97844cca')}>
                        <Text style={styles.blockText}>
                            Terms of Use / Privacy Policy
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#414FC9',
    },
    bgImage: {
        resizeMode: 'contain',
    },
    safe: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#043182',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingRight: 23,
        paddingLeft: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 26,
        color: '#FFFFFF',
    },
    container: {
        marginHorizontal: 24,
    },
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#043182',
        borderRadius: 12,
        paddingTop: 24,
        paddingRight: 16,
        paddingBottom: 24,
        paddingLeft: 16,
        marginBottom: 10,
    },
    blockText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
});
