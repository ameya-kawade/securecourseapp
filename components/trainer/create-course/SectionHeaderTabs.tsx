import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CourseSection } from '../../../store/useCourseCreationStore';

interface SectionHeaderTabsProps {
  sections: CourseSection[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const SectionHeaderTabs = ({ sections, selectedId, onSelect }: SectionHeaderTabsProps) => {
  return (
    <View style={styles.sectionSelectionContainer}>
      <Text style={styles.selectLabel}>SELECT TO UPLOAD</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sectionScrollParams}>
        {sections.map((sec) => (
          <TouchableOpacity
            key={sec.id}
            style={[
              styles.sectionTab,
              selectedId === sec.id && styles.sectionTabActive
            ]}
            onPress={() => onSelect(sec.id)}
          >
            <Text style={[
              styles.sectionTabText,
              selectedId === sec.id && styles.sectionTabTextActive
            ]}>
              {sec.title || 'Untitled'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionSelectionContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1D26',
  },
  selectLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionScrollParams: {
    paddingHorizontal: 20,
    gap: 12,
  },
  sectionTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1A1D26',
    borderWidth: 1,
    borderColor: '#2A3040',
  },
  sectionTabActive: {
    backgroundColor: '#3b82f633',
    borderColor: '#3b82f6',
  },
  sectionTabText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTabTextActive: {
    color: '#3b82f6',
  },
});
