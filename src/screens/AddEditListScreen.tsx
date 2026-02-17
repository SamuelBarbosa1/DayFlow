import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { theme } from '../theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useStore } from '../store/useStore';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { X, Check } from 'lucide-react-native';

type AddEditListRouteProp = RouteProp<RootStackParamList, 'AddEditList'>;

const COLORS = [
    '#EF4444', // Red
    '#F59E0B', // Orange
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#71717A', // Zinc
];

export const AddEditListScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<AddEditListRouteProp>();
    const { listId } = route.params || {};
    const { lists, addList, updateList, deleteList } = useStore();

    const existingList = lists.find(l => l.id === listId);

    const [name, setName] = useState(existingList?.name || '');
    const [color, setColor] = useState(existingList?.color || COLORS[4]);

    const handleSave = () => {
        if (!name.trim()) return;

        if (existingList) {
            updateList(existingList.id, { name, color });
        } else {
            addList({ name, color });
        }
        navigation.goBack();
    };

    const handleDelete = () => {
        if (existingList) {
            deleteList(existingList.id);
            navigation.goBack();
        }
    }

    return (
        <ScreenLayout>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <X size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{existingList ? 'Editar Lista' : 'Nova Lista'}</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={{ flex: 1 }}>
                <Input
                    placeholder="Nome da Lista"
                    value={name}
                    onChangeText={setName}
                    autoFocus
                    style={styles.nameInput}
                />

                <Text style={styles.label}>Cor</Text>
                <View style={styles.colorsGrid}>
                    {COLORS.map(c => (
                        <TouchableOpacity
                            key={c}
                            style={[styles.colorCircle, { backgroundColor: c }]}
                            onPress={() => setColor(c)}
                        >
                            {color === c && <Check size={16} color="#fff" />}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.footer}>
                {existingList && (
                    <Button
                        title="Excluir Lista"
                        variant="danger"
                        onPress={handleDelete}
                        style={{ marginBottom: theme.spacing.m }}
                    />
                )}
                <Button title="Salvar Lista" onPress={handleSave} />
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
    nameInput: {
        fontSize: theme.typography.h3.fontSize,
        marginBottom: theme.spacing.xl,
    },
    label: {
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.m,
        fontSize: theme.typography.body.fontSize,
    },
    colorsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.m,
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        paddingVertical: theme.spacing.m,
    },
});
