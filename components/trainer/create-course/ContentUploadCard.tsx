import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ContentItemType } from '../../../store/useCourseCreationStore';

interface ContentUploadCardProps {
  type: ContentItemType;
  selected: boolean;
  onSelect: () => void;
  onUpload: () => void;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  dropzoneText: string;
  disabled?: boolean;
}

export const ContentUploadCard = ({
  type,
  selected,
  onSelect,
  onUpload,
  title,
  subtitle,
  icon,
  dropzoneText,
  disabled
}: ContentUploadCardProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.typeCard,
        selected && styles.typeCardSelected,
        disabled && styles.typeCardDisabled
      ]}
      onPress={onSelect}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, disabled && { backgroundColor: '#1A1D26' }]}>
          <MaterialCommunityIcons 
            name={icon} 
            size={24} 
            color={disabled ? '#475569' : '#F8FAFC'} 
          />
        </View>
        <View style={styles.cardTextContent}>
          <Text style={[styles.cardTitle, disabled && { color: '#475569' }]}>{title}</Text>
          <Text style={[
            styles.cardSubtitle, 
            disabled && { color: '#f97316', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }
          ]}>
            {subtitle}
          </Text>
        </View>
        {!disabled && (
          <View style={styles.radioCircle}>
            {selected && <View style={styles.radioInner} />}
          </View>
        )}
      </View>

      {selected && !disabled && (
        <TouchableOpacity style={styles.dropzone} onPress={onUpload}>
          <MaterialCommunityIcons name="file-upload-outline" size={32} color="#94A3B8" />
          <Text style={styles.dropzoneText}>{dropzoneText}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  typeCard: {
    backgroundColor: '#1A1D26',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    borderColor: '#3b82f6',
  },
  typeCardDisabled: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#2A3040',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTextContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
  },
  dropzone: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#2A3040',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropzoneText: {
    marginTop: 12,
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
