import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
    Home: undefined;
    Today: undefined;
    Tomorrow: undefined;
    Lists: undefined;
    Notes: undefined;
};

export type RootStackParamList = {
    Main: NavigatorScreenParams<MainTabParamList>;
    DetailTask: { taskId: string };
    AddEditTask: { taskId?: string; listId?: string; date?: string };
    AddEditNote: { noteId?: string };
    AddEditList: { listId?: string };
};
