import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import bg from '../assets/bg.png';
import girlImg from '../assets/team/girl.png';
import useConfirm from '../hooks/useConfirm';
import {
    loadTeams,
    addCollection,
    deleteCollection,
} from '../store/slices/teamsSlice';
import CollectionCard from '../components/CollectionCard';
import CreateCollectionModal from '../components/CreateCollectionModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CREATE_BTN_HEIGHT = 48;

export default function TeamsScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const confirm = useConfirm();
    const HEADER_HEIGHT = insets.top + 138;

    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const collections = useSelector(state => state.teams.collections);

    useEffect(() => {
        dispatch(loadTeams());
    }, [dispatch]);

    const handleCreate = () => {
        dispatch(addCollection(name));
        setName('');
        setModalVisible(false);
    };

    const onDelete = index => {
        confirm(
            {
                title: 'Delete Collection?',
                message: 'Are you sure you want to delete this collection?',
                confirmText: 'Delete',
                cancelText: 'Cancel',
            },
            () => dispatch(deleteCollection(index))
        );
    };

    const goToDetails = col => {
        navigation.navigate('CollectionDetails', { collectionName: col.name });
    };

    return (
        <ImageBackground source={bg} style={styles.bg}>
            <SafeAreaView style={styles.safe}>
                <Header
                    title="Your Team Circle"
                    subtitle="Add your coaches, teammates, and motivators!"
                />

                <View style={[styles.topControls, { top: HEADER_HEIGHT + 24 }]}>
                    <TouchableOpacity
                        style={styles.createBtn}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.createBtnText}>
                            +  Create New Collection
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={[
                        styles.container,
                        { paddingTop: HEADER_HEIGHT + CREATE_BTN_HEIGHT },
                    ]}
                >
                    {collections.map((col, i) => (
                        <CollectionCard
                            key={col.name}
                            collection={col}
                            onPress={() => goToDetails(col)}
                            onLongPress={() => onDelete(i)}
                        />
                    ))}
                </ScrollView>

                <CreateCollectionModal
                    visible={modalVisible}
                    name={name}
                    onChangeName={setName}
                    onCancel={() => setModalVisible(false)}
                    onCreate={handleCreate}
                />

                {collections.length === 0 && (
                    <Image source={girlImg} style={styles.girl} />
                )}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1, backgroundColor: '#414FC9' },
    safe: { flex: 1 },
    topControls: {
        position: 'absolute',
        left: 24,
        right: 24,
        zIndex: 10,
    },
    createBtn: {
        height: CREATE_BTN_HEIGHT,
        backgroundColor: '#FB0A75',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    createBtnText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    scroll: { flex: 1 },
    container: {
        paddingHorizontal: 24,
        paddingBottom: 32,
        alignItems: 'stretch',
    },
    girl: {
        position: 'absolute',
        left: 14,
        right: 19,
        bottom: 104,
        width: SCREEN_WIDTH - 33,
        height: 335,
        resizeMode: 'contain',
    },
});
