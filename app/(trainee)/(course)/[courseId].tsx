import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Pressable,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

// --- Types ---
type LessonStatus = 'completed' | 'current' | 'locked';
type LessonType = 'video' | 'document' | 'quiz';

interface Lesson {
    id: string;
    title: string;
    type: LessonType;
    status: LessonStatus;
    duration?: string;
    isCurrentLesson?: boolean;
}

interface Module {
    id: string;
    number: string;
    title: string;
    lessons: Lesson[];
    isExpandedInitial: boolean;
}

// --- Mock Data ---
const MODULES: Module[] = [
    {
        id: 'm1',
        number: '01',
        title: 'Introduction to SEO',
        isExpandedInitial: true,
        lessons: [
            { id: 'l1', title: 'Keyword Research Basics', type: 'video', status: 'completed' },
            { id: 'l2', title: 'On-Page SEO Checklist', type: 'document', status: 'completed' },
        ],
    },
    {
        id: 'm2',
        number: '02',
        title: 'Content Strategy',
        isExpandedInitial: true,
        lessons: [
            { id: 'l3', title: 'Defining Target Audience', type: 'video', status: 'current', isCurrentLesson: true },
            { id: 'l4', title: 'Module 2 Quiz', type: 'quiz', status: 'locked' },
        ],
    },
];

const NAV_ITEMS = [
    { id: 'home', label: 'HOME', icon: 'home' },
    { id: 'courses', label: 'COURSES', icon: 'book-open-variant' },
    { id: 'exams', label: 'EXAMS', icon: 'clipboard-text-outline' },
    { id: 'profile', label: 'PROFILE', icon: 'account' },
];

// --- Components ---

const Header = () => (
    <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity className="p-2 -ml-2">
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Learning Path</Text>
        <TouchableOpacity className="p-2 -mr-2">
            <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
        </TouchableOpacity>
    </View>
);

const HeroSection = () => (
    <View className="px-4 mt-2">
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800' }}
            className="w-full h-48 rounded-2xl overflow-hidden justify-end"
            imageStyle={{ opacity: 0.6 }}
        >
            {/* Dark Gradient Overlay equivalent */}
            <View className="absolute inset-0 bg-[#0F172A] opacity-40" />

            <View className="p-5">
                <View className="bg-[#EF4444] self-start px-2 py-1 rounded mb-3">
                    <Text className="text-white text-[10px] font-bold tracking-widest">
                        ADVANCED
                    </Text>
                </View>
                <Text className="text-white text-2xl font-bold leading-tight w-4/5">
                    Digital Marketing Masterclass
                </Text>
            </View>
        </ImageBackground>
    </View>
);

const ProgressSection = () => (
    <View className="bg-[#172133] border border-[#2A3B52] rounded-2xl p-5 mx-4 mt-4">
        <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-base font-semibold">Overall Progress</Text>
            <Text className="text-[#3B82F6] font-bold">45%</Text>
        </View>

        <ProgressBar progress={0.45} color="#2563EB" style={{ backgroundColor: '#2A3B52', height: 8, borderRadius: 4 }} />

        <View className="flex-row justify-between items-center mt-4">
            <Text className="text-[#94A3B8] text-sm">9 of 20 lessons completed</Text>
            <View className="flex-row items-center">
                <MaterialCommunityIcons name="clock-outline" size={14} color="#EF4444" />
                <Text className="text-[#EF4444] text-xs font-bold ml-1 uppercase">12H Left</Text>
            </View>
        </View>
    </View>
);

const PreAssessmentCard = () => (
    <View className="bg-[#172133] border border-[#2A3B52] rounded-2xl p-4 mx-4 mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
            <View className="bg-[#1D4ED8] w-12 h-12 rounded-xl items-center justify-center mr-4">
                <MaterialCommunityIcons name="frequently-asked-questions" size={24} color="white" />
            </View>
            <View className="flex-1">
                <Text className="text-white font-bold text-base mb-1">Level 2 Pre-Assessment</Text>
                <Text className="text-[#94A3B8] text-sm">Required to unlock Module 2</Text>
            </View>
        </View>
        <View className="w-6 h-6 rounded-full bg-[#3B82F6] items-center justify-center">
            <MaterialCommunityIcons name="check" size={16} color="white" />
        </View>
    </View>
);

