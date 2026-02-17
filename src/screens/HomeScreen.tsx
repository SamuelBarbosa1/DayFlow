import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { theme } from '../theme';
import { useStore } from '../store/useStore';
import { TaskItem } from '../components/TaskItem';
import { ListItem } from '../components/ListItem';
import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { tasks, lists, toggleTaskCompletion, deleteTask } = useStore();

    const todayTasks = useMemo(() => {
        return tasks.filter(task => {
            if (!task.dueDate) return false;
            return isToday(new Date(task.dueDate)) && !task.isCompleted;
        });
    }, [tasks]);

    const handleAddTask = () => {
        navigation.navigate('AddEditTask', {});
    };

    return (
        <ScreenLayout>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Olá,</Text>
                    <Text style={styles.date}>{format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Minhas Listas</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listsScroll}>
                        {lists.map((list) => {
                            const listTaskCount = tasks.filter(t => t.listId === list.id && !t.isCompleted).length;
                            return (
                                <TouchableOpacity
                                    key={list.id}
                                    style={[styles.listCard, { backgroundColor: list.color }]}
                                    onPress={() => navigation.navigate('Main', { screen: 'Lists' })} // Idealmente navegar para detalhes da lista
                                >
                                    <Text style={styles.listName}>{list.name}</Text>
                                    <Text style={styles.listCount}>{listTaskCount} tarefas</Text>
                                </TouchableOpacity>
                            );
                        })}
                        <TouchableOpacity style={[styles.listCard, styles.addListCard]} onPress={() => navigation.navigate('AddEditList', {})}>
                            <Plus size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Tarefas de Hoje</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Today' })}>
                            <Text style={styles.seeAll}>Ver Tudo</Text>
                        </TouchableOpacity>
                    </View>

                    {todayTasks.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>Sem tarefas para hoje. Aproveite o dia!</Text>
                        </View>
                    ) : (
                        todayTasks.slice(0, 3).map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={toggleTaskCompletion}
                                onDelete={deleteTask}
                                onPress={(id) => navigation.navigate('AddEditTask', { taskId: id })}
                            />
                        ))
                    )}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={handleAddTask}>
                <Plus size={32} color="#fff" />
            </TouchableOpacity>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: theme.spacing.l,
        marginBottom: theme.spacing.xl,
    },
    greeting: {
        fontSize: theme.typography.h1.fontSize,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    date: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    sectionTitle: {
        fontSize: theme.typography.h3.fontSize,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    seeAll: {
        color: theme.colors.primary,
        fontSize: theme.typography.body.fontSize,
    },
    listsScroll: {
        marginHorizontal: -theme.spacing.m,
        paddingHorizontal: theme.spacing.m,
    },
    listCard: {
        width: 140,
        height: 100,
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.m,
        marginRight: theme.spacing.m,
        justifyContent: 'space-between',
    },
    addListCard: {
        backgroundColor: theme.colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listName: {
        color: '#fff',
        fontWeight: '600',
        fontSize: theme.typography.body.fontSize,
    },
    listCount: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: theme.typography.small.fontSize,
    },
    emptyState: {
        padding: theme.spacing.l,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: theme.colors.textSecondary,
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
