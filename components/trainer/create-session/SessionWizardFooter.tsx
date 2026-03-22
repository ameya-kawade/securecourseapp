import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SessionWizardFooterProps {
  step: number;
  onBack: () => void;
  onNext: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

export const SessionWizardFooter = ({
  step,
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
}: SessionWizardFooterProps) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Feather name="chevron-left" size={20} color="#94A3B8" />
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>

      {!isLastStep && (
        <TouchableOpacity 
          style={styles.nextButtonContainer}
          onPress={onNext}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#60A5FA', '#3B82F6']}
            style={styles.nextButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.nextText}>
              {step === 1 ? 'NEXT' : 'NEXT STEP'}
            </Text>
            <Feather name="chevron-right" size={18} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      )}
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
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  backButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  backText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  nextButtonContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginRight: 6,
    letterSpacing: 0.5,
  },
});
