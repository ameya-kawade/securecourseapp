import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CreatorTip = () => {
  return (
    <View style={styles.tipBox}>
      <View style={styles.tipHeader}>
        <MaterialCommunityIcons name="lightbulb-outline" size={18} color="#f97316" />
        <Text style={styles.tipTitle}>CREATOR TIP</Text>
      </View>
      <Text style={styles.tipText}>
        "Keep sections between 5-10 minutes of content to maximize student retention and course completion rates."
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tipBox: {
    backgroundColor: '#1A1D26',
    borderRadius: 16,
    padding: 20,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    color: '#f97316',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginLeft: 8,
  },
  tipText: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
