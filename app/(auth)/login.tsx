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
  Surface,
  Divider
} from 'react-native-paper';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import GradientBackground from '../../components/GradientBackground';
import AuthHeader from '../../components/AuthHeader';
import { colors } from '../../theme/colors';

export default function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Basic mock logic for now
    await SecureStore.setItemAsync('userToken', 'dummy-token');
    // @ts-ignore
    router.replace('/(tabs)/dashboard');
  };

  return (
    <GradientBackground>
      <StatusBar barStyle="light-content" />
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
            title="SECURETRAIN"
            subtitle="PROFESSIONAL TRAINING MANAGEMENT"
          />

          <Surface style={{ backgroundColor: 'transparent', borderRadius: 40, padding: 40, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} elevation={0}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginBottom: 8, letterSpacing: -1 }}>Welcome Back</Text>
            <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.5)', marginBottom: 32, fontWeight: '500' }}>Sign in to access your dashboard</Text>

            <TextInput
              label="Employee ID"
              mode="outlined"
              placeholder="EMP-XXXXX"
              value={employeeId}
              onChangeText={setEmployeeId}
              left={<TextInput.Icon icon="account" color="rgba(255,255,255,0.5)" />}
              autoCapitalize="none"
              style={{ backgroundColor: 'transparent', marginBottom: 32 }}
              outlineColor="rgba(255,255,255,0.1)"
              activeOutlineColor={colors.primary}
            />

            <View className="flex-row justify-between items-center -mb-2 px-0.5 z-10">
              <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 12, fontWeight: 'bold', letterSpacing: 0.5 }}>PASSWORD</Text>
              <Button
                mode="text"
                compact
                onPress={() => { }}
                labelStyle={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}
              >
                Forgot?
              </Button>
            </View>

            <TextInput
              placeholder="••••••••"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock" color="rgba(255,255,255,0.5)" />}
              right={<TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
                color="rgba(255,255,255,0.5)"
              />}
              style={{ backgroundColor: 'transparent', marginBottom: 32 }}
              outlineColor="rgba(255,255,255,0.1)"
              activeOutlineColor={colors.primary}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              style={{ marginTop: 40, marginBottom: 32, borderRadius: 16 }}
              contentStyle={{ height: 56 }}
              labelStyle={{ fontSize: 18, fontWeight: '800' }}
            >
              Authenticate
            </Button>

            <View className="flex-row items-center mb-6">
              <Divider style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              <Text style={{ marginHorizontal: 16, color: 'rgba(255, 255, 255, 0.3)', fontSize: 12, fontWeight: '800' }}>OR</Text>
              <Divider style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            </View>

            <View className="flex-row justify-center items-center">
              <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 14, fontWeight: '500' }}>New member? </Text>
              <Button
                mode="text"
                compact
                onPress={() => router.push('/(auth)/signup')}
                labelStyle={{ color: colors.primary, fontSize: 14, fontWeight: '700' }}
              >
                Create Account
              </Button>
            </View>
          </Surface>

          <View className="flex-row justify-center items-center mt-12 opacity-40">
            <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '600' }}>V 2.4.0</Text>
            <View className="w-1 h-1 rounded-full bg-white mx-2" />
            <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '600' }}>Privacy Policy</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
