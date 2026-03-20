// src/screens/TraineeProfileScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

// --- Mock Data ---

const PROFILE_DATA = {
    name: 'Vikram Sethi',
    empId: 'EMP-1024',
    designation: 'Senior Security Lead',
    location: 'Gurugram Campus, North Region',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    readiness: 75,
};

const PERSONAL_INFO = [
    { label: 'DESIGNATION', value: 'Senior Security Lead' },
    { label: 'DEPARTMENT', value: 'Operations & Safety' },
    { label: 'JOINING DATE', value: '12 Mar 2022' },
    { label: 'GENDER', value: 'Male' },
    { label: 'EMAIL', value: 'v.sethi@enterprise.com', fullWidth: true },
    { label: 'MOBILE', value: '+91 98765 43210', fullWidth: true },
];

const CHECKLIST = [
    { id: '1', title: 'Physical Training', status: 'COMPLETED', icon: 'lightning-bolt' },
    { id: '2', title: 'First Aid Certification', status: 'IN-PROGRESS', icon: 'flask-outline' },
    { id: '3', title: 'Firefighting Knowledge', status: 'PENDING', icon: 'fire' },
];

const DOCUMENTS = [
    { id: '1', title: 'Curriculum Vitae', status: 'VERIFIED', icon: 'file-document-outline', actionIcon: 'download-outline' },
    { id: '2', title: 'Police Verification', status: 'PENDING APPROVAL', icon: 'file-check-outline', actionIcon: 'eye-outline' },
];

const TRAINING_HISTORY = [
    {
        id: '1',
        title: 'Industrial Safety Protocols',
        subtitle: 'Mandatory Compliance • 12 Modules',
        status: 'PASSED',
        score: '92/100',
        date: 'Oct 14, 2023',
    },
    {
        id: '2',
        title: 'First Aid Responder Level 2',
        subtitle: 'Emergency Services • 8 Modules',
        status: 'PASSED',
        score: '85/100',
        date: 'Sep 28, 2023',
    },
];

const VERIFICATION_LOG = [
    { id: '1', date: '22 Oct 2023,\n11:45 AM', status: 'Approved', remarks: 'ID proof matched correctly.' },
    { id: '2', date: '19 Oct 2023,\n03:20 PM', status: 'Rejected', remarks: 'Low image quality, blurry face.' },
    { id: '3', date: '18 Oct 2023,\n09:12 AM', status: 'Resubmitted', remarks: 'New photo upload via portal.' },
];

// --- Components ---

const Header = () => (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1E293B]">
        <View className="flex-row items-center">
            <TouchableOpacity className="p-2 -ml-2 mr-2">
                <MaterialCommunityIcons name="chevron-left" size={28} color="#94A3B8" />
            </TouchableOpacity>
            <View>
                <Text className="text-white text-lg font-bold leading-tight">Trainee Profile</Text>
                <Text className="text-[#94A3B8] text-[10px] font-medium tracking-wider">
                    Admin Dashboard &gt; Profile
                </Text>
            </View>
        </View>
        <TouchableOpacity className="p-2 -mr-2">
            <MaterialCommunityIcons name="dots-vertical" size={24} color="#94A3B8" />
        </TouchableOpacity>
    </View>
);

const SectionContainer = ({ children, title, titleIcon }: { children: React.ReactNode, title?: string, titleIcon?: any }) => (
    <View className="bg-[#1A2235] rounded-2xl p-5 mx-4 mb-4 border border-[#2A3447]">
        {title && (
            <View className="flex-row items-center mb-5">
                {titleIcon && <MaterialCommunityIcons name={titleIcon} size={20} color="#3B82F6" className="mr-2" />}
                <Text className="text-white text-base font-bold ml-2">{title}</Text>
            </View>
        )}
        {children}
    </View>
);

