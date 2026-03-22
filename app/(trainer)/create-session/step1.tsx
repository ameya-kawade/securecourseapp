import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Card } from 'react-native-paper';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSessionCreationStore } from '../../../store/useSessionCreationStore';

export default function SessionStep1() {
  const { sessionData, setSessionBasics } = useSessionCreationStore();
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSessionBasics({ startDate: selectedDate });
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setSessionBasics({ startTime: selectedTime });
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'MM/DD/YYYY';
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const formatTime = (time: Date | null) => {
    if (!time) return '00:00 AM';
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Session Basics</Text>
      <Text style={styles.subtitle}>
        Define the environment and core curriculum for this training event.
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>CLIENT NAME</Text>
        <TouchableOpacity style={styles.dropdownInput}>
          <Text style={[styles.inputText, !sessionData.clientName && styles.placeholderText]}>
            {sessionData.clientName || 'Select Global Client'}
          </Text>
          <Feather name="chevron-down" size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>TRAINING SITE</Text>
        <TouchableOpacity style={styles.dropdownInput}>
          <Text style={[styles.inputText, !sessionData.trainingSite && styles.placeholderText]}>
            {sessionData.trainingSite || 'Select Campus Location'}
          </Text>
          <MaterialCommunityIcons name="map-marker-outline" size={20} color="#E2E8F0" />
        </TouchableOpacity>
      </View>

      <Card style={styles.curriculumCard}>
        <Card.Content>
          <Text style={styles.cardLabel}>CURRICULUM</Text>
          <Text style={styles.hintText}>Course / Module</Text>
          <TouchableOpacity style={styles.curriculumSelector}>
            <Text style={[styles.inputText, !sessionData.courseModule && styles.placeholderText]}>
              {sessionData.courseModule || 'Advanced Leadership 402'}
            </Text>
            <MaterialCommunityIcons name="school-outline" size={22} color="#E2E8F0" />
          </TouchableOpacity>
        </Card.Content>
      </Card>

      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>START DATE</Text>
          <TouchableOpacity style={styles.dropdownInput} onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.inputText, !sessionData.startDate && styles.placeholderText]}>
              {formatDate(sessionData.startDate)}
            </Text>
            <Feather name="calendar" size={18} color="#E2E8F0" />
          </TouchableOpacity>
        </View>

        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>START TIME</Text>
          <TouchableOpacity style={styles.dropdownInput} onPress={() => setShowTimePicker(true)}>
            <Text style={[styles.inputText, !sessionData.startTime && styles.placeholderText]}>
              {formatTime(sessionData.startTime)}
            </Text>
            <Feather name="clock" size={18} color="#E2E8F0" />
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={sessionData.startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={sessionData.startTime || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {/* Pro Tip Card */}
      <View style={styles.proTipCard}>
        <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#FDBA74" style={styles.tipIcon} />
        <Text style={styles.tipText}>
          <Text style={styles.tipBold}>Pro Tip: </Text>
          Afternoon sessions show a 15% higher retention rate for this specific module.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 22,
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E2E8F0',
    letterSpacing: 1,
    marginBottom: 8,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputText: {
    color: '#F8FAFC',
    fontSize: 15,
  },
  placeholderText: {
    color: '#94A3B8',
  },
  curriculumCard: {
    backgroundColor: '#161E2E', // slightly different background
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 12,
  },
  hintText: {
    color: '#E2E8F0',
    fontSize: 12,
    marginBottom: 8,
  },
  curriculumSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  proTipCard: {
    flexDirection: 'row',
    backgroundColor: '#1F1514', // specialized background resembling dark reddish-brown
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3F221E', // accent borders
  },
  tipIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#E2E8F0',
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: '700',
    color: '#FDBA74', // highlight accent
  },
});
