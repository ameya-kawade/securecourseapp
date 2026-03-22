import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSessionCreationStore } from '../../../store/useSessionCreationStore';

export default function SessionStep3() {
  const router = useRouter();
  const { sessionData, setStep, resetStore } = useSessionCreationStore();

  const handleModify = () => {
    setStep(1);
    router.replace('/(trainer)/create-session/step1');
  };

  const handleSaveDraft = () => {
    Alert.alert("Draft Saved", "Your session draft has been saved locally.");
    resetStore();
    router.replace('/(trainer)/(tabs)/schedule');
  };

  const handleSchedule = () => {
    Alert.alert("Session Scheduled!", "The session has been scheduled and trainees notified.");
    resetStore();
    router.replace('/(trainer)/(tabs)/schedule');
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not Set';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (time: Date | null) => {
    if (!time) return 'Not Set';
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const traineeCount = sessionData.selectedTraineeIds.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Final Review</Text>
      <Text style={styles.subtitle}>
        Verify the session details before broadcasting to the trainees.
      </Text>

      {/* Blueprint Card */}
      <View style={styles.blueprintCard}>
        <View style={styles.blueprintHeader}>
          <View>
            <Text style={styles.blueprintLabel}>BLUEPRINT</Text>
            <Text style={styles.courseTitle}>
              {sessionData.courseModule || 'Course Module Not Selected'}
            </Text>
          </View>
          <View style={styles.docIconContainer}>
            <Feather name="file-text" size={20} color="#F8FAFC" />
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <MaterialCommunityIcons name="map-marker" size={18} color="#94A3B8" />
          </View>
          <View>
            <Text style={styles.detailLabel}>TRAINING SITE</Text>
            <Text style={styles.detailValue}>{sessionData.trainingSite || 'Not Selected'}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Feather name="users" size={16} color="#94A3B8" />
          </View>
          <View>
            <Text style={styles.detailLabel}>TRAINEE COUNT</Text>
            <Text style={styles.detailValue}>{traineeCount} Participants</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Feather name="calendar" size={16} color="#94A3B8" />
          </View>
          <View>
            <Text style={styles.detailLabel}>DATE & TIME</Text>
            <Text style={styles.detailValue}>
              {formatDate(sessionData.startDate)} • {formatTime(sessionData.startTime)}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.modifyButton} onPress={handleModify} activeOpacity={0.8}>
          <Feather name="edit-2" size={14} color="#E2E8F0" />
          <Text style={styles.modifyButtonText}>Modify Details</Text>
        </TouchableOpacity>
      </View>

      {/* Primary Actions */}
      <TouchableOpacity onPress={handleSchedule} activeOpacity={0.8} style={styles.primaryButtonWrapper}>
        <LinearGradient
          colors={['#60A5FA', '#3B82F6']}
          style={styles.primaryButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.primaryButtonText}>Schedule Session</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSaveDraft} activeOpacity={0.8} style={styles.draftButton}>
        <Text style={styles.draftButtonText}>Save as Draft</Text>
      </TouchableOpacity>

      {/* Expert Tip */}
      <View style={styles.tipCard}>
        <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#FDBA74" style={styles.tipIcon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.tipBold}>Expert Tip: Pre-requisites</Text>
          <Text style={styles.tipText}>
            Ensure all {traineeCount} trainees have completed the &apos;Safety Protocols&apos; module. Sessions scheduled without prerequisite checks see a 30% lower completion rate.
          </Text>
        </View>
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
  blueprintCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  blueprintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  blueprintLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FDBA74',
    letterSpacing: 1,
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
    paddingRight: 10,
  },
  docIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  modifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 8,
  },
  modifyButtonText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
  primaryButtonWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginBottom: 16,
  },
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 24,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  draftButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 30,
  },
  draftButtonText: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#1F1514', // specialized background resembling dark reddish-brown
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3F221E', // accent borders
  },
  tipIcon: {
    marginRight: 16,
  },
  tipBold: {
    fontWeight: '700',
    color: '#FDBA74', // highlight accent
    fontSize: 14,
    marginBottom: 6,
  },
  tipText: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
  },
});
