import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { theme } from '../theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useStore } from '../store/useStore';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Priority } from '../types';
import { Flag, X } from 'lucide-react-native';
import { isToday, isTomorrow } from 'date-fns';

// Nota: Para o selecionador de data, usaremos botões simples para "Hoje", "Amanhã" para o MVP.
// Estamos evitando dependências nativas adicionais como @react-native-community/datetimepicker para garantir uma configuração fácil.

type AddEditTaskRouteProp = RouteProp<RootStackParamList, 'AddEditTask'>;

export const AddEditTaskScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<AddEditTaskRouteProp>();
    const { taskId, listId, date } = route.params || {};
    const { tasks, lists, addTask, updateTask } = useStore();

    const existingTask = tasks.find(t => t.id === taskId);

    const [title, setTitle] = useState(existingTask?.title || '');
    const [description, setDescription] = useState(existingTask?.description || '');
    const [priority, setPriority] = useState<Priority>(existingTask?.priority || 'medium');
    const [selectedListId, setSelectedListId] = useState(existingTask?.listId || listId || lists[0]?.id || '');
    // Gerenciamento simples de data
    const [dueDate, setDueDate] = useState<string | undefined>(existingTask?.dueDate || date);

    const handleSave = () => {
        if (!title.trim()) return;

        const taskData = {
            title,
            description,
            priority,
            listId: selectedListId,
            dueDate: dueDate,
        };

        if (existingTask) {
            updateTask(existingTask.id, taskData);
        } else {
            addTask(taskData);
        }
        navigation.goBack();
    };

    const priorities: Priority[] = ['low', 'medium', 'high'];

    const getPriorityLabel = (p: Priority) => {
        switch (p) {
            case 'low': return 'Baixa';
            case 'medium': return 'Média';
            case 'high': return 'Alta';
            default: return p;
        }
    };

    return (
        <ScreenLayout>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <X size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{existingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>Salvar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Input
                    label="Título"
                    placeholder="O que precisa ser feito?"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.titleInput}
                    autoFocus={!existingTask}
                />
                <Input
                    label="Descrição"
                    placeholder="Adicionar detalhes..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    style={styles.descInput}
                />

                <View style={styles.section}>
                    <Text style={styles.label}>Prioridade</Text>
                    <View style={styles.row}>
                        {priorities.map(p => (
                            <TouchableOpacity
                                key={p}
                                style={[
                                    styles.priorityBadge,
                                    priority === p && { backgroundColor: theme.colors.surfaceHighlight, borderColor: theme.colors.primary, borderWidth: 1 }
                                ]}
                                onPress={() => setPriority(p)}
                            >
                                <Flag size={16} color={
                                    p === 'high' ? theme.colors.danger :
                                        p === 'medium' ? theme.colors.warning :
                                            theme.colors.success
                                } />
                                <Text style={styles.priorityText}>{getPriorityLabel(p)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Lista</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                        {lists.map(list => (
                            <TouchableOpacity
                                key={list.id}
                                style={[
                                    styles.chip,
                                    selectedListId === list.id && { backgroundColor: list.color, borderColor: list.color }
                                ]}
                                onPress={() => setSelectedListId(list.id)}
                            >
                                <Text style={[
                                    styles.chipText,
                                    selectedListId === list.id && { color: '#fff' }
                                ]}>{list.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Data de Vencimento</Text>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[
                                styles.chip,
                                dueDate && isToday(new Date(dueDate)) && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
                            ]}
                            onPress={() => setDueDate(new Date().toISOString())}
                        >
                            <Text style={[styles.chipText, dueDate && isToday(new Date(dueDate)) && { color: '#fff' }]}>Hoje</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.chip,
                                dueDate && isTomorrow(new Date(dueDate)) && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
                            ]}
                            onPress={() => {
                                const tmr = new Date();
                                tmr.setDate(tmr.getDate() + 1);
                                setDueDate(tmr.toISOString());
                            }}
                        >
                            <Text style={[styles.chipText, dueDate && isTomorrow(new Date(dueDate)) && { color: '#fff' }]}>Amanhã</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.chip,
                                !dueDate && { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
                            ]}
                            onPress={() => setDueDate(undefined)}
                        >
                            <Text style={styles.chipText}>Sem Data</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                {/* Botão de excluir poderia ir aqui no futuro */}
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.l,
    },
    headerTitle: {
        fontSize: theme.typography.h3.fontSize,
        fontWeight: '600',
        color: theme.colors.text,
    },
    titleInput: {
        fontSize: theme.typography.h3.fontSize,
        borderWidth: 0,
        backgroundColor: 'transparent',
        padding: 0,
        marginBottom: theme.spacing.s,
    },
    descInput: {
        fontSize: theme.typography.body.fontSize,
        borderWidth: 0,
        backgroundColor: 'transparent',
        padding: 0,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    section: {
        marginTop: theme.spacing.l,
    },
    label: {
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.s,
        fontSize: theme.typography.caption.fontSize,
    },
    row: {
        flexDirection: 'row',
        gap: theme.spacing.m,
    },
    priorityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.s,
        borderRadius: theme.borderRadius.m,
        backgroundColor: theme.colors.surface,
        gap: 6,
    },
    priorityText: {
        color: theme.colors.text,
        fontSize: theme.typography.small.fontSize,
    },
    chipsContainer: {
        flexDirection: 'row',
    },
    chip: {
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.s,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.surface,
        marginRight: theme.spacing.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    chipText: {
        color: theme.colors.text,
        fontSize: theme.typography.small.fontSize,
    },
    footer: {
        paddingVertical: theme.spacing.m,
    },
});
