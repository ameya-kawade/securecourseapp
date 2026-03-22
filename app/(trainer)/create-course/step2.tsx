import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { useCourseCreationStore } from '../../../store/useCourseCreationStore';
import { useFocusEffect } from 'expo-router';

// Modular Components
import { WizardHeader } from '../../../components/trainer/create-course/WizardHeader';
import { SectionHeaderTabs } from '../../../components/trainer/create-course/SectionHeaderTabs';
import { ContentUploadCard } from '../../../components/trainer/create-course/ContentUploadCard';

export default function Step2ContentUpload() {
  const { setStep, courseData, addContentToSection } = useCourseCreationStore();
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'video' | 'document' | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      setStep(2);
    }, [])
  );

  // Sync selected section if list changes or none selected
  useEffect(() => {
    if (courseData.sections.length > 0) {
      if (!selectedSectionId || !courseData.sections.find(s => s.id === selectedSectionId)) {
        setSelectedSectionId(courseData.sections[0].id);
      }
    } else {
      setSelectedSectionId(null);
    }
  }, [courseData.sections]);

  const selectedSection = courseData.sections.find((s) => s.id === selectedSectionId);

  const handleFileUpload = async () => {
    if (!selectedSectionId || !selectedType) return;

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: selectedType === 'video' ? 'video/*' : 'application/pdf',
      });

      if (!result.canceled) {
        const file = result.assets[0];
        addContentToSection(selectedSectionId, {
          type: selectedType,
          title: file.name,
          fileName: file.name,
          fileUri: file.uri,
          fileSize: file.size,
        });
        Alert.alert('Success', `${selectedType === 'video' ? 'Video' : 'Document'} uploaded successfully!`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WizardHeader 
        title="Upload Content" 
        subtitle="Add educational materials to your sections. Students will follow this order."
      />

      {courseData.sections.length > 0 ? (
        <>
          <SectionHeaderTabs 
            sections={courseData.sections}
            selectedId={selectedSectionId}
            onSelect={setSelectedSectionId}
          />

          <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent}>
            <View style={styles.infoBanner}>
              <Text style={styles.infoBannerText}>
                {selectedSection?.content.length || 0} items in {selectedSection?.title}
              </Text>
            </View>

            <ContentUploadCard 
              type="video"
              selected={selectedType === 'video'}
              onSelect={() => setSelectedType('video')}
              onUpload={handleFileUpload}
              title="Video Lesson"
              subtitle="High-definition MP4 or MOV files"
              icon="play-circle-outline"
              dropzoneText="TAP TO SELECT VIDEO"
            />

            <ContentUploadCard 
              type="document"
              selected={selectedType === 'document'}
              onSelect={() => setSelectedType('document')}
              onUpload={handleFileUpload}
              title="Reading Material"
              subtitle="PDF, DOCX or Presentation slides"
              icon="file-document-outline"
              dropzoneText="TAP TO SELECT DOCUMENT"
            />

            <ContentUploadCard 
              type="document"
              selected={false}
              onSelect={() => {}}
              onUpload={() => {}}
              title="Interactive Quiz"
              subtitle="Coming Soon in Beta"
              icon="format-list-bulleted"
              dropzoneText=""
              disabled={true}
            />
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No sections available. Go back and create one.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1117',
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  infoBanner: {
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  infoBannerText: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 16,
  },
});
