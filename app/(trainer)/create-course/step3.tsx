import React from 'react';
import { StyleSheet, ScrollView, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCourseCreationStore } from '../../../store/useCourseCreationStore';
import { useFocusEffect } from 'expo-router';

// Modular Components
import { WizardHeader } from '../../../components/trainer/create-course/WizardHeader';
import { AssessmentToggleCard } from '../../../components/trainer/create-course/AssessmentToggleCard';
import { ExamConfigPanel } from '../../../components/trainer/create-course/ExamConfigPanel';
import { SmallAssessmentCard } from '../../../components/trainer/create-course/SmallAssessmentCard';

export default function Step3AssessmentSettings() {
  const { setStep, courseData, updateAssessmentSettings } = useCourseCreationStore();
  const { assessment } = courseData;

  useFocusEffect(
    React.useCallback(() => {
      setStep(3);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.flex1} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <WizardHeader 
          title="Assessment Settings" 
          subtitle="Define how students will be evaluated for their certification."
        />

        <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent}>
          <AssessmentToggleCard 
            title="Pre-Assessment" 
            subtitle="ENABLED"
            value={assessment.isPreAssessmentEnabled}
            onValueChange={(val) => updateAssessmentSettings({ isPreAssessmentEnabled: val })}
            icon="clipboard-check-outline"
          />

          <AssessmentToggleCard 
            title="Final Certification Exam" 
            value={assessment.isFinalExamEnabled}
            onValueChange={(val) => updateAssessmentSettings({ isFinalExamEnabled: val })}
            icon="certificate-outline"
          />

          {assessment.isFinalExamEnabled && (
            <ExamConfigPanel 
              assessment={assessment}
              onUpdate={updateAssessmentSettings}
            />
          )}

          <View style={styles.additionalSettings}>
            <Text style={styles.sectionHeader}>ADDITIONAL OPTIONS</Text>
            <View style={styles.rowCards}>
              <SmallAssessmentCard 
                icon="clock-outline"
                label={`${assessment.timeLimit}m Limit`}
                active={!!assessment.timeLimit}
                onPress={() => {}}
              />
              <SmallAssessmentCard 
                icon="shuffle-variant"
                label="Randomized"
                active={!!assessment.isRandomized}
                onPress={() => updateAssessmentSettings({ isRandomized: !assessment.isRandomized })}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1117',
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  additionalSettings: {
    marginTop: 24,
  },
  sectionHeader: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 16,
  },
  rowCards: {
    flexDirection: 'row',
    gap: 16,
  },
});
