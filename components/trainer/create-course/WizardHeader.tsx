import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WizardHeaderProps {
  title: string;
  subtitle: string;
}

export const WizardHeader = ({ title, subtitle }: WizardHeaderProps) => {
  return (
    <View style={styles.headerArea}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerArea: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 24,
  },
});
