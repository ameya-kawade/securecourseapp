import React from 'react';
import { View } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { colors } from '../theme/colors';

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => {
  const progress = current / total;
  const percentage = Math.round(progress * 100);

  return (
    <View className="px-6 mt-4 mb-8">
      <View className="flex-row justify-between mb-2">
        <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', letterSpacing: 0.5 }}>QUESTION {current} OF {total}</Text>
        <Text style={{ color: '#1D6FEA', fontSize: 12, fontWeight: 'bold' }}>{percentage}% Complete</Text>
      </View>
      <ProgressBar progress={progress} color={colors.primary} style={{ height: 6, borderRadius: 3, backgroundColor: '#1e293b' }} />
    </View>
  );
};

export default QuizProgress;
