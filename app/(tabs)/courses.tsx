// import { View, Text } from 'react-native';
// import GradientBackground from '../../components/GradientBackground';
// import { colors } from '../../theme/colors';

// export default function CoursesScreen() {
//   return (
//     <GradientBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ color: colors.text, fontSize: 18 }}>Courses Content</Text>
//     </GradientBackground>
//   );
// }


// src/screens/CompletedCoursesScreen.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// --- Types ---
interface Course {
  id: string;
  title: string;
  image: string; // Typically a URL, using string for placeholder
  completedDate: string;
  score: number;
}

// --- Mock Data ---
const COMPLETED_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced Project Management',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    completedDate: 'Oct 12, 2023',
    score: 94,
  },
  {
    id: '2',
    title: 'Leadership Essentials',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    completedDate: 'Sep 28, 2023',
    score: 88,
  },
  {
    id: '3',
    title: 'Data Analysis with Python',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    completedDate: 'Aug 15, 2023',
    score: 92,
  },
];

const TABS = ['Allocated', 'In-Progress', 'Completed'];

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'courses', label: 'My Courses', icon: 'book' },
  { id: 'quizzes', label: 'Quizzes', icon: 'frequently-asked-questions' },
  { id: 'profile', label: 'Profile', icon: 'account' },
];

// --- Components ---

const Header = () => (
  <View className="flex-row items-center justify-between px-4 py-3">
    <TouchableOpacity className="p-2 -ml-2">
      <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
    </TouchableOpacity>
    <Text className="text-white text-lg font-bold">My Courses</Text>
    <TouchableOpacity className="p-2 -mr-2">
      <MaterialCommunityIcons name="bell" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

const SearchBar = () => (
  <View className="px-4 py-2">
    <View className="flex-row items-center bg-[#1E293B] rounded-xl px-4 py-3">
      <Feather name="search" size={20} color="#94A3B8" />
      <TextInput
        placeholder="Search completed courses"
        placeholderTextColor="#94A3B8"
        className="flex-1 ml-3 text-white text-base"
        style={{ paddingVertical: 0 }} // Fixes Android vertical alignment
      />
    </View>
  </View>
);

const Tabs = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => (
  <View className="flex-row border-b border-[#1E293B] mt-2">
    {TABS.map((tab) => {
      const isActive = activeTab === tab;
      return (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          className={`flex-1 items-center pb-3 ${isActive ? 'border-b-2 border-[#2563EB]' : ''}`}
        >
          <Text
            className={`text-sm font-semibold ${isActive ? 'text-[#3B82F6]' : 'text-[#94A3B8]'
              }`}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const router = useRouter();

const CourseCard = ({ course }: { course: Course }) => (
  <View className="bg-[#1E293B] rounded-2xl mx-4 mb-5 overflow-hidden border border-[#2D3748]">
    {/* Course Image */}
    <Image
      source={{ uri: course.image }}
      className="w-full h-40"
      resizeMode="cover"
    />

    {/* Course Details */}
    <View className="p-4">
      <Text className="text-white text-lg font-bold mb-3">{course.title}</Text>

      <View className="flex-row items-center mb-1">
        <MaterialCommunityIcons name="calendar-blank" size={16} color="#94A3B8" />
        <Text className="text-[#94A3B8] text-sm ml-2">
          Completed: {course.completedDate}
        </Text>
      </View>

      <View className="flex-row items-center mb-5">
        <MaterialCommunityIcons name="target" size={16} color="#3B82F6" />
        <Text className="text-[#3B82F6] text-sm font-semibold ml-2">
          Final Score: {course.score}%
        </Text>
      </View>

      <Button
        mode="contained"
        buttonColor="#0D6EFD"
        textColor="white"
        icon="download"
        className="rounded-xl"
        contentStyle={{ height: 48 }}
        labelStyle={{ fontWeight: 'bold', fontSize: 14 }}
        onPress={() => {
          console.log('Download certificate');
          router.push(`/(course)/${course.id}`);
        }}
      >
        Download Certificate
      </Button>
    </View>
  </View>
);

// --- Main Screen ---

export default function Courses() {
  const [activeTab, setActiveTab] = useState('Completed');

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <Header />
      <SearchBar />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
        {COMPLETED_COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        {/* Extra padding at the bottom so the last item isn't hidden behind the nav */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}