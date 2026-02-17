import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Note } from '../types';
import { theme } from '../theme';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NoteItemProps {
    note: Note;
    onPress: (id: string) => void;
    onDelete: (id: string) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onPress, onDelete }) => {
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: note.color || theme.colors.surface }]}
            onPress={() => onPress(note.id)}
            activeOpacity={0.7}
        >
            <Text style={styles.content} numberOfLines={4}>
                {note.content}
            </Text>
            <Text style={styles.date}>
                {format(new Date(note.updatedAt), "d 'de' MMM", { locale: ptBR })}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        marginBottom: theme.spacing.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
        minHeight: 100,
    },
    content: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.text,
        marginBottom: theme.spacing.s,
    },
    date: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textTertiary,
        alignSelf: 'flex-end',
    },
});
