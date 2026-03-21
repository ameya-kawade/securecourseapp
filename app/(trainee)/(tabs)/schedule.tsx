// src/screens/ScheduleScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Types ---
type SessionCategory = 'VIRTUAL' | 'CLASSROOM' | 'SELF_PACED';
type SessionStatus = 'LIVE_NOW' | 'SCHEDULED' | 'COMPLETED';

interface ScheduleSession {
  id: string;
  category: SessionCategory;
  categoryLabel: string;
  title: string;
  status: SessionStatus;
  date: string;
  time: string;
  locationIcon: keyof typeof MaterialCommunityIcons.glyphMap;
  locationText: string;
  isLink?: boolean;
}

// --- Mock Data ---
const SCHEDULE_DATA: ScheduleSession[] = [
  {
    id: '1',
    category: 'VIRTUAL',
    categoryLabel: 'VIRTUAL SESSION',
    title: 'Advanced React Hooks',
    status: 'LIVE_NOW',
    date: 'Oct 24, 2023',
    time: '10:00 AM - 11:30 AM',
    locationIcon: 'link-variant',
    locationText: 'zoom.us/j/882349122',
    isLink: true,
  },
  {
    id: '2',
    category: 'CLASSROOM',
    categoryLabel: 'CLASSROOM',
    title: 'System Architecture 101',
    status: 'SCHEDULED',
    date: 'Oct 25, 2023',
    time: '02:00 PM - 04:00 PM',
    locationIcon: 'map-marker-outline',
    locationText: 'Training Center, Room 402',
  },
  {
    id: '3',
    category: 'SELF_PACED',
    categoryLabel: 'SELF-PACED REVIEW',
    title: 'Database Design Patterns',
    status: 'COMPLETED',
    date: 'Oct 23, 2023',
    time: '09:00 AM - 10:30 AM',
    locationIcon: 'check-circle-outline',
    locationText: 'Submitted for review',
  },
];

const TABS = ['Upcoming', 'Today', 'Past'];

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', icon: 'home-outline', activeIcon: 'home' },
  { id: 'schedule', label: 'SCHEDULE', icon: 'calendar-blank-outline', activeIcon: 'calendar' },
  { id: 'courses', label: 'COURSES', icon: 'book-open-outline', activeIcon: 'book-open' },
  { id: 'profile', label: 'PROFILE', icon: 'account-circle-outline', activeIcon: 'account-circle' },
];

// --- Components ---

const Header = () => (
  <View className="flex-row items-center justify-between px-6 py-4 border-b border-[#1E293B]">
    <Text className="text-white text-2xl font-bold">My Schedule</Text>
    <View className="flex-row items-center gap-x-3">
      <TouchableOpacity className="w-10 h-10 bg-[#1A2235] rounded-full items-center justify-center">
        <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="#3B82F6" />
      </TouchableOpacity>
      <TouchableOpacity className="w-10 h-10 bg-[#1A2235] rounded-full items-center justify-center">
        <MaterialCommunityIcons name="bell-outline" size={20} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  </View>
);

