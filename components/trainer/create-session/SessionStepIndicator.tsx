import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const STEPS = [
  { id: 1, title: 'SETUP' },
  { id: 2, title: 'TRAINEES' },
  { id: 3, title: 'REVIEW' },
];

interface SessionStepIndicatorProps {
  currentStep: number;
}

export const SessionStepIndicator = ({ currentStep }: SessionStepIndicatorProps) => {
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
              {(isActive || isCompleted || s.id === 3) && (
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
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  stepWrapper: {
    alignItems: 'center',
    width: 60,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
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
    fontWeight: '700',
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
    backgroundColor: '#334155',
    marginTop: 17,
    marginHorizontal: -10,
  },
  connectorLineActive: {
    backgroundColor: '#3b82f6',
  },
});
