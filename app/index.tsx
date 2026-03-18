import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        setHasToken(!!token);
      } catch {
        setHasToken(false);
      } finally {
        setIsReady(true);
      }
    }
    checkAuth();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Redirect to dashboard if logged in, else login
  if (hasToken) {
    // @ts-ignore (Will be resolved once expo server generates routing types)
    return <Redirect href="/(tabs)/dashboard" />;
  }

  // @ts-ignore (Will be resolved once expo server generates routing types)
  return <Redirect href="/(auth)/login" />;
}
