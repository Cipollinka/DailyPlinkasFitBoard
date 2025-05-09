import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Pressable,
    ImageBackground,
    ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import CancelSVG from '../assets/team/CancelSVG';
import bg from '../assets/bg.png';
import useConfirm from '../hooks/useConfirm';
import { useSelector, useDispatch } from 'react-redux';
import {
    addPerson,
    updatePerson,
    removePerson,
} from '../store/slices/teamsSlice';

import PersonCard from '../components/PersonCard';
import PersonModal from '../components/PersonModal';

export default function CollectionDetailsScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { params } = useRoute();
    const { collectionName } = params;
    const confirm = useConfirm();
    const dispatch = useDispatch();

    const collection = useSelector(state =>
        state.teams.collections.find(c => c.name === collectionName)
    );
    const people = collection?.people || [];

    const [modalVisible, setModalVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [personName, setPersonName] = useState('');
    const [role, setRole] = useState('');
    const [note, setNote] = useState('');

    const openAddModal = () => {
        setEditingIndex(null);
        setPersonName('');
        setRole('');
        setNote('');
        setModalVisible(true);
    };

    const openEditModal = (p, idx) => {
        setEditingIndex(idx);
        setPersonName(p.name);
        setRole(p.role);
        setNote(p.note);
        setModalVisible(true);
    };

    const savePerson = () => {
        const newPerson = { name: personName, role, note };
        if (editingIndex != null) {
            dispatch(updatePerson({ collectionName, index: editingIndex, person: newPerson }));
        } else {
            dispatch(addPerson({ collectionName, person: newPerson }));
        }
        setModalVisible(false);
    };

    const onRemove = idx => {
        confirm(
            {
                title: 'Remove Person?',
                message: 'Are you sure you want to remove this person?',
                confirmText: 'Remove',
                cancelText: 'Cancel',
            },
            () => dispatch(removePerson({ collectionName, index: idx }))
        );
    };

    return (
        <ImageBackground source={bg} style={styles.bg}>
            <SafeAreaView style={styles.safe}>
                <View style={[styles.header, { paddingTop: insets.top }]}>
                    <Text style={styles.headerTitle}>{collectionName}</Text>
                    <Pressable onPress={() => navigation.goBack()}>
                        <CancelSVG />
                    </Pressable>
                </View>

                <View style={styles.addPersonContainer}>
                    <Pressable style={styles.addPersonBtn} onPress={openAddModal}>
                        <Text style={styles.addPersonText}>+  Add Person</Text>
                    </Pressable>
                </View>

                <ScrollView contentContainerStyle={styles.scroll}>
                    {people.map((p, i) => (
                        <PersonCard
                            key={i}
                            person={p}
                            onPress={() => openEditModal(p, i)}
                            onLongPress={() => onRemove(i)}
                        />
                    ))}
                </ScrollView>

                <PersonModal
                    visible={modalVisible}
                    personName={personName}
                    role={role}
                    note={note}
                    isEditing={editingIndex != null}
                    onChangeName={setPersonName}
                    onChangeRole={setRole}
                    onChangeNote={setNote}
                    onCancel={() => setModalVisible(false)}
                    onSave={savePerson}
                />
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
    },
    headerTitle: {
        fontFamily: 'Fredoka',
        fontWeight: '500',
        fontSize: 26,
        color: '#FFFFFF',
    },
    addPersonContainer: {
        marginTop: 122,
        paddingHorizontal: 24,
    },
    addPersonBtn: {
        backgroundColor: '#FB0A75',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    addPersonText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    scroll: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,
    },
});
