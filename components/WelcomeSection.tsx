import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';

interface WelcomeSectionProps {
  userName: string;
  weeklyGoalPercentage: number;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName, weeklyGoalPercentage }) => {
  return (
    <View className="mb-8">
      <Text style={{ fontSize: 32, fontWeight: '800', color: '#FFFFFF', marginBottom: 8, letterSpacing: -1 }}>Hello, {userName}!</Text>
      <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.5)' }}>You&apos;ve completed {weeklyGoalPercentage}% of your weekly goal.</Text>
    </View>
  );
};

export default WelcomeSection;
