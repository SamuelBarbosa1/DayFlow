import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { theme } from '../theme';
import { useStore } from '../store/useStore';
import { TaskItem } from '../components/TaskItem';
import { useRoute, useNavigation } from '@react-navigation/native';
import { isToday, isTomorrow, format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export const TasksScreen = () => {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { tasks, toggleTaskCompletion, deleteTask } = useStore();

    const title = route.name === 'Today' ? 'Hoje' : route.name === 'Tasks' ? 'Todas as Tarefas' : 'Tarefas';

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (route.name === 'Tasks') return true; // Show all
            if (!task.dueDate) return false; // Other routes need dates

            const date = new Date(task.dueDate);
            if (route.name === 'Today') {
                return isToday(date) || (isPast(date) && !task.isCompleted); // Include overdue in Today
            }
            return true;
        }).sort((a, b) => {
            if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;

            // Sort by due date if both exist
            if (a.dueDate && b.dueDate) {
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            }

            // Put undated tasks last
            if (!a.dueDate && b.dueDate) return 1;
            if (a.dueDate && !b.dueDate) return -1;

            return 0;
        });
    }, [tasks, route.name]);

    const handleAddTask = () => {
        const date = route.name === 'Tasks' ? undefined : new Date().toISOString();
        navigation.navigate('AddEditTask', { date });
    };

    return (
        <ScreenLayout>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{format(new Date(), "d 'de' MMMM, yyyy", { locale: ptBR })}</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {filteredTasks.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Nenhuma tarefa encontrada para {title.toLowerCase()}.</Text>
                    </View>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTaskCompletion}
                            onDelete={deleteTask}
                            onPress={(id) => navigation.navigate('AddEditTask', { taskId: id })}
                        />
                    ))
                )}
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={handleAddTask}>
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
    subtitle: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textSecondary,
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
