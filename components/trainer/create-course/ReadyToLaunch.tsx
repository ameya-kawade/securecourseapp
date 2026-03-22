import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ReadyToLaunch = () => {
  return (
    <View style={styles.readyBox}>
       <MaterialCommunityIcons name="rocket-launch-outline" size={32} color="#5D81F0" style={{ marginBottom: 16 }} />
       <Text style={styles.readyTitle}>Ready to Launch!</Text>
       <Text style={styles.readySubtitle}>
         Press "PUBLISH" below to make this course live.
       </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  readyBox: {
    marginTop: 24,
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#1A1D26',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  readyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  readySubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  }
});
