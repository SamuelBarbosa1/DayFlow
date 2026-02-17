import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types';
import { theme } from '../theme';
import { CheckCircle2, Circle, Trash2, Calendar, Flag } from 'lucide-react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onPress: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onPress }) => {
    const getPriorityColor = () => {
        switch (task.priority) {
            case 'high': return theme.colors.danger;
            case 'medium': return theme.colors.warning;
            case 'low': return theme.colors.success; // ou azul/neutro
            default: return theme.colors.textTertiary;
        }
    };

    const getPriorityLabel = (p: string) => {
        switch (p) {
            case 'low': return 'Baixa';
            case 'medium': return 'Média';
            case 'high': return 'Alta';
            default: return p;
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(task.id)} activeOpacity={0.7}>
            <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.checkContainer}>
                {task.isCompleted ? (
                    <CheckCircle2 size={24} color={theme.colors.primary} />
                ) : (
                    <Circle size={24} color={theme.colors.textTertiary} />
                )}
            </TouchableOpacity>

            <View style={styles.contentContainer}>
                <Text style={[styles.title, task.isCompleted && styles.completedTitle]}>
                    {task.title}
                </Text>
                {task.description ? (
                    <Text style={styles.description} numberOfLines={1}>{task.description}</Text>
                ) : null}

                <View style={styles.footer}>
                    {task.dueDate && (
                        <View style={styles.metaContainer}>
                            <Calendar size={14} color={theme.colors.textTertiary} />
                            <Text style={styles.metaText}>{format(new Date(task.dueDate), "d 'de' MMM", { locale: ptBR })}</Text>
                        </View>
                    )}
                    <View style={styles.metaContainer}>
                        <Flag size={14} color={getPriorityColor()} />
                        <Text style={[styles.metaText, { color: getPriorityColor() }]}>
                            {getPriorityLabel(task.priority)}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
                <Trash2 size={20} color={theme.colors.textTertiary} />
            </TouchableOpacity>
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
    checkContainer: {
        marginRight: theme.spacing.m,
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.text,
        fontWeight: '500',
    },
    completedTitle: {
        color: theme.colors.textTertiary,
        textDecorationLine: 'line-through',
    },
    description: {
        fontSize: theme.typography.caption.fontSize,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    footer: {
        flexDirection: 'row',
        marginTop: theme.spacing.xs,
        gap: theme.spacing.m,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textTertiary,
    },
    deleteButton: {
        padding: theme.spacing.s,
    },
});
