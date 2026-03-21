// import { View, Text } from 'react-native';
// import GradientBackground from '@/components/GradientBackground';
// import { colors } from '@/theme/colors';

// export default function CoursesScreen() {
//   return (
//     <GradientBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ color: colors.text, fontSize: 18 }}>Courses Content</Text>
//     </GradientBackground>
//   );
// }


// src/screens/CompletedCoursesScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StatusBar, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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

import { TabView, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';

const CourseCard = ({ course }: { course: Course }) => {
  const router = useRouter();
  return (
    <Pressable
      className="bg-[#1E293B] rounded-2xl mx-4 mb-5 overflow-hidden border border-[#2D3748]"
      onPress={() => {
        router.push(`/(trainee)/(course)/${course.id}`);
      }}
    >
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
          }}
        >
          Download Certificate
        </Button>
      </View>
    </Pressable>
  )
};

// --- Main Screen ---

export default function Courses() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(2);
  const [routes] = useState([
    { key: 'allocated', title: 'Allocated' },
    { key: 'in_progress', title: 'In-Progress' },
    { key: 'completed', title: 'Completed' },
  ]);

  const AllocatedRoute = () => (
    <View className="flex-1 items-center justify-center">
      <Text className="text-[#94A3B8]">No allocated courses.</Text>
    </View>
  );

  const InProgressRoute = () => (
    <View className="flex-1 items-center justify-center">
      <Text className="text-[#94A3B8]">No courses in progress.</Text>
    </View>
  );

  const CompletedRoute = () => (
    <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
      {COMPLETED_COURSES.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
      <View className="h-6" />
    </ScrollView>
  );

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'allocated':
        return <AllocatedRoute />;
      case 'in_progress':
        return <InProgressRoute />;
      case 'completed':
        return <CompletedRoute />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#2563EB', height: 2 }}
      style={{ backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: '#1E293B', elevation: 0 }}
      activeColor="#3B82F6"
      inactiveColor="#94A3B8"
      labelStyle={{ fontWeight: '600', textTransform: 'none', fontSize: 14 }}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A] pt-5">
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      {/* 
      <Header /> */}
      <SearchBar />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
}