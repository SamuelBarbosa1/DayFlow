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
            style={styles.container}
            onPress={() => onPress(note.id)}
            activeOpacity={0.7}
        >
            <View style={[styles.cover, { backgroundColor: note.color || theme.colors.surfaceHighlight }]}>
                <Text style={styles.content} numberOfLines={4}>
                    {note.content}
                </Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.title} numberOfLines={1}>
                    {note.title || 'Sem título'}
                </Text>
                <Text style={styles.date}>
                    {format(new Date(note.updatedAt), "d 'de' MMM. 'de' yyyy", { locale: ptBR })}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.m,
        borderRadius: theme.borderRadius.l,
        overflow: 'hidden', // Garante que a capa colorida respeite o raio da borda
        backgroundColor: theme.colors.background, // Cor de fundo da área do rodapé
    },
    cover: {
        height: 120, // Altura fixa para consistência
        padding: theme.spacing.m,
        borderTopLeftRadius: theme.borderRadius.l,
        borderTopRightRadius: theme.borderRadius.l,
    },
    content: {
        fontSize: theme.typography.small.fontSize,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 18,
    },
    footer: {
        paddingVertical: theme.spacing.s,
        paddingHorizontal: theme.spacing.xs,
        alignItems: 'center',
    },
    title: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.text,
        fontWeight: 'bold',
        marginBottom: 2,
        textAlign: 'center',
    },
    date: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textTertiary,
        textAlign: 'center',
    },
});
