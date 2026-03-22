import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SmallAssessmentCardProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  active: boolean;
  onPress: () => void;
}

export const SmallAssessmentCard = ({ icon, label, active, onPress }: SmallAssessmentCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.smallCard}
      onPress={onPress}
    >
      <MaterialCommunityIcons 
        name={icon} 
        size={20} 
        color={active ? "#F8FAFC" : "#64748B"} 
      />
      <Text style={[styles.smallCardText, active && { color: '#F8FAFC' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  smallCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1D26',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  smallCardText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});
