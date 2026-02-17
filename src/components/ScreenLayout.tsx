import React from 'react';
import { View, StyleSheet, StatusBar, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface ScreenLayoutProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, style }) => {
    return (
        <View style={[styles.container, { paddingTop: 40 }]}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
            <View style={[styles.content, style]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.m,
    },
});
