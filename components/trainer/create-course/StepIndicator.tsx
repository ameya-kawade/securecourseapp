import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const STEPS = [
  { id: 1, title: 'STRUCTURE' },
  { id: 2, title: 'CONTENT' },
  { id: 3, title: 'ASSESS' },
  { id: 4, title: 'REVIEW' },
];

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <View style={styles.stepperContainer}>
      {STEPS.map((s, idx) => {
        const isActive = currentStep === s.id;
        const isCompleted = currentStep > s.id;
        
        return (
          <React.Fragment key={s.id}>
            <View style={styles.stepWrapper}>
              <View style={[
                styles.stepCircle,
                isActive && styles.stepCircleActive,
                isCompleted && styles.stepCircleCompleted
              ]}>
                {isCompleted ? (
                  <Feather name="check" size={14} color="#FFF" />
                ) : (
                  <Text style={[
                    styles.stepNumber,
                    (isActive || isCompleted) && styles.stepNumberActive
                  ]}>
                    {s.id}
                  </Text>
                )}
              </View>
              {(isActive || isCompleted || s.id === 4) && (
                <Text style={[
                  styles.stepLabel,
                  isActive && styles.stepLabelActive,
                  isCompleted && styles.stepLabelCompleted,
                ]}>
                  {s.title}
                </Text>
              )}
            </View>

            {idx < STEPS.length - 1 && (
              <View style={[
                styles.connectorLine,
                currentStep > s.id && styles.connectorLineActive
              ]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  stepWrapper: {
    alignItems: 'center',
    width: 60,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A1D26',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  stepCircleCompleted: {
    backgroundColor: '#3b82f6',
  },
  stepNumber: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  stepNumberActive: {
    color: '#FFFFFF',
  },
  stepLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  stepLabelActive: {
    color: '#F8FAFC',
  },
  stepLabelCompleted: {
    color: '#94A3B8',
  },
  connectorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#1E293B',
    marginTop: 15,
    marginHorizontal: -10,
  },
  connectorLineActive: {
    backgroundColor: '#3b82f6',
  },
});
