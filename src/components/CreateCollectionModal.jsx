import React from 'react';
import {
    Modal,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

export default function CreateCollectionModal({
    visible,
    name,
    onChangeName,
    onCancel,
    onCreate,
}) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        placeholder="Collection Name"
                        placeholderTextColor="#FFFFFF80"
                        value={name}
                        onChangeText={onChangeName}
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.okBtn, !name && { opacity: 0.3 }]}
                            disabled={!name}
                            onPress={onCreate}
                        >
                            <Text style={styles.okText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#0000004D',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    content: {
        backgroundColor: '#FFBA4A',
        borderRadius: 12,
        padding: 16,
        width: '100%',
    },
    input: {
        backgroundColor: '#F79900',
        borderRadius: 12,
        padding: 16,
        color: '#FFFFFF',
        fontFamily: 'Fredoka',
        fontWeight: '300',
        fontSize: 16,
        marginBottom: 16,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelBtn: {
        flex: 1,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        marginRight: 8,
    },
    cancelText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    okBtn: {
        flex: 1,
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FB0A75',
        alignItems: 'center',
    },
    okText: {
        fontFamily: 'Fredoka',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
});
