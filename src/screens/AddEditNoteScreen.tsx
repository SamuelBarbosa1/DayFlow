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

    const [title, setTitle] = useState(existingNote?.title || '');
    const [content, setContent] = useState(existingNote?.content || '');
    const [color, setColor] = useState(existingNote?.color);

    const handleSave = () => {
        if (!content.trim() && !title.trim()) return;

        if (existingNote) {
            updateNote(existingNote.id, content, title, color);
        } else {
            addNote(content, title, color);
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
        <ScreenLayout>
            <View style={[
                styles.headerWrapper,
                color ? { backgroundColor: color } : {}
            ]}>
                <View style={styles.headerControls}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <X size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', gap: theme.spacing.m }}>
                        {existingNote && (
                            <TouchableOpacity onPress={handleDelete}>
                                <Text style={{ color: theme.colors.text }}>Excluir</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleSave}>
                            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Concluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TextInput
                    placeholder="Título (opcional)"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.titleInput}
                />
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
    headerWrapper: {
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.l,
        marginHorizontal: -theme.spacing.l, // Negate ScreenLayout padding
        marginTop: -theme.spacing.l, // Negate ScreenLayout padding
        marginBottom: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    titleInput: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
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
