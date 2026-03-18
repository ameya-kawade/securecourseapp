import React from 'react';
import { View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface QuestionCardProps {
  question: string;
  points: number;
  timer: string;
  children: React.ReactNode;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, points, timer, children }) => {
  return (
    <Surface style={{ flex: 1, backgroundColor: 'transparent', borderRadius: 40, padding: 32, marginHorizontal: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} elevation={0}>
      <View className="flex-row justify-between items-center mb-6">
        <View className="bg-white/10 px-3 py-1.5 rounded-xl">
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '800' }}>{points} PTS</Text>
        </View>
        <View className="flex-row items-center bg-[#1d6fea1a] px-3 py-1.5 rounded-xl">
          <Ionicons name="timer-outline" size={16} color={colors.secondary} />
          <Text style={{ color: '#38bdf8', marginLeft: 6, fontSize: 14, fontWeight: 'bold' }}>{timer}</Text>
        </View>
      </View>

      <Text style={{ fontSize: 22, fontWeight: '800', color: '#FFFFFF', lineHeight: 32, marginBottom: 32 }}>{question}</Text>

      <View className="gap-4">
        {children}
      </View>
    </Surface>
  );
};

export default QuestionCard;
