import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SummaryRowProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value?: string;
  children?: React.ReactNode;
}

export const SummaryRow = ({ icon, label, value, children }: SummaryRowProps) => {
  return (
    <View style={styles.summaryRow}>
      <MaterialCommunityIcons name={icon} size={24} color="#94A3B8" />
      <View style={styles.summaryTextContainer}>
        <Text style={styles.summaryLabel}>{label}</Text>
        {value && <Text style={styles.summaryValue}>{value}</Text>}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  summaryTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '500',
  },
});
