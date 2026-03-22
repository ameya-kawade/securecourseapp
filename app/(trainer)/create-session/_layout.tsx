import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSessionCreationStore } from '../../../store/useSessionCreationStore';

import { SessionStepIndicator } from '../../../components/trainer/create-session/SessionStepIndicator';
import { SessionWizardFooter } from '../../../components/trainer/create-session/SessionWizardFooter';

export default function CreateSessionLayout() {
  const router = useRouter();
  const { step, setStep, resetStore } = useSessionCreationStore();

  const handleClose = () => {
    Alert.alert(
      "Discard Session?",
      "Are you sure you want to discard this session? All progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Discard", onPress: () => {
            resetStore();
            router.back();
          }, 
          style: "destructive" 
        }
      ]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      if (step === 1) router.push('/(trainer)/create-session/step2');
      if (step === 2) router.push('/(trainer)/create-session/step3');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      router.back();
    } else {
      handleClose();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}><TouchableOpacity onPress={handleClose} style={styles.closeButton}><Feather name="arrow-left" size={24} color="#E2E8F0" /></TouchableOpacity><Text style={styles.headerTitle}>Create Session</Text><View style={{ width: 32 }} /></View>

      <SessionStepIndicator currentStep={step} />

      <View style={styles.content}>
        <Slot />
      </View>

      {/* Only show the wizard footer on steps 1 and 2. Step 3 has its own specific buttons. */}
      {step < 3 && (
        <SessionWizardFooter 
          step={step}
          onBack={handleBack}
          onNext={handleNext}
          isFirstStep={step === 1}
          isLastStep={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
});
