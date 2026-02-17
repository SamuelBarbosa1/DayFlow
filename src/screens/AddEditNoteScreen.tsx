import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { theme } from '../theme';
import { Button } from '../components/Button';
import { useStore } from '../store/useStore';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { X, Check } from 'lucide-react-native';

type AddEditNoteRouteProp = RouteProp<RootStackParamList, 'AddEditNote'>;

const NOTE_COLORS = [
    undefined, // Default (Surface)
    '#3f3f46', // Zinc 700
    '#7f1d1d', // Red 900
    '#713f12', // Yellow 900
    '#064e3b', // Green 900
    '#1e3a8a', // Blue 900
    '#4c1d95', // Violet 900
    '#831843', // Pink 900
];

export const AddEditNoteScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<AddEditNoteRouteProp>();
    const { noteId } = route.params || {};
    const { notes, addNote, updateNote, deleteNote } = useStore();

    const existingNote = notes.find(n => n.id === noteId);

    const [content, setContent] = useState(existingNote?.content || '');
    const [color, setColor] = useState(existingNote?.color);

    const handleSave = () => {
        if (!content.trim()) return;

        if (existingNote) {
            updateNote(existingNote.id, content, color);
        } else {
            addNote(content, color);
        }
        navigation.goBack();
    };

    const handleDelete = () => {
        if (existingNote) {
            deleteNote(existingNote.id);
            navigation.goBack();
        }
    };

    return (
        <ScreenLayout style={{ backgroundColor: color || theme.colors.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <X size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: theme.spacing.m }}>
                    {existingNote && (
                        <TouchableOpacity onPress={handleDelete}>
                            <Text style={{ color: theme.colors.danger }}>Excluir</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }}>
                <TextInput
                    placeholder="Digite sua nota aqui..."
                    placeholderTextColor={theme.colors.textTertiary}
                    value={content}
                    onChangeText={setContent}
                    multiline
                    autoFocus={!existingNote}
                    style={[styles.input, { color: theme.colors.text }]}
                />
            </ScrollView>

            <View style={styles.colorBar}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {NOTE_COLORS.map((c, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[
                                styles.colorCircle,
                                { backgroundColor: c || theme.colors.surface },
                                color === c && { borderWidth: 2, borderColor: theme.colors.primary }
                            ]}
                            onPress={() => setColor(c)}
                        />
                    ))}
                </ScrollView>
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
        paddingVertical: theme.spacing.s, // Add some vertical padding
    },
    input: {
        fontSize: theme.typography.body.fontSize,
        lineHeight: 24,
        textAlignVertical: 'top',
        minHeight: 200,
    },
    colorBar: {
        paddingVertical: theme.spacing.m,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    colorCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: theme.spacing.m,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
});
