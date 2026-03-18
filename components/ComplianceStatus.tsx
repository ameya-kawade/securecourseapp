import React from 'react';
import { View } from 'react-native';
import { Surface, Text, ProgressBar } from 'react-native-paper';
import { colors } from '../theme/colors';

interface ComplianceStatusProps {
  percentage: number;
}

const ComplianceStatus: React.FC<ComplianceStatusProps> = ({ percentage }) => {
  return (
    <Surface style={{ backgroundColor: 'transparent', padding: 32, borderRadius: 40, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', marginBottom: 40 }} elevation={0}>
      <View className="flex-row justify-between items-center mb-5">
        <View>
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 }}>Compliance Status</Text>
          <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.5)', fontWeight: '500', marginTop: 2 }}>You are {percentage}% compliant</Text>
        </View>
        <View className="bg-[#1d6fea1a] px-3 py-1.5 rounded-xl border border-[#1d6fea33]">
          <Text style={{ color: colors.secondary, fontWeight: '800', fontSize: 16 }}>{percentage}%</Text>
        </View>
      </View>
      <ProgressBar progress={percentage / 100} color={colors.secondary} style={{ height: 8, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
    </Surface>
  );
};

export default ComplianceStatus;
