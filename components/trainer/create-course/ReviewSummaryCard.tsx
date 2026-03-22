import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ReviewSummaryCardProps {
  title: string;
  children: React.ReactNode;
}

export const ReviewSummaryCard = ({ title, children }: ReviewSummaryCardProps) => {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#1A1D26',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
