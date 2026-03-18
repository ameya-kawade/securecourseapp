import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import {
  Text,
  IconButton,
  Card as PaperCard,
  ProgressBar,
  Surface,
  Avatar,
  FAB,
  Button
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '../../components/GradientBackground';
import StatCard from '../../components/StatCard';
import CourseCard from '../../components/CourseCard';
import DashboardHeader from '../../components/DashboardHeader';
import WelcomeSection from '../../components/WelcomeSection';
import ComplianceStatus from '../../components/ComplianceStatus';

import DocumentItem from '../../components/DocumentItem';
import { colors } from '../../theme/colors';

const MOCK_COURSES = [
  { id: '1', title: 'Advanced React Patterns', progress: 65, tag: 'TECH' },
  { id: '2', title: 'Data Structures and Algos', progress: 30, tag: 'TECH' },
];

export default function Dashboard() {
  const renderCourse = ({ item }: { item: typeof MOCK_COURSES[0] }) => (
    <CourseCard 
      title={item.title} 
      progress={item.progress} 
      tag={item.tag} 
    />
  );

  return (
    <GradientBackground className="flex-1">
      <ScrollView contentContainerStyle={{ padding: 32, paddingTop: 80, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

        <DashboardHeader />

        <WelcomeSection userName="Alex" weeklyGoalPercentage={75} />

        {/* Stats Row */}
        <View className="flex-row justify-between mb-8">
          <StatCard title="In Progress" value="4" tint="#1D6FEA" />
          <StatCard title="Completed" value="12" tint="#34C759" />
          <StatCard title="Avg. Score" value="88%" tint="#FFCC00" />
        </View>

        {/* My Learning */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text style={{ fontSize: 24, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1 }}>My Learning</Text>
            <TouchableOpacity>
              <Text className="text-[#1D6FEA] text-sm font-semibold">View All</Text>
            </TouchableOpacity>
          </View>
          {MOCK_COURSES.map((item) => (
            <CourseCard 
              key={item.id}
              title={item.title} 
              progress={item.progress} 
              tag={item.tag} 
            />
          ))}
        </View>

        <ComplianceStatus percentage={85} />

        {/* Reports & Documents */}
        <View className="flex-row justify-between items-center mb-6">
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 }}>Reports & Documents</Text>
          <Button mode="text" compact onPress={() => { }}>View All</Button>
        </View>

        <View className="bg-transparent rounded-[40px] border border-white/10 overflow-hidden">
          {[
            { id: '1', title: 'Q3 Training Report', date: 'Oct 12, 2025', icon: 'file-document-outline' },
            { id: '2', title: 'Safety Certificate', date: 'Sep 30, 2025', icon: 'certificate-outline' },
          ].map((item) => (
            <DocumentItem 
              key={item.id}
              title={item.title} 
              date={item.date} 
              icon={item.icon} 
            />
          ))}
        </View>

        {/* Padding for bottom nav */}
        <View style={{ height: 48 }} />

      </ScrollView>
    </GradientBackground>
  );
}
