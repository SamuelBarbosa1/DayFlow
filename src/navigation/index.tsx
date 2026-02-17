import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { theme } from '../theme';
import { RootStackParamList, MainTabParamList } from '../types/navigation';
import { House, Calendar, CalendarDays, List, StickyNote, Plus } from 'lucide-react-native';

// Telas
import { HomeScreen } from '../screens/HomeScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { ListsScreen } from '../screens/ListsScreen';
import { NotesScreen } from '../screens/NotesScreen';
import { AddEditTaskScreen } from '../screens/AddEditTaskScreen';
import { AddEditNoteScreen } from '../screens/AddEditNoteScreen';
import { AddEditListScreen } from '../screens/AddEditListScreen';
import { View } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textTertiary,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
                    tabBarLabel: 'Início'
                }}
            />
            <Tab.Screen
                name="Today"
                component={TasksScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
                    tabBarLabel: 'Hoje'
                }}
            />
            <Tab.Screen
                name="Tomorrow"
                component={TasksScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} />,
                    tabBarLabel: 'Amanhã'
                }}
            />
            <Tab.Screen
                name="Lists"
                component={ListsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <List color={color} size={size} />,
                    tabBarLabel: 'Listas'
                }}
            />
            <Tab.Screen
                name="Notes"
                component={NotesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <StickyNote color={color} size={size} />,
                    tabBarLabel: 'Notas'
                }}
            />
        </Tab.Navigator>
    );
};

export const RootNavigator = () => {
    const navTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            background: theme.colors.background,
            card: theme.colors.surface,
            text: theme.colors.text,
            border: theme.colors.border,
            primary: theme.colors.primary,
        },
    };

    return (
        <NavigationContainer theme={navTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: theme.colors.background },
                    headerTintColor: theme.colors.text,
                    headerTitleStyle: { fontWeight: '600' },
                    contentStyle: { backgroundColor: theme.colors.background }
                }}
            >
                <Stack.Screen
                    name="Main"
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddEditTask"
                    component={AddEditTaskScreen}
                    options={{ presentation: 'modal', title: 'Tarefa' }}
                />
                <Stack.Screen
                    name="AddEditNote"
                    component={AddEditNoteScreen}
                    options={{ presentation: 'modal', title: 'Nota' }}
                />
                <Stack.Screen
                    name="AddEditList"
                    component={AddEditListScreen}
                    options={{ presentation: 'modal', title: 'Lista' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
