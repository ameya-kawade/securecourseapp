// src/screens/QuizScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { ProgressBar, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
// --- Types ---
interface Option {
    id: string;
    text: string;
}

interface Question {
    id: string;
    currentNumber: number;
    totalQuestions: number;
    timeRemaining: string;
    pointValue: number;
    questionText: string;
    options: Option[];
}

// --- Mock Data (Template) ---
const CURRENT_QUESTION: Question = {
    id: 'q3',
    currentNumber: 3,
    totalQuestions: 10,
    timeRemaining: '00:45',
    pointValue: 100,
    questionText: 'Which of these is a core principle of UX design to ensure user satisfaction?',
    options: [
        { id: 'opt1', text: 'User-Centricity' },
        { id: 'opt2', text: 'Visual Complexity' },
        { id: 'opt3', text: 'Maximum Features' },
        { id: 'opt4', text: 'Aesthetic Only Focus' },
    ],
};



const ProgressSection = ({ current, total }: { current: number; total: number }) => {
    const progressPercentage = current / total;
    const progressText = `${Math.round(progressPercentage * 100)}% Complete`;

    return (
        <View className="px-4 mt-2 mb-6">
            <View className="flex-row justify-between items-end mb-3">
                <Text className="text-white text-xs font-bold tracking-widest uppercase">
                    Question {current} of {total}
                </Text>
                <Text className="text-[#3B82F6] text-xs font-bold">
                    {progressText}
                </Text>
            </View>
            <ProgressBar
                progress={progressPercentage}
                color="#2563EB"
                style={{ backgroundColor: '#1E293B', height: 8, borderRadius: 4 }}
            />
        </View>
    );
};

const StatsRow = ({ time, points }: { time: string; points: number }) => (
    <View className="flex-row px-4 gap-x-4 mb-8">
        <View className="flex-1 bg-[#121B2A] border border-[#1E293B] rounded-xl p-4">
            <View className="flex-row items-center mb-2">
                <MaterialCommunityIcons name="clock-outline" size={14} color="#94A3B8" />
                <Text className="text-[#94A3B8] text-[10px] font-bold tracking-wider ml-1.5 uppercase">
                    Remaining
                </Text>
            </View>
            <Text className="text-white text-2xl font-bold">{time}</Text>
        </View>

        <View className="flex-1 bg-[#121B2A] border border-[#1E293B] rounded-xl p-4">
            <View className="flex-row items-center mb-2">
                <MaterialCommunityIcons name="star-circle" size={14} color="#94A3B8" />
                <Text className="text-[#94A3B8] text-[10px] font-bold tracking-wider ml-1.5 uppercase">
                    Point Value
                </Text>
            </View>
            <Text className="text-white text-2xl font-bold">{points} pts</Text>
        </View>
    </View>
);

const OptionItem = ({
    option,
    isSelected,
    onSelect
}: {
    option: Option;
    isSelected: boolean;
    onSelect: () => void
}) => (
    <TouchableOpacity
        onPress={onSelect}
        activeOpacity={0.7}
        className={`flex-row items-center px-4 py-4 mb-4 rounded-xl border ${isSelected
            ? 'bg-[#121B2A] border-[#1E293B]'
            : 'bg-transparent border-[#1E293B]'
            }`}
    >
        <View
            className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-4 ${isSelected ? 'border-[#3B82F6]' : 'border-[#475569]'
                }`}
        >
            {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />}
        </View>
        <Text className="text-white text-base font-medium flex-1">
            {option.text}
        </Text>
    </TouchableOpacity>
);

const BottomActions = () => (
    <View className="flex-row items-center justify-between px-4 py-4 bg-[#0F172A] border-t border-[#1E293B]">
        <Button
            mode="contained"
            buttonColor="#1E293B"
            textColor="#94A3B8"
            icon="chevron-left"
            className="flex-1 mr-2 rounded-xl"
            contentStyle={{ height: 56, flexDirection: 'row-reverse' }}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
            onPress={() => console.log('Previous')}
        >
            Previous
        </Button>
        <Button
            mode="contained"
            buttonColor="#0D6EFD"
            textColor="white"
            className="flex-[1.5] ml-2 rounded-xl"
            contentStyle={{ height: 56, flexDirection: 'row-reverse' }}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
            icon="chevron-right"
            onPress={() => console.log('Next')}
        >
            Next Question
        </Button>
    </View>
);

// --- Main Screen ---

export default function Quiz() {
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
        CURRENT_QUESTION.options[0].id
    );
    const headerHeight = useHeaderHeight();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
            <View style={{ flex: 1, paddingTop: headerHeight }}>

                <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

                <ProgressSection
                    current={CURRENT_QUESTION.currentNumber}
                    total={CURRENT_QUESTION.totalQuestions}
                />

                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <StatsRow
                        time={CURRENT_QUESTION.timeRemaining}
                        points={CURRENT_QUESTION.pointValue}
                    />

                    <Text className="text-white text-2xl font-bold leading-8 mb-8">
                        {CURRENT_QUESTION.questionText}
                    </Text>

                    <View className="mb-6">
                        {CURRENT_QUESTION.options.map((option) => (
                            <OptionItem
                                key={option.id}
                                option={option}
                                isSelected={selectedOptionId === option.id}
                                onSelect={() => setSelectedOptionId(option.id)}
                            />
                        ))}
                    </View>
                </ScrollView>

                <BottomActions />
            </View>
        </SafeAreaView>

    );
}