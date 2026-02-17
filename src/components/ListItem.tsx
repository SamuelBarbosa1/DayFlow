import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { List } from '../types';
import { theme } from '../theme';
import { ChevronRight, List as ListIcon } from 'lucide-react-native';

interface ListItemProps {
    list: List;
    count: number;
    onPress: (id: string) => void;
    onDelete: (id: string) => void;
}

export const ListItem: React.FC<ListItemProps> = ({ list, count, onPress, onDelete }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(list.id)} activeOpacity={0.7}>
            <View style={[styles.iconContainer, { backgroundColor: list.color }]}>
                <ListIcon size={20} color="#fff" />
            </View>
            <View style={styles.content}>
                <Text style={styles.name}>{list.name}</Text>
                <Text style={styles.count}>{count} tarefas</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textTertiary} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        marginBottom: theme.spacing.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.m,
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.text,
        fontWeight: '600',
    },
    count: {
        fontSize: theme.typography.caption.fontSize,
        color: theme.colors.textSecondary,
    },
});