const LessonItem = ({ lesson, isLast }: { lesson: Lesson; isLast: boolean }) => {
    const lessonTypesMappingWithRoute = {
        video: "/(course)/video",
        document: "/(course)/document",
        quiz: "/(course)/quiz",
    }
    const getIconName = () => {
        if (lesson.type === 'video') return 'play-circle';
        if (lesson.type === 'document') return 'file-document-outline';
        return 'help-network-outline'; // fallback for quiz
    };

    const getIconColor = () => {
        if (lesson.status === 'locked') return '#64748B';
        return '#3B82F6';
    };

    return (

        <Pressable
            className={`flex-row items-center py-4 ${!isLast ? 'border-b border-[#2A3B52]' : ''}`}
            onPress={() => {
                router.push(lessonTypesMappingWithRoute[lesson.type] as any);
            }}
        >
            <MaterialCommunityIcons name={getIconName()} size={24} color={getIconColor()} className="mr-4" />

            <View className="flex-1 justify-center">
                {lesson.isCurrentLesson && (
                    <Text className="text-[#3B82F6] text-xs font-semibold mb-0.5">Current Lesson</Text>
                )}
                <Text className={`text-base ${lesson.status === 'locked' ? 'text-[#94A3B8]' : 'text-white'}`}>
                    {lesson.title}
                </Text>
            </View>

            <View className="ml-3">
                {lesson.status === 'completed' && (
                    <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
                )}
                {lesson.status === 'current' && (
                    <View className="w-5 h-5 rounded-full border-2 border-[#3B82F6] items-center justify-center">
                        <View className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                    </View>
                )}
                {lesson.status === 'locked' && (
                    <View className="w-5 h-5 rounded-full bg-[#334155]" />
                )}
            </View>
        </Pressable>
    );
};

const ModuleAccordion = ({ moduleData }: { moduleData: Module }) => {
    const [expanded, setExpanded] = useState(moduleData.isExpandedInitial);

    return (
        <View className="bg-[#172133] border border-[#2A3B52] rounded-2xl mx-4 mt-4 overflow-hidden">
            <TouchableOpacity
                className="flex-row items-center justify-between p-5 bg-[#1A2639]"
                onPress={() => setExpanded(!expanded)}
                activeOpacity={0.7}
            >
                <View className="flex-row items-center">
                    <Text className="text-[#3B82F6] font-bold text-base mr-3">{moduleData.number}</Text>
                    <Text className="text-white font-bold text-base">{moduleData.title}</Text>
                </View>
                <MaterialCommunityIcons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="#94A3B8"
                />
            </TouchableOpacity>

            {expanded && (
                <View className="px-5 bg-[#172133]">
                    {moduleData.lessons.map((lesson, index) => (
                        <LessonItem
                            key={lesson.id}
                            lesson={lesson}
                            isLast={index === moduleData.lessons.length - 1}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const LockedPostAssessment = () => (
    <View className="bg-[#131B2A] border border-dashed border-[#334155] rounded-2xl p-4 mx-4 mt-4 flex-row items-center opacity-80">
        <View className="bg-[#2A3B52] w-12 h-12 rounded-xl items-center justify-center mr-4">
            <MaterialCommunityIcons name="lock" size={20} color="#94A3B8" />
        </View>
        <View className="flex-1">
            <Text className="text-[#64748B] font-bold text-base mb-1">Level 5 Post-Assessment</Text>
            <Text className="text-[#475569] text-sm">Unlock after completing all modules</Text>
        </View>
    </View>
);

const CertificateSection = () => (
    <View className="mx-4 mt-6 mb-8">
        <TouchableOpacity
            className="bg-[#172133] border border-[#2A3B52] rounded-2xl py-4 flex-row items-center justify-center opacity-70"
            activeOpacity={1}
        >
            <MaterialCommunityIcons name="medal-outline" size={20} color="#64748B" className="mr-2" />
            <Text className="text-[#64748B] font-bold text-base mr-2">Level 6 Certificate</Text>
            <MaterialCommunityIcons name="lock" size={16} color="#64748B" />
        </TouchableOpacity>
        <Text className="text-center text-[#64748B] text-xs mt-3">
            Complete the course to generate your verified certification.
        </Text>
    </View>
);


// --- Main Screen ---

export default function LearningPathScreen() {

    return (
        <SafeAreaView className="flex-1 bg-[#0B1120]">
            <StatusBar barStyle="light-content" backgroundColor="#0B1120" />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <HeroSection />
                <ProgressSection />
                <PreAssessmentCard />

                {MODULES.map((moduleData) => (
                    <ModuleAccordion key={moduleData.id} moduleData={moduleData} />
                ))}

                <LockedPostAssessment />
                <CertificateSection />
            </ScrollView>
        </SafeAreaView>
    );
}