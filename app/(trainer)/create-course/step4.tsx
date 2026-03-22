import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCourseCreationStore } from '../../../store/useCourseCreationStore';
import { useFocusEffect } from 'expo-router';

// Modular Components
import { WizardHeader } from '../../../components/trainer/create-course/WizardHeader';
import { ReviewSummaryCard } from '../../../components/trainer/create-course/ReviewSummaryCard';
import { SummaryRow } from '../../../components/trainer/create-course/SummaryRow';
import { ReadyToLaunch } from '../../../components/trainer/create-course/ReadyToLaunch';

export default function Step4ReviewPublish() {
  const { setStep, courseData } = useCourseCreationStore();
  const { assessment, sections } = courseData;

  useFocusEffect(
    React.useCallback(() => {
      setStep(4);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <WizardHeader 
        title="Review & Publish" 
        subtitle="Last check before your course goes live. Ensure everything looks perfect."
      />

      <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent}>
        <ReviewSummaryCard title="General Info">
           <SummaryRow 
             icon="format-title" 
             label="COURSE TITLE" 
             value={courseData.title || 'Untitled Course'} 
           />
           <View style={styles.divider} />
           <SummaryRow 
             icon="text-box-outline" 
             label="DESCRIPTION" 
             value={courseData.description || 'No description provided'} 
           />
        </ReviewSummaryCard>

        <ReviewSummaryCard title="Curriculum">
           <SummaryRow icon="layers-outline" label="TOTAL SECTIONS">
              {sections.map((sec, idx) => (
                <View key={sec.id} style={styles.sectionEntry}>
                   <Text style={styles.sectionTitleText}>
                     {idx + 1}. {sec.title}
                   </Text>
                   <Text style={styles.sectionItemCount}>
                     {sec.content.length} {sec.content.length === 1 ? 'item' : 'items'}
                   </Text>
                </View>
              ))}
           </SummaryRow>
        </ReviewSummaryCard>

        <ReviewSummaryCard title="Assessment">
           <SummaryRow 
             icon="certificate-outline" 
             label="FINAL EXAM" 
             value={assessment.isFinalExamEnabled ? 'Enabled' : 'Disabled'} 
           />
           {assessment.isFinalExamEnabled && (
             <>
               <View style={styles.divider} />
               <View style={styles.row}>
                 <SummaryRow 
                   icon="target" 
                   label="PASSING" 
                   value={`${assessment.passingScore}%`} 
                 />
                 <SummaryRow 
                   icon="refresh" 
                   label="RETAKES" 
                   value={`${assessment.retakes}`} 
                 />
               </View>
             </>
           )}
        </ReviewSummaryCard>

        <ReadyToLaunch />
      </ScrollView>
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
  divider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 20,
  },
  sectionEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  sectionTitleText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '500',
  },
  sectionItemCount: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
  },
});