const CircularProgress = ({ value }: { value: number }) => {
    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <View className="items-center justify-center">
            <View className="relative items-center justify-center transform -rotate-90">
                <Svg width={size} height={size}>
                    <Circle stroke="#2A3447" fill="none" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
                    <Circle
                        stroke="#3B82F6"
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
                <View className="absolute items-center justify-center transform rotate-90">
                    <Text className="text-white text-2xl font-extrabold">{value}%</Text>
                    <Text className="text-[#94A3B8] text-[10px] font-bold tracking-widest uppercase">Ready</Text>
                </View>
            </View>
        </View>
    );
};

// --- Main Screen ---

export default function TraineeProfileScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#0F172A] pt-5" edges={['top', 'left', 'right']}>

            <ScrollView className="flex-1 pt-4" showsVerticalScrollIndicator={false}>

                {/* Profile Header Card */}
                <SectionContainer>
                    <View className="flex-row items-center mb-6">
                        <View className="relative mr-4">
                            <View className="w-16 h-16 rounded-full border-2 border-[#3B82F6] items-center justify-center">
                                <Image source={{ uri: PROFILE_DATA.avatar }} className="w-14 h-14 rounded-full" />
                            </View>
                            <View className="absolute bottom-0 right-0 w-4 h-4 bg-[#10B981] border-2 border-[#1A2235] rounded-full items-center justify-center">
                                <MaterialCommunityIcons name="check" size={10} color="white" />
                            </View>
                        </View>
                        <View className="flex-1">
                            <View className="flex-row items-center mb-1">
                                <Text className="text-white text-xl font-bold mr-2">{PROFILE_DATA.name}</Text>
                                <View className="bg-[#1D2B4D] px-2 py-0.5 rounded text-center">
                                    <Text className="text-[#3B82F6] text-[9px] font-bold uppercase tracking-wider">Verified</Text>
                                </View>
                            </View>
                            <Text className="text-[#94A3B8] text-xs mb-1">{PROFILE_DATA.empId}</Text>
                            <Text className="text-[#3B82F6] text-sm font-semibold mb-1">{PROFILE_DATA.designation}</Text>
                            <View className="flex-row items-center">
                                <MaterialCommunityIcons name="map-marker-outline" size={12} color="#94A3B8" />
                                <Text className="text-[#94A3B8] text-xs ml-1">{PROFILE_DATA.location}</Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row gap-x-3">
                        <Button
                            mode="outlined"
                            textColor="white"
                            icon="refresh"
                            className="flex-1 rounded-xl border-[#334155]"
                            contentStyle={{ height: 44 }}
                            labelStyle={{ fontSize: 13, fontWeight: '600' }}
                        >
                            Reset Password
                        </Button>
                        <Button
                            mode="contained"
                            buttonColor="#0D6EFD"
                            textColor="white"
                            icon="pencil-outline"
                            className="flex-1 rounded-xl"
                            contentStyle={{ height: 44 }}
                            labelStyle={{ fontSize: 13, fontWeight: '600' }}
                        >
                            Edit Profile
                        </Button>
                    </View>
                </SectionContainer>

                {/* PSARA Readiness */}
                <SectionContainer>
                    <View className="flex-row items-center mb-6">
                        <View className="w-1 h-4 bg-[#3B82F6] mr-2 rounded-full" />
                        <Text className="text-white text-base font-bold">PSARA Readiness</Text>
                    </View>
                    <CircularProgress value={PROFILE_DATA.readiness} />
                    <Text className="text-center text-[#94A3B8] text-sm mt-5 leading-5 px-4">
                        Profile is nearly compliant. <Text className="text-[#F59E0B] font-medium">1 mandatory document</Text> pending verification.
                    </Text>
                </SectionContainer>

                {/* Personal Information */}
                <SectionContainer title="Personal Information" titleIcon="account-outline">
                    <View className="flex-row flex-wrap">
                        {PERSONAL_INFO.map((info, idx) => (
                            <View key={idx} className={`${info.fullWidth ? 'w-full mt-4' : 'w-1/2 mb-4'}`}>
                                <Text className="text-[#64748B] text-[10px] font-bold tracking-widest uppercase mb-1">{info.label}</Text>
                                <Text className="text-white text-sm font-medium">{info.value}</Text>
                            </View>
                        ))}
                    </View>
                </SectionContainer>

                {/* PSARA Mandatory Checklist */}
                <SectionContainer title="PSARA Mandatory Checklist" titleIcon="check-circle-outline">
                    {CHECKLIST.map((item, index) => {
                        const badgeColors = {
                            'COMPLETED': { text: '#10B981', bg: '#064E3B' },
                            'IN-PROGRESS': { text: '#3B82F6', bg: '#1D2B4D' },
                            'PENDING': { text: '#F59E0B', bg: '#451A03' },
                        }[item.status];

                        return (
                            <View key={item.id} className={`flex-row items-center justify-between p-4 bg-[#0F172A] rounded-xl border border-[#1E293B] ${index !== CHECKLIST.length - 1 ? 'mb-3' : ''}`}>
                                <View className="flex-row items-center flex-1 pr-2">
                                    <MaterialCommunityIcons name={item.icon as any} size={20} color={badgeColors?.text} className="mr-3" />
                                    <Text className="text-white text-sm font-medium">{item.title}</Text>
                                </View>
                                <View className="px-2 py-1 rounded" style={{ backgroundColor: badgeColors?.bg }}>
                                    <Text className="text-[9px] font-bold tracking-widest uppercase" style={{ color: badgeColors?.text }}>
                                        {item.status}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </SectionContainer>

                {/* Mandatory Documents */}
                <SectionContainer>
                    <View className="flex-row items-center justify-between mb-5">
                        <Text className="text-white text-base font-bold">Mandatory Documents</Text>
                        <TouchableOpacity><Text className="text-[#3B82F6] text-xs font-semibold">View All</Text></TouchableOpacity>
                    </View>

                    {DOCUMENTS.map((doc, index) => (
                        <View key={doc.id} className={`flex-row items-center justify-between p-4 bg-[#0F172A] rounded-xl border border-[#1E293B] ${index !== DOCUMENTS.length - 1 ? 'mb-3' : ''}`}>
                            <View className="flex-row items-center flex-1">
                                <View className="w-10 h-10 bg-[#1A2235] rounded-lg items-center justify-center mr-3 border border-[#2A3447]">
                                    <MaterialCommunityIcons name={doc.icon as any} size={20} color={doc.status === 'VERIFIED' ? '#EF4444' : '#3B82F6'} />
                                </View>
                                <View>
                                    <Text className="text-white text-sm font-bold mb-0.5">{doc.title}</Text>
                                    <View className="flex-row items-center">
                                        <View className={`w-1.5 h-1.5 rounded-full mr-1.5 ${doc.status === 'VERIFIED' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`} />
                                        <Text className="text-[#94A3B8] text-[9px] font-bold tracking-widest uppercase">{doc.status}</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity className="p-2">
                                <MaterialCommunityIcons name={doc.actionIcon as any} size={20} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>
                    ))}

                    <TouchableOpacity className="mt-4 border border-dashed border-[#3B82F6] rounded-xl p-4 items-center bg-[#1D2B4D]/30">
                        <Text className="text-[#3B82F6] text-sm font-semibold">Upload New Document</Text>
                    </TouchableOpacity>
                </SectionContainer>

                {/* Detailed Training History */}
                <SectionContainer>
                    <View className="flex-row items-center justify-between mb-5">
                        <Text className="text-white text-base font-bold">Detailed Training History</Text>
                        <TouchableOpacity className="border border-[#334155] p-1.5 rounded-md">
                            <MaterialCommunityIcons name="filter-outline" size={18} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    {TRAINING_HISTORY.map((item, index) => (
                        <View key={item.id} className={`mb-5 ${index !== TRAINING_HISTORY.length - 1 ? 'border-b border-[#2A3447] pb-5' : ''}`}>
                            <View className="flex-row justify-between items-start mb-1">
                                <Text className="text-white text-sm font-bold flex-1 pr-2">{item.title}</Text>
                                <View className="bg-[#064E3B] px-2 py-0.5 rounded">
                                    <Text className="text-[#10B981] text-[9px] font-bold tracking-widest uppercase">{item.status}</Text>
                                </View>
                            </View>
                            <Text className="text-[#64748B] text-[11px] mb-4">{item.subtitle}</Text>

                            <View className="flex-row items-end justify-between">
                                <View className="flex-row gap-x-6">
                                    <View>
                                        <Text className="text-[#64748B] text-[9px] font-bold tracking-widest uppercase mb-1">FINAL SCORE</Text>
                                        <Text className="text-white text-sm font-bold">{item.score}</Text>
                                    </View>
                                    <View>
                                        <Text className="text-[#64748B] text-[9px] font-bold tracking-widest uppercase mb-1">COMPLETION</Text>
                                        <Text className="text-white text-sm font-bold">{item.date}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity className="flex-row items-center">
                                    <MaterialCommunityIcons name="eye-outline" size={14} color="#3B82F6" />
                                    <Text className="text-[#3B82F6] text-[11px] font-bold ml-1">View Certificate</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity className="bg-[#0F172A] rounded-xl py-3 items-center border border-[#1E293B] mt-2">
                        <Text className="text-[#94A3B8] text-xs font-semibold">Load More History</Text>
                    </TouchableOpacity>
                </SectionContainer>

                {/* Verification Status Log */}
                <SectionContainer>
                    <Text className="text-white text-base font-bold mb-5">Verification Status Log (Photo)</Text>

                    <View className="flex-row border-b border-[#2A3447] pb-2 mb-3">
                        <Text className="text-[#64748B] text-[10px] font-bold tracking-widest uppercase flex-[1.5]">DATE & TIME</Text>
                        <Text className="text-[#64748B] text-[10px] font-bold tracking-widest uppercase flex-1">STATUS</Text>
                        <Text className="text-[#64748B] text-[10px] font-bold tracking-widest uppercase flex-[1.5]">REMARKS</Text>
                    </View>

                    {VERIFICATION_LOG.map((log, index) => (
                        <View key={log.id} className={`flex-row py-3 ${index !== VERIFICATION_LOG.length - 1 ? 'border-b border-[#1E293B]' : ''}`}>
                            <Text className="text-[#94A3B8] text-[11px] flex-[1.5] pr-2 leading-tight">{log.date}</Text>
                            <Text className={`text-[11px] font-semibold flex-1 ${log.status === 'Approved' ? 'text-[#10B981]' :
                                log.status === 'Rejected' ? 'text-[#EF4444]' : 'text-[#3B82F6]'
                                }`}>{log.status}</Text>
                            <Text className="text-[#64748B] text-[11px] flex-[1.5] italic pr-1">{log.remarks}</Text>
                        </View>
                    ))}
                </SectionContainer>

                {/* Footer */}
                <View className="px-6 pb-12 pt-4">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-[#475569] text-[10px]">Created Date:</Text>
                        <Text className="text-[#94A3B8] text-[10px]">Mar 10, 2022</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-[#475569] text-[10px]">Last Login:</Text>
                        <Text className="text-[#94A3B8] text-[10px]">Today, 08:32 AM</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-[#475569] text-[10px]">Device Type:</Text>
                        <Text className="text-[#94A3B8] text-[10px]">Chrome (Win 11)</Text>
                    </View>
                    <View className="flex-row justify-between mb-6">
                        <Text className="text-[#475569] text-[10px]">IP Address:</Text>
                        <Text className="text-[#94A3B8] text-[10px]">192.168.1.104</Text>
                    </View>
                    <Text className="text-center text-[#334155] text-[9px]">
                        © 2023 Enterprise Learning Management System. Internal Administration Portal.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}