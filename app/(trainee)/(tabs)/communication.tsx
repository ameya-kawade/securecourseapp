// src/screens/CommunicationsScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
// --- Types ---
type NoticeType = 'urgent' | 'info' | 'success';

interface Notice {
  id: string;
  type: NoticeType;
  title: string;
  sender: string;
  timestamp: string;
  body: string;
  badgeLabel: string;
  actionLabel: string;
}

// --- Mock Data ---
const NOTICES: Notice[] = [
  {
    id: '1',
    type: 'urgent',
    title: 'Urgent: UI Design Workshop',
    sender: 'From: Alex Rivera (Lead Trainer)',
    timestamp: '12m ago',
    body: 'The UI Design workshop scheduled for tomorrow has been moved to Room 402. Please ensure you have Figma installed on your laptops.',
    badgeLabel: 'High Priority',
    actionLabel: 'View Details',
  },
  {
    id: '2',
    type: 'info',
    title: 'New Course Materials Uploaded',
    sender: 'From: Learning Management System',
    timestamp: '2h ago',
    body: "The reading list for 'Advanced Prototypes' is now available in the resource section of your dashboard.",
    badgeLabel: 'General',
    actionLabel: 'Download PDF',
  },
  {
    id: '3',
    type: 'success',
    title: 'Assessment Results Released',
    sender: 'From: Examination Cell',
    timestamp: 'Yesterday',
    body: "Results for the 'Frontend Fundamentals' quiz have been published. Check your grades in the Profile tab.",
    badgeLabel: 'Important',
    actionLabel: 'View Details',
  },
];

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', icon: 'home' },
  { id: 'courses', label: 'COURSES', icon: 'book-open-variant' },
  { id: 'comm', label: 'COMM', icon: 'message-text' },
  { id: 'profile', label: 'PROFILE', icon: 'account' },
];

// --- Components ---

const Header = () => (
  <View className="flex-row items-center justify-between px-4 py-3">
    <View className="flex-row items-center">
      <TouchableOpacity className="p-2 -ml-2 mr-2">
        <Feather name="menu" size={24} color="#3B82F6" />
      </TouchableOpacity>
      <Text className="text-white text-xl font-bold">Communications</Text>
    </View>
    <View className="flex-row items-center gap-x-3">
      <TouchableOpacity className="w-10 h-10 bg-[#1A2235] rounded-full items-center justify-center">
        <Feather name="search" size={20} color="#94A3B8" />
      </TouchableOpacity>
      <TouchableOpacity className="w-10 h-10 bg-[#1A2235] rounded-full items-center justify-center relative">
        <MaterialCommunityIcons name="bell-outline" size={22} color="#94A3B8" />
        <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EF4444] rounded-full border border-[#1A2235]" />
      </TouchableOpacity>
    </View>
  </View>
);

const TabSwitcher = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => (
  <View className="bg-[#1A2235] mx-4 mt-4 p-1 rounded-2xl flex-row border border-[#2A3447]">
    <TouchableOpacity
      onPress={() => setActiveTab('notices')}
      className={`flex-1 flex-row items-center justify-center py-3.5 rounded-xl ${activeTab === 'notices' ? 'bg-[#0D6EFD]' : 'bg-transparent'
        }`}
    >
      <MaterialCommunityIcons
        name="bullhorn-outline"
        size={20}
        color={activeTab === 'notices' ? 'white' : '#94A3B8'}
      />
      <Text className={`ml-2 font-semibold text-sm ${activeTab === 'notices' ? 'text-white' : 'text-[#94A3B8]'}`}>
        Notices
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => setActiveTab('messages')}
      className={`flex-1 flex-row items-center justify-center py-3.5 rounded-xl ${activeTab === 'messages' ? 'bg-[#0D6EFD]' : 'bg-transparent'
        }`}
    >
      <MaterialCommunityIcons
        name="message-outline"
        size={20}
        color={activeTab === 'messages' ? 'white' : '#94A3B8'}
      />
      <Text className={`ml-2 font-semibold text-sm ${activeTab === 'messages' ? 'text-white' : 'text-[#94A3B8]'}`}>
        Messages
      </Text>
    </TouchableOpacity>
  </View>
);

