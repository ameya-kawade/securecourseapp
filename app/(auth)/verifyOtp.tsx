// src/screens/OTPVerificationScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Constants ---
const OTP_LENGTH = 6;
const PHONE_NUMBER = '+1 (555) 000-0000';
const TIMER_START = 45; // seconds

// --- Components ---

const Header = () => (
    <View className="px-4 py-4 mb-4">
        <TouchableOpacity className="p-2 -ml-2 self-start">
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
    </View>
);

const TitleSection = () => (
    <View className="px-6 mb-8">
        <Text className="text-white text-3xl font-bold mb-3">Verify Phone Number</Text>
        <Text className="text-[#94A3B8] text-base leading-6">
            Enter the {OTP_LENGTH}-digit code sent to your phone{' '}
            <Text className="text-[#3B82F6]">{PHONE_NUMBER}</Text> via SMS/WhatsApp.
        </Text>
    </View>
);

const OTPInput = ({ otp, setOtp }: { otp: string[]; setOtp: (val: string[]) => void }) => {
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto-advance to next input
        if (text !== '' && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Handle backspace to move to previous input
        if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View className="flex-row justify-between px-6 mb-8">
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => (inputs.current[index] = ref)}
                    className={`w-12 h-14 rounded-xl text-center text-white text-xl font-bold ${digit ? 'bg-[#1E293B] border border-[#3B82F6]' : 'bg-[#1A2235] border border-transparent'
                        }`}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    placeholder="•"
                    placeholderTextColor="#64748B"
                    selectionColor="#3B82F6"
                />
            ))}
        </View>
    );
};

const TimerBadge = ({ timer }: { timer: number }) => {
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <View className="items-center mb-6">
            <View className="flex-row items-center bg-[#172554] px-4 py-2 rounded-full border border-[#1E3A8A]">
                <MaterialCommunityIcons name="timer-outline" size={16} color="#3B82F6" />
                <Text className="text-[#3B82F6] font-bold ml-2 tracking-widest">
                    {formatTime(timer)}
                </Text>
            </View>
        </View>
    );
};

// --- Main Screen ---

export default function OTPVerificationScreen() {
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const [timer, setTimer] = useState(TIMER_START);

    // Timer Logic
    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [timer]);

    const handleResend = () => {
        if (timer === 0) {
            setTimer(TIMER_START);
            // Add resend logic here
        }
    };

    const isOtpComplete = otp.every((digit) => digit !== '');

    return (
        <SafeAreaView className="flex-1 bg-[#0F172A]">
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

            <TitleSection />

            <OTPInput otp={otp} setOtp={setOtp} />

            <TimerBadge timer={timer} />

            <View className="flex-row justify-center mb-auto">
                <Text className="text-[#94A3B8] text-sm">Didn't receive the code? </Text>
                <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                    <Text className={`text-sm font-semibold ${timer > 0 ? 'text-[#1E3A8A]' : 'text-[#3B82F6]'}`}>
                        Resend Code
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Actions */}
            <View className="px-6 pb-8 pt-4">
                <Button
                    mode="contained"
                    buttonColor="#0D6EFD"
                    textColor="white"
                    className="rounded-xl w-full mb-6"
                    contentStyle={{ height: 56, flexDirection: 'row-reverse' }}
                    labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                    icon="arrow-right"
                    disabled={!isOtpComplete}
                    style={{ opacity: isOtpComplete ? 1 : 0.5 }}
                    onPress={() => console.log('Verify OTP:', otp.join(''))}
                >
                    Verify & Continue
                </Button>

                <TouchableOpacity className="flex-row items-center justify-center py-2">
                    <MaterialCommunityIcons name="pencil" size={16} color="#94A3B8" className="mr-2" />
                    <Text className="text-[#94A3B8] font-medium ml-2">Change Phone Number</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}