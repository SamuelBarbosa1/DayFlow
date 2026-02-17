import 'react-native-get-random-values';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, Task, List, Note } from '../types';
import { storage } from '../database/storage';
import { v4 as uuidv4 } from 'uuid';

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            tasks: [],
            lists: [
                { id: '1', name: 'Pessoal', color: '#4F46E5', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                { id: '2', name: 'Trabalho', color: '#E11D48', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            ],
            notes: [],

            // Ações de Tarefas
            addTask: (taskData) => set((state) => ({
                tasks: [
                    ...state.tasks,
                    {
                        id: uuidv4(),
                        ...taskData,
                        isCompleted: false,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                ],
            })),

            updateTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
                ),
            })),

            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            })),

            toggleTaskCompletion: (id) => set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, isCompleted: !task.isCompleted, updatedAt: new Date().toISOString() } : task
                ),
            })),

            moveTask: (taskId, newListId) => set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === taskId ? { ...task, listId: newListId, updatedAt: new Date().toISOString() } : task
                ),
            })),

            // Ações de Listas
            addList: (listData) => set((state) => ({
                lists: [
                    ...state.lists,
                    {
                        id: uuidv4(),
                        ...listData,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                ],
            })),

            updateList: (id, updates) => set((state) => ({
                lists: state.lists.map((list) =>
                    list.id === id ? { ...list, ...updates, updatedAt: new Date().toISOString() } : list
                ),
            })),

            deleteList: (id) => set((state) => ({
                lists: state.lists.filter((list) => list.id !== id),
                // Opcionalmente excluir tarefas associadas a esta lista
                tasks: state.tasks.filter((task) => task.listId !== id),
            })),

            // Ações de Notas
            addNote: (content, color) => set((state) => ({
                notes: [
                    ...state.notes,
                    {
                        id: uuidv4(),
                        content,
                        color,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                ],
            })),

            updateNote: (id, content, color) => set((state) => ({
                notes: state.notes.map((note) =>
                    note.id === id ? { ...note, content, color, updatedAt: new Date().toISOString() } : note
                ),
            })),

            deleteNote: (id) => set((state) => ({
                notes: state.notes.filter((note) => note.id !== id),
            })),
        }),
        {
            name: 'dayflow-storage',
            storage: createJSONStorage(() => storage),
        }
    )
);
