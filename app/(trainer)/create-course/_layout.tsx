import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useCourseCreationStore } from '../../../store/useCourseCreationStore';

// Modular Components
import { StepIndicator } from '../../../components/trainer/create-course/StepIndicator';
import { WizardFooter } from '../../../components/trainer/create-course/WizardFooter';

export default function CreateCourseLayout() {
  const router = useRouter();
  const { step, setStep, resetStore } = useCourseCreationStore();

  const handleClose = () => {
    Alert.alert(
      "Discard Course?",
      "Are you sure you want to discard this course? All progress will be lost.",
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

  const handleSave = () => {
    Alert.alert("Draft Saved", "Your course progress has been saved locally.");
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      if (step === 1) router.push('/(trainer)/create-course/step2');
      if (step === 2) router.push('/(trainer)/create-course/step3');
      if (step === 3) router.push('/(trainer)/create-course/step4');
    } else {
      // Step 4: PUBLISH
      Alert.alert(
        "Course Published!",
        "Your course is now live and available to students.",
        [{ text: "Great!", onPress: () => {
            resetStore();
            router.replace('/(trainer)/(tabs)/schedule');
        }}]
      );
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
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Feather name="x" size={24} color="#E2E8F0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Course</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.headerSave}>Save</Text>
        </TouchableOpacity>
      </View>

      <StepIndicator currentStep={step} />

      <View style={styles.content}>
        <Slot />
      </View>

      <WizardFooter 
        step={step}
        onBack={handleBack}
        onNext={handleNext}
        isFirstStep={step === 1}
        isLastStep={step === 4}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1117',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1D26',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E2E8F0',
  },
  headerSave: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D81F0',
  },
  content: {
    flex: 1,
  },
});
