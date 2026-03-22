import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AssessmentToggleCardProps {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const AssessmentToggleCard = ({ title, subtitle, value, onValueChange, icon }: AssessmentToggleCardProps) => {
  return (
    <View style={styles.toggleCard}>
      <View style={styles.toggleHeader}>
        <MaterialCommunityIcons name={icon} size={24} color="#F8FAFC" style={styles.iconMargin} />
        <View>
          <Text style={styles.toggleTitle}>{title}</Text>
          {subtitle && <Text style={styles.toggleSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#2A3040', true: '#3b82f6' }}
        thumbColor={value ? '#F8FAFC' : '#94A3B8'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1D26',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  toggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginRight: 12,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  toggleSubtitle: {
    fontSize: 12,
    color: '#3b82f6',
    marginTop: 4,
    fontWeight: '500',
  },
});
