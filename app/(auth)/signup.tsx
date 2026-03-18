import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface
} from 'react-native-paper';
import { SafeAreaView as CSafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import GradientBackground from '../../components/GradientBackground';
import AuthHeader from '../../components/AuthHeader';
import { colors } from '../../theme/colors';
import { useAuthStore } from '../../store/authStore';
import { spacing } from '../../theme/spacing';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const login = useAuthStore((state) => state.login);

  const handleSignup = async () => {
    // Mock user creation
    const mockUser = {
      id: Math.random().toString(36).substring(7),
      fullName,
      email,
      employeeId: 'EMP-' + Math.floor(10000 + Math.random() * 90000)
    };
    
    // Log the user in after "successful" signup
    await login('dummy-token', mockUser);
    router.replace('/(tabs)/dashboard');
  };

  return (
    <GradientBackground className="flex-1">
      <StatusBar barStyle="light-content" />
      <CSafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, padding: 32, paddingTop: 64, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AuthHeader
              title="CREATE ACCOUNT"
              subtitle="JOIN THE PROFESSIONAL TRAINING NETWORK"
              showIcon={false}
            />

            <Surface style={{ backgroundColor: 'transparent', borderRadius: 40, padding: 40, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} elevation={0}>
              <TextInput
                label="FULL NAME"
                mode="outlined"
                placeholder="John Doe"
                value={fullName}
                onChangeText={setFullName}
                left={<TextInput.Icon icon="account-outline" color="rgba(255,255,255,0.5)" />}
                style={{ backgroundColor: 'transparent', marginBottom: 32 }}
                outlineColor="rgba(255,255,255,0.1)"
                activeOutlineColor={colors.primary}
              />

              <TextInput
                label="WORK EMAIL"
                mode="outlined"
                placeholder="john.doe@enterprise.com"
                value={email}
                onChangeText={setEmail}
                left={<TextInput.Icon icon="email-outline" color="rgba(255,255,255,0.5)" />}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ backgroundColor: 'transparent', marginBottom: 32 }}
                outlineColor="rgba(255,255,255,0.1)"
                activeOutlineColor={colors.primary}
              />

              <TextInput
                label="PASSWORD"
                mode="outlined"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                left={<TextInput.Icon icon="lock-outline" color="rgba(255,255,255,0.5)" />}
                secureTextEntry
                style={{ backgroundColor: 'transparent', marginBottom: 32 }}
                outlineColor="rgba(255,255,255,0.1)"
                activeOutlineColor={colors.primary}
              />

              <TextInput
                label="CONFIRM PASSWORD"
                mode="outlined"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                left={<TextInput.Icon icon="shield-outline" color="rgba(255,255,255,0.5)" />}
                secureTextEntry
                style={{ backgroundColor: 'transparent', marginBottom: 32 }}
                outlineColor="rgba(255,255,255,0.1)"
                activeOutlineColor={colors.primary}
              />

              <Button
                mode="contained"
                onPress={handleSignup}
                style={{ marginTop: 32, borderRadius: 16 }}
                contentStyle={{ height: 56 }}
                labelStyle={{ fontSize: 18, fontWeight: '800' }}
              >
                Create Account
              </Button>

              <View className="flex-row justify-center items-center">
                <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 14, fontWeight: '500' }}>Already have an account? </Text>
                <Button
                  mode="text"
                  compact
                  onPress={() => router.replace('/(auth)/login')}
                  labelStyle={{ color: colors.primary, fontSize: 14, fontWeight: '700' }}
                >
                  Sign In
                </Button>
              </View>
            </Surface>

            <View className="mt-6 px-4">
              <Text style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: 12, lineHeight: 20, fontWeight: '500' }}>
                By signing up, you agree to our{' '}
                <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 'bold', textDecorationLine: 'underline' }}>Terms of Service</Text> and{' '}
                <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 'bold', textDecorationLine: 'underline' }}>Privacy Policy</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </CSafeAreaView>
    </GradientBackground>
  );
}
