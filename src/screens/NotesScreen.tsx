import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { theme } from '../theme';
import { useStore } from '../store/useStore';
import { NoteItem } from '../components/NoteItem';
import { Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export const NotesScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { notes, deleteNote } = useStore();

    const handleDelete = (id: string) => {
        Alert.alert(
            "Excluir Nota",
            "Tem certeza que deseja excluir esta nota?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => deleteNote(id) }
            ]
        );
    };

    return (
        <ScreenLayout>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas Notas</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {notes.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Nenhuma nota ainda. Toque em + para criar.</Text>
                    </View>
                ) : (
                    <View style={styles.grid}>
                        {notes.map((note) => (
                            <View key={note.id} style={styles.gridItem}>
                                <NoteItem
                                    note={note}
                                    onPress={(id) => navigation.navigate('AddEditNote', { noteId: id })}
                                    onDelete={(id) => handleDelete(id)}
                                />
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddEditNote', {})}>
                <Plus size={32} color="#fff" />
            </TouchableOpacity>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: theme.spacing.m,
        marginBottom: theme.spacing.l,
    },
    title: {
        fontSize: theme.typography.h1.fontSize,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -theme.spacing.s,
    },
    gridItem: {
        width: '50%',
        padding: theme.spacing.s,
    },
    emptyState: {
        marginTop: theme.spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        color: theme.colors.textTertiary,
        fontSize: theme.typography.body.fontSize,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.l,
        right: theme.spacing.m,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
