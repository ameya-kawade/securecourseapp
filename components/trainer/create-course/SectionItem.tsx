import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { ScaleDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import { CourseSection } from '../../../store/useCourseCreationStore';

interface SectionItemProps extends RenderItemParams<CourseSection> {
  onUpdateTitle: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export const SectionItem = ({ item, drag, isActive, getIndex, onUpdateTitle, onDelete }: SectionItemProps) => {
  const index = getIndex() || 0;
  const sectionNum = (index + 1).toString().padStart(2, '0');

  return (
    <ScaleDecorator>
      <View style={[styles.sectionCard, isActive && styles.sectionCardActive]}>
        <TouchableOpacity
          style={styles.iconContainer}
          onLongPress={drag}
          delayLongPress={200}
        >
          <Feather 
            name={index === 2 ? 'edit-3' : index === 1 ? 'search' : 'book'} 
            size={24} 
            color="#F8FAFC" 
          />
        </TouchableOpacity>

        <View style={styles.sectionTextContainer}>
          <Text style={styles.sectionSubtitle}>SECTION {sectionNum}</Text>
          <TextInput 
            style={styles.sectionTitleInput} 
            value={item.title}
            onChangeText={(text) => onUpdateTitle(item.id, text)}
            placeholder="Section Title"
            placeholderTextColor="#64748B"
          />
        </View>

        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={styles.deleteButton}
        >
          <Feather name="trash-2" size={20} color="#EF4444" />
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={drag}
          style={styles.dragHandle}
        >
          <MaterialCommunityIcons name="drag-vertical" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>
    </ScaleDecorator>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1D26',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  sectionCardActive: {
    backgroundColor: '#1E293B',
    transform: [{ scale: 1.02 }],
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderLeftColor: '#3b82f6',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2A3040',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionTitleInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    padding: 0,
  },
  dragHandle: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
    marginRight: 4,
  },
});
