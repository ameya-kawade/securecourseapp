import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { AssessmentSettings } from '../../../store/useCourseCreationStore';

interface ExamConfigPanelProps {
  assessment: AssessmentSettings;
  onUpdate: (settings: Partial<AssessmentSettings>) => void;
}

export const ExamConfigPanel = ({ assessment, onUpdate }: ExamConfigPanelProps) => {
  return (
    <View style={styles.examSettingsContent}>
      <Text style={styles.inputLabel}>ASSESSMENT TITLE</Text>
      <TextInput 
        style={styles.textInput}
        value={assessment.title}
        onChangeText={(text) => onUpdate({ title: text })}
        placeholder="Assessment Title"
        placeholderTextColor="#64748B"
      />

      <View style={styles.rowInputs}>
        <View style={styles.flexHalf}>
          <Text style={styles.inputLabel}>PASSING SCORE</Text>
          <View style={styles.numberInputContainer}>
            <TextInput 
              style={styles.numberInput}
              value={assessment.passingScore.toString()}
              onChangeText={(text) => onUpdate({ passingScore: parseInt(text) || 0 })}
              keyboardType="numeric"
            />
            <Text style={styles.percentageSymbol}>%</Text>
          </View>
        </View>

        <View style={styles.flexHalf}>
          <Text style={styles.inputLabel}>RETAKE ATTEMPTS</Text>
          <View style={styles.selectContainer}>
            <Text style={styles.selectText}>{assessment.retakes} Attempts</Text>
            <Feather name="chevron-down" size={20} color="#94A3B8" />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.configureButton}>
        <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#FFF" />
        <Text style={styles.configureButtonText}>Configure Questions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  examSettingsContent: {
    padding: 20,
    backgroundColor: '#1A1D26',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginTop: -16, // overlap with the toggle card bottom
    zIndex: -1,
    paddingTop: 32,
  },
  inputLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 4,
  },
  textInput: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 16,
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  flexHalf: {
    flex: 1,
  },
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  numberInput: {
    flex: 1,
    paddingVertical: 16,
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '500',
  },
  percentageSymbol: {
    color: '#94A3B8',
    fontSize: 16,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  selectText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '500',
  },
  configureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D81F0',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  configureButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
