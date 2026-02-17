import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { theme } from '../theme';
import { useStore } from '../store/useStore';
import { ListItem } from '../components/ListItem';
import { Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export const ListsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { lists, tasks, deleteList } = useStore();

    const handleDelete = (id: string) => {
        Alert.alert(
            "Excluir Lista",
            "Tem certeza? Isso excluirá todas as tarefas desta lista.",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => deleteList(id) }
            ]
        );
    };

    return (
        <ScreenLayout>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas Listas</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {lists.map((list) => {
                    const count = tasks.filter(t => t.listId === list.id && !t.isCompleted).length;
                    return (
                        <ListItem
                            key={list.id}
                            list={list}
                            count={count}
                            onPress={(id) => navigation.navigate('AddEditList', { listId: id })}
                            onDelete={(id) => handleDelete(id)}
                        />
                    );
                })}
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddEditList', {})}>
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
