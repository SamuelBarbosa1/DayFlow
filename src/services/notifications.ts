import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configura o comportamento global das notificações (Exibir mesmo com app aberto)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function requestNotificationPermissions() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'Lembretes de Tarefas',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#4F46E5',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return false;
        }
        return true;
    } else {
        // Notificações físicas não funcionam em simuladores iOS, apenas Android Emulator
        return false;
    }
}

export async function scheduleTaskReminder(taskId: string, title: string, dueDate: string): Promise<string | undefined> {
    try {
        let dateObj = new Date(dueDate);

        // Se for "hoje" e a data gerada for no passado (ex: bateu meia noite),
        // vamos ajustar o lembrete para daqui a 1 minuto para facilitar testes
        if (dateObj.getTime() <= new Date().getTime()) {
            // Se for hoje, agenda pra daqui 1 minuto. Se for data antiga real, ignora.
            const today = new Date();
            if (dateObj.toDateString() === today.toDateString()) {
                dateObj = new Date(today.getTime() + 60 * 1000); // +1 minuto
            } else {
                return undefined;
            }
        }

        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Lembrete de Tarefa ⏰',
                body: `Não esqueça: ${title}`,
                data: { taskId },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: dateObj,
            },
        });

        return identifier;
    } catch (error) {
        console.log('Erro ao agendar notificação:', error);
        return undefined;
    }
}

export async function cancelTaskReminder(notificationId: string) {
    try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
        console.log('Erro ao cancelar notificação:', error);
    }
}
