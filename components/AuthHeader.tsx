import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  showIcon?: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, showIcon = true }) => {
  return (
    <View className="items-center mb-12 mt-8">
      {showIcon && (
        <View className="w-20 h-20 rounded-3xl bg-[#1D6FEA26] justify-center items-center mb-6 border border-[#1D6FEA4D]">
          <Ionicons name="shield-checkmark" size={40} color={colors.text} />
        </View>
      )}
      <Text style={{ fontSize: 24, fontWeight: '900', color: '#FFFFFF', letterSpacing: 2, textAlign: 'center' }}>{title}</Text>
      <Text style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600', marginTop: 4, letterSpacing: 0.5, textAlign: 'center' }}>{subtitle}</Text>
    </View>
  );
};

export default AuthHeader;
