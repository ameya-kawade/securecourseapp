import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

import { useAuthStore } from '../store/authStore';

export default function Index() {
  const { checkAuth, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Redirect based on auth status
  if (isAuthenticated) {
    // @ts-ignore
    return <Redirect href="/(trainee)/(tabs)/dashboard" />;
  }

  // @ts-ignore
  return <Redirect href="/(auth)/login" />;
}
