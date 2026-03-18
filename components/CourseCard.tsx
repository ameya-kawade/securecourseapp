import React from 'react';
import { View } from 'react-native';
import { Card as PaperCard, Text, ProgressBar } from 'react-native-paper';
import { colors } from '../theme/colors';

interface CourseCardProps {
  title: string;
  progress: number;
  tag: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, progress, tag }) => {
  return (
    <PaperCard style={{ backgroundColor: 'transparent', borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} elevation={0}>
      <PaperCard.Content style={{ padding: 24 }}>
        <View className="flex-row justify-between items-center mb-2">
          <View className="bg-[#1D6FEA1A] px-2 py-1 rounded-md">
            <Text style={{ color: '#1D6FEA', fontSize: 10, fontWeight: '800' }}>{tag}</Text>
          </View>
          <Text style={{ fontSize: 12, color: '#A0ABC0', fontWeight: 'bold' }}>{progress}%</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16 }} numberOfLines={2}>{title}</Text>
        <ProgressBar progress={progress / 100} color={colors.primary} style={{ height: 6, borderRadius: 3 }} />
      </PaperCard.Content>
    </PaperCard>
  );
};

export default CourseCard;