const SectionHeader = () => (
  <View className="flex-row justify-between items-center px-4 mt-8 mb-4">
    <Text className="text-[#94A3B8] text-xs font-bold tracking-widest uppercase">
      Recent Notices
    </Text>
    <TouchableOpacity>
      <Text className="text-[#0D6EFD] text-sm font-medium">Mark all as read</Text>
    </TouchableOpacity>
  </View>
);

const NoticeCard = ({ notice }: { notice: Notice }) => {
  // Config mapping based on notice type
  const config = {
    urgent: {
      icon: 'alert-circle',
      iconColor: '#F97316',
      iconBg: '#432C24',
      badgeColor: '#EF4444',
      badgeBg: '#3F1D24',
    },
    info: {
      icon: 'information',
      iconColor: '#3B82F6',
      iconBg: '#1D2B4D',
      badgeColor: '#94A3B8',
      badgeBg: '#2A3447',
    },
    success: {
      icon: 'check-decagram',
      iconColor: '#10B981',
      iconBg: '#123B2B',
      badgeColor: '#10B981',
      badgeBg: '#123B2B',
    },
  }[notice.type];

  return (
    <View className="bg-[#172033] rounded-2xl p-5 mx-4 mb-4 border border-[#2A3447]">
      {/* Header Info */}
      <View className="flex-row items-start mb-3">
        <View
          className="w-10 h-10 rounded-xl items-center justify-center mr-3 mt-1"
          style={{ backgroundColor: config.iconBg }}
        >
          <MaterialCommunityIcons name={config.icon as any} size={22} color={config.iconColor} />
        </View>
        <View className="flex-1">
          <Text className="text-white text-base font-bold mb-1 leading-tight">
            {notice.title}
          </Text>
          <Text className="text-[#94A3B8] text-xs">
            {notice.sender}
          </Text>
        </View>
        <Text className="text-[#94A3B8] text-[11px] ml-2">
          {notice.timestamp}
        </Text>
      </View>

      {/* Body */}
      <Text className="text-[#CBD5E1] text-sm leading-6 mb-5">
        {notice.body}
      </Text>

      {/* Footer / Actions */}
      <View className="flex-row items-center justify-between">
        <View
          className="px-2.5 py-1 rounded-md"
          style={{ backgroundColor: config.badgeBg }}
        >
          <Text
            className="text-[10px] font-bold tracking-wider"
            style={{ color: config.badgeColor }}
          >
            {notice.badgeLabel}
          </Text>
        </View>

        <TouchableOpacity>
          <Text className="text-[#0D6EFD] text-sm font-semibold">
            {notice.actionLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FloatingActionButton = () => (
  <TouchableOpacity
    className="absolute bottom-6 right-4 w-14 h-14 bg-[#0D6EFD] rounded-full items-center justify-center shadow-lg"
    style={{ elevation: 8, shadowColor: '#0D6EFD', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8 }}
  >
    <MaterialCommunityIcons name="message-plus" size={24} color="white" />
  </TouchableOpacity>
);

const BottomNavBar = () => (
  <View className="flex-row bg-[#0B1120] border-t border-[#1E293B] px-2 py-3 justify-between items-center pb-8">
    {NAV_ITEMS.map((item) => {
      const isActive = item.id === 'comm';
      return (
        <TouchableOpacity key={item.id} className="items-center flex-1">
          <MaterialCommunityIcons
            name={item.icon as any}
            size={24}
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

// --- Main Screen ---

export default function CommunicationsScreen() {
  const [activeTab, setActiveTab] = useState('notices');

  return (
    <SafeAreaView className="flex-1 bg-[#121A27] pt-5">
      <StatusBar barStyle="light-content" backgroundColor="#121A27" />
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <SectionHeader />

        <View className="pb-24">
          {NOTICES.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}