import React from 'react';
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useCourseCreationStore, CourseSection } from '../../../store/useCourseCreationStore';
import { useFocusEffect } from 'expo-router';

// Modular Components
import { WizardHeader } from '../../../components/trainer/create-course/WizardHeader';
import { SectionItem } from '../../../components/trainer/create-course/SectionItem';
import { CreatorTip } from '../../../components/trainer/create-course/CreatorTip';

export default function Step1CourseStructure() {
  const { setStep, courseData, addSection, reorderSections, updateSectionTitle, deleteSection } = useCourseCreationStore();

  useFocusEffect(
    React.useCallback(() => {
      setStep(1);
    }, [])
  );

  const renderItem = (params: RenderItemParams<CourseSection>) => (
    <SectionItem 
      {...params} 
      onUpdateTitle={updateSectionTitle} 
      onDelete={deleteSection} 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
        >
          <WizardHeader 
            title="Course Structure" 
            subtitle="Define the high-level roadmap of your curriculum. You can reorder sections at any time."
          />

          <DraggableFlatList
            data={courseData.sections}
            onDragEnd={({ data }) => reorderSections(data)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={
              <>
                <TouchableOpacity style={styles.addButton} onPress={addSection}>
                  <View style={styles.addIconCircle}>
                    <Feather name="plus" size={20} color="#F8FAFC" />
                  </View>
                  <Text style={styles.addButtonText}>ADD NEW SECTION</Text>
                </TouchableOpacity>

                <CreatorTip />
              </>
            }
          />
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1117',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#2A3040',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 20,
    marginTop: 8,
    marginBottom: 32,
  },
  addIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A3040',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
});