import { TabView, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';

const SessionCard = ({ session }: { session: ScheduleSession }) => {
  // Configuration maps for different session types
  const typeConfig = {
    VIRTUAL: {
      icon: 'video-outline',
      iconColor: '#3B82F6', // Blue
      iconBg: '#172554',
      labelColor: '#3B82F6',
      cardStyle: '',
    },
    CLASSROOM: {
      icon: 'office-building',
      iconColor: '#F59E0B', // Amber
      iconBg: '#451A03',
      labelColor: '#F59E0B',
      cardStyle: '',
    },
    SELF_PACED: {
      icon: 'book-open-outline',
      iconColor: '#A855F7', // Purple
      iconBg: '#3B0764',
      labelColor: '#A855F7',
      cardStyle: 'opacity-50', // Dimmed look for completed/past items
    },
  }[session.category];

  const statusConfig = {
    LIVE_NOW: {
      label: 'LIVE NOW',
      bgClass: 'bg-[#064E3B]',
      textClass: 'text-[#34D399]',
      borderClass: 'border-transparent',
    },
    SCHEDULED: {
      label: 'SCHEDULED',
      bgClass: 'bg-transparent',
      textClass: 'text-[#94A3B8]',
      borderClass: 'border-[#334155]',
    },
    COMPLETED: {
      label: 'COMPLETED',
      bgClass: 'bg-transparent',
      textClass: 'text-[#475569]',
      borderClass: 'border-[#334155]',
    },
  }[session.status];

  return (
    <View className={`bg-[#1A2235] rounded-2xl mx-5 mb-4 border border-[#2A3447] relative overflow-hidden ${typeConfig.cardStyle}`}>

      {/* Active Blue left border for Live Now */}
      {session.status === 'LIVE_NOW' && (
        <View className="absolute left-0 top-0 bottom-0 w-1 bg-[#00E5FF]" />
      )}

      <View className="p-5">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-row items-center flex-1 pr-2">
            {/* Category Icon */}
            <View
              className="w-12 h-12 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: typeConfig.iconBg }}
            >
              <MaterialCommunityIcons name={typeConfig.icon as any} size={24} color={typeConfig.iconColor} />
            </View>

            <View className="flex-1">
              <Text
                className="text-[10px] font-bold tracking-widest uppercase mb-1"
                style={{ color: typeConfig.labelColor }}
              >
                {session.categoryLabel}
              </Text>
              <Text className="text-white text-lg font-bold leading-tight">
                {session.title}
              </Text>
            </View>
          </View>

          {/* Status Badge */}
          <View className={`px-3 py-1.5 rounded-full border ${statusConfig.bgClass} ${statusConfig.borderClass}`}>
            <Text className={`text-[10px] font-bold tracking-widest ${statusConfig.textClass}`}>
              {statusConfig.label}
            </Text>
          </View>
        </View>

        {/* Details section */}
        <View className="mt-1">
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons name="calendar-blank-outline" size={16} color="#94A3B8" />
            <Text className="text-[#94A3B8] text-sm ml-2">
              {session.date} • {session.time}
            </Text>
          </View>

          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name={session.locationIcon}
              size={16}
              color={session.isLink ? '#3B82F6' : '#94A3B8'}
            />
            <Text
              className={`text-sm ml-2 ${session.isLink ? 'text-[#3B82F6] underline' : 'text-[#94A3B8]'}`}
            >
              {session.locationText}
            </Text>
          </View>
        </View>

      </View>
    </View>
  );
};

const FAB = () => (
  <TouchableOpacity
    className="absolute bottom-6 right-5 w-16 h-16 bg-[#0D6EFD] rounded-full items-center justify-center shadow-lg z-50"
    style={{ elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 }}
  >
    <Feather name="plus" size={32} color="white" />
  </TouchableOpacity>
);

const BottomNavBar = () => (
  <View className="flex-row bg-[#0B1120] border-t border-[#1E293B] px-2 py-3 justify-between items-center pb-8 z-40 relative">
    {NAV_ITEMS.map((item) => {
      const isActive = item.id === 'schedule';
      return (
        <TouchableOpacity key={item.id} className="items-center flex-1">
          <MaterialCommunityIcons
            name={isActive ? (item.activeIcon as any) : (item.icon as any)}
            size={26}
            color={isActive ? '#0D6EFD' : '#64748B'}
            className="mb-1"
          />
          <Text
            className={`text-[10px] font-semibold mt-1 ${isActive ? 'text-[#0D6EFD]' : 'text-[#64748B]'
              }`}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

// --- Main Screen Component ---

export default function MyScheduleScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'upcoming', title: 'Upcoming' },
    { key: 'today', title: 'Today' },
    { key: 'past', title: 'Past' },
  ]);

  const UpcomingRoute = () => (
    <ScrollView className="flex-1 mt-6" showsVerticalScrollIndicator={false}>
      {SCHEDULE_DATA.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
      <View className="h-24" />
    </ScrollView>
  );

  const TodayRoute = () => (
    <View className="flex-1 items-center justify-center">
      <Text className="text-[#94A3B8]">No sessions today.</Text>
    </View>
  );

  const PastRoute = () => (
    <View className="flex-1 items-center justify-center">
      <Text className="text-[#94A3B8]">No past sessions.</Text>
    </View>
  );

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'upcoming':
        return <UpcomingRoute />;
      case 'today':
        return <TodayRoute />;
      case 'past':
        return <PastRoute />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <View className="mx-5 mt-5">
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#0D6EFD', height: '100%', borderRadius: 8 }}
        style={{ backgroundColor: '#1A2235', borderRadius: 12, elevation: 0, padding: 4 }}
        activeColor="white"
        inactiveColor="#94A3B8"
        renderLabel={({ route, focused, color }) => (
          <Text className={`text-sm font-semibold`} style={{ color, zIndex: 1 }}>
            {route.title}
          </Text>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#121A27] pt-5">
      <StatusBar barStyle="light-content" backgroundColor="#121A27" />

      <Header />

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