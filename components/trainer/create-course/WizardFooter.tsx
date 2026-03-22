import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface WizardFooterProps {
  step: number;
  onBack: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const WizardFooter = ({ step, onBack, onNext, isFirstStep, isLastStep }: WizardFooterProps) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBack}
        disabled={isFirstStep}
      >
        <View style={styles.rowCentered}>
          <Feather name="arrow-left" size={18} color="#94A3B8" />
          <Text style={styles.backText}>{isFirstStep ? 'BACK' : 'Previous'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextText}>
          {isLastStep ? 'PUBLISH' : isFirstStep ? 'NEXT' : 'Continue'}
        </Text>
        <Feather name={isLastStep ? 'check' : 'arrow-right'} size={18} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#1A1D26',
    backgroundColor: '#0F1117',
  },
  backButton: {
    paddingVertical: 12,
  },
  rowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#5D81F0',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
