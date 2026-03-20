// src/screens/QuizResultsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Types & Mock Data ---

interface BreakdownItemProps {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    title: string;
    subtitle: string;
    value: number;
    colorHex: string;
    bgHex: string;
}

const STATS = {
    score: 85,
    timeTaken: '12m 40s',
    passingScore: '70%',
};

const BREAKDOWN_DATA: BreakdownItemProps[] = [
    {
        icon: 'check',
        title: 'Correct',
        subtitle: 'Accurate answers',
        value: 17,
        colorHex: '#10B981', // Emerald 500
        bgHex: '#064E3B',    // Emerald 900
    },
    {
        icon: 'close',
        title: 'Incorrect',
        subtitle: 'Needs review',
        value: 3,
        colorHex: '#EF4444', // Red 500
        bgHex: '#7F1D1D',    // Red 900
    },
    {
        icon: 'minus',
        title: 'Skipped',
        subtitle: 'No answer given',
        value: 0,
        colorHex: '#94A3B8', // Slate 400
        bgHex: '#1E293B',    // Slate 800
    },
];

const NAV_ITEMS = [
    { id: 'home', label: 'HOME', icon: 'home' },
    { id: 'courses', label: 'COURSES', icon: 'book-open-variant' },
    { id: 'quizzes', label: 'QUIZZES', icon: 'clipboard-text-outline' },
    { id: 'profile', label: 'PROFILE', icon: 'account' },
];

// --- Components ---

const Header = () => (
    <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity className="p-2 -ml-2 z-10">
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View className="absolute w-full items-center">
            <Text className="text-white text-lg font-bold">Quiz Results</Text>
        </View>
    </View>
);

const CircularProgress = ({ score }: { score: number }) => {
    const size = 160;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <View className="items-center justify-center mt-8 relative">
            <Svg width={size} height={size} className="transform -rotate-90">
                {/* Background Circle */}
                <Circle
                    stroke="#1E293B"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <Circle
                    stroke="#0D6EFD"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </Svg>

            {/* Center Text */}
            <View className="absolute items-center justify-center">
                <Text className="text-white text-4xl font-extrabold">{score}%</Text>
                <Text className="text-[#94A3B8] text-sm mt-1">Score</Text>
            </View>
        </View>
    );
};

const ResultGreeting = () => (
    <View className="items-center mt-6 px-6">
        <View className="bg-[#064E3B] px-3 py-1 rounded-full flex-row items-center mb-4">
            <MaterialCommunityIcons name="check-circle" size={14} color="#34D399" />
            <Text className="text-[#34D399] text-xs font-bold ml-1.5 tracking-widest uppercase">
                Passed
            </Text>
        </View>
        <Text className="text-white text-3xl font-bold mb-2">Great job, Alex!</Text>
        <Text className="text-[#94A3B8] text-center text-base leading-6">
            You have successfully completed the Cybersecurity Fundamentals quiz.
        </Text>
    </View>
);

const StatCard = ({ icon, title, value }: { icon: any, title: string, value: string }) => (
    <View className="flex-1 bg-[#131B2A] border border-[#1E293B] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons name={icon} size={16} color="#3B82F6" />
            <Text className="text-[#3B82F6] text-[10px] font-bold tracking-widest ml-2 uppercase">
                {title}
            </Text>
        </View>
        <Text className="text-white text-2xl font-bold">{value}</Text>
    </View>
);

const BreakdownItem = ({ item }: { item: BreakdownItemProps }) => (
    <View className="bg-[#131B2A] border border-[#1E293B] rounded-2xl p-4 mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
            <View
                className="w-10 h-10 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: item.bgHex }}
            >
                <MaterialCommunityIcons name={item.icon} size={20} color={item.colorHex} />
            </View>
            <View>
                <Text className="text-white font-bold text-base">{item.title}</Text>
                <Text className="text-[#94A3B8] text-sm">{item.subtitle}</Text>
            </View>
        </View>
        <Text className="text-xl font-bold" style={{ color: item.colorHex }}>
            {item.value}
        </Text>
    </View>
);

const BottomNavBar = () => (
    <View className="flex-row bg-[#0B1120] border-t border-[#1E293B] px-2 py-3 justify-between items-center pb-8">
        {NAV_ITEMS.map((item) => {
            const isActive = item.id === 'quizzes';
            return (
                <TouchableOpacity key={item.id} className="items-center flex-1">
                    <MaterialCommunityIcons
                        name={item.icon as any}
                        size={24}
                        color={isActive ? '#3B82F6' : '#64748B'}
                        className="mb-1"
                    />
                    <Text
                        className={`text-[10px] font-semibold mt-1 ${isActive ? 'text-[#3B82F6]' : 'text-[#64748B]'
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

export default function QuizResultsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#0B1120]">
            <StatusBar barStyle="light-content" backgroundColor="#0B1120" />

            {/* <Header /> */}

            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                <CircularProgress score={STATS.score} />

                <ResultGreeting />

                <View className="flex-row gap-x-4 mt-8 w-full">
                    <StatCard icon="clock-outline" title="Time Taken" value={STATS.timeTaken} />
                    <StatCard icon="flag-outline" title="Passing Score" value={STATS.passingScore} />
                </View>

                <Text className="text-white font-bold text-lg mt-8 mb-4">Breakdown</Text>

                {BREAKDOWN_DATA.map((item, index) => (
                    <BreakdownItem key={index} item={item} />
                ))}

                <View className="mt-6 mb-8 gap-y-3">
                    <Button
                        mode="contained"
                        buttonColor="#0D6EFD"
                        textColor="white"
                        icon="certificate"
                        className="rounded-xl w-full"
                        contentStyle={{ height: 56 }}
                        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                        onPress={() => console.log('Download Certificate')}
                    >
                        Download Certificate
                    </Button>

                    <View className="flex-row gap-x-3 w-full">
                        <Button
                            mode="outlined"
                            textColor="white"
                            icon="eye"
                            className="flex-1 rounded-xl border-[#1E293B] bg-[#131B2A]"
                            contentStyle={{ height: 56 }}
                            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                            onPress={() => console.log('Review')}
                        >
                            Review
                        </Button>
                        <Button
                            mode="outlined"
                            textColor="white"
                            icon="school"
                            className="flex-1 rounded-xl border-[#1E293B] bg-[#131B2A]"
                            contentStyle={{ height: 56 }}
                            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                            onPress={() => console.log('Course')}
                        >
                            Course
                        </Button>
                    </View>
                </View>
            </ScrollView>

            <BottomNavBar />
        </SafeAreaView>
    );
}