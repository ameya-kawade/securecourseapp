// app/index.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// --- Mock Data ---

const STATS = [
    { id: '1', title: 'Active Sessions', value: '12', trend: '+2', trendPositive: true, icon: 'dumbbell' },
    { id: '2', title: 'Attendance', value: '94%', trend: '+3%', trendPositive: true, icon: 'account-check' },
    { id: '3', title: 'Avg Score', value: '8.5', trend: '-0.2', trendPositive: false, icon: 'chart-bar' },
    { id: '4', title: 'Total Trainees', value: '48', trend: null, trendPositive: true, icon: 'account-group' },
];

const ACTIVITIES = [
    {
        id: '1',
        title: 'HIIT Advanced Completed',
        subtitle: '12 participants • 45 min',
        time: '10M AGO',
        icon: 'check-circle-outline',
        iconColor: '#10B981',
        iconBg: '#064E3B',
    },
    {
        id: '2',
        title: 'New Trainee Registered',
        subtitle: 'Sarah Johnson joined Strength Elite',
        time: '1H AGO',
        icon: 'account-plus',
        iconColor: '#3B82F6',
        iconBg: '#1D2B4D',
    },
    {
        id: '3',
        title: 'Feedback Received',
        subtitle: '"Incredible session, very motivating!"',
        time: '3H AGO',
        icon: 'message-alert-outline',
        iconColor: '#F59E0B',
        iconBg: '#451A03',
    },
];

// --- Components ---

const Header = () => (
    <View className="flex-row items-center justify-between px-5 py-4 border-b border-[#1E293B]">
        <View className="flex-row items-center">
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
                className="w-12 h-12 rounded-full mr-3"
            />
            <View>
                <Text className="text-[#94A3B8] text-sm font-medium">Good morning,</Text>
                <Text className="text-white text-lg font-bold">Coach Alex Morgan</Text>
            </View>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-[#1A2235] rounded-full items-center justify-center">
            <MaterialCommunityIcons name="bell" size={20} color="#94A3B8" />
        </TouchableOpacity>
    </View>
);

const StatCard = ({ stat }: { stat: any }) => (
    <View className="bg-[#151E2E] border border-[#1E293B] rounded-2xl p-4 w-[48%] mb-4">
        <View className="flex-row justify-between items-start mb-4">
            <MaterialCommunityIcons name={stat.icon} size={24} color="#3B82F6" />
            {stat.trend && (
                <View className={`px-2 py-0.5 rounded ${stat.trendPositive ? 'bg-[#064E3B]' : 'bg-[#451A03]'}`}>
                    <Text className={`text-[10px] font-bold ${stat.trendPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {stat.trend}
                    </Text>
                </View>
            )}
        </View>
        <Text className="text-[#94A3B8] text-xs font-medium mb-1">{stat.title}</Text>
        <Text className="text-white text-3xl font-bold">{stat.value}</Text>
    </View>
);

const QuickActions = () => (
    <View className="px-5 mb-8">
        <Text className="text-white text-xl font-bold mb-4">Quick Actions</Text>
        <View className="flex-row justify-between gap-x-4">
            {/* New Session Button */}
            <TouchableOpacity className="flex-1 bg-[#0D6EFD] rounded-2xl p-6 items-center justify-center border border-[#0D6EFD]">
                <View className="w-8 h-8 bg-white rounded-full items-center justify-center mb-2">
                    <MaterialCommunityIcons name="plus" size={24} color="#0D6EFD" />
                </View>
                <Text className="text-white font-bold text-sm">New Session</Text>
            </TouchableOpacity>

            {/* My Schedule Button */}
            <TouchableOpacity className="flex-1 bg-[#151E2E] rounded-2xl p-6 items-center justify-center border border-[#1E293B]">
                <MaterialCommunityIcons name="calendar-blank" size={32} color="#3B82F6" className="mb-2" />
                <Text className="text-white font-bold text-sm mt-1">My Schedule</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const ActivityItem = ({ activity }: { activity: any }) => (
    <View className="flex-row items-center bg-[#151E2E] border border-[#1E293B] rounded-2xl p-4 mb-3 mx-5">
        <View
            className="w-12 h-12 rounded-xl items-center justify-center mr-4"
            style={{ backgroundColor: activity.iconBg }}
        >
            <MaterialCommunityIcons name={activity.icon} size={24} color={activity.iconColor} />
        </View>
        <View className="flex-1">
            <Text className="text-white text-sm font-bold mb-1">{activity.title}</Text>
            <Text className="text-[#94A3B8] text-xs" numberOfLines={1}>
                {activity.subtitle}
            </Text>
        </View>
        <Text className="text-[#64748B] text-[10px] font-bold tracking-wider ml-2">
            {activity.time}
        </Text>
    </View>
);

// --- Main Screen ---

export default function Home() {
    return (
        <SafeAreaView className="flex-1 bg-[#0B1120]" edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" backgroundColor="#0B1120" />

            <Header />

            <ScrollView className="flex-1 pt-6" showsVerticalScrollIndicator={false}>

                {/* Performance Overview */}
                <View className="px-5 mb-4">
                    <Text className="text-white text-xl font-bold mb-4">Performance Overview</Text>
                    <View className="flex-row flex-wrap justify-between">
                        {STATS.map((stat) => (
                            <StatCard key={stat.id} stat={stat} />
                        ))}
                    </View>
                </View>

                {/* Quick Actions */}
                <QuickActions />

                {/* Recent Activity */}
                <View className="mb-6">
                    <View className="flex-row justify-between items-center px-5 mb-4">
                        <Text className="text-white text-xl font-bold">Recent Activity</Text>
                        <TouchableOpacity>
                            <Text className="text-[#3B82F6] text-sm font-semibold">See all</Text>
                        </TouchableOpacity>
                    </View>

                    {ACTIVITIES.map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} />
                    ))}
                </View>

                {/* Bottom padding for scroll */}
                <View className="h-6" />
            </ScrollView>
        </SafeAreaView>
    );
}