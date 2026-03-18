import React from 'react';
import { View, TouchableOpacity, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface DashboardHeaderProps {
  onQRPress?: () => void;
  onSearchPress?: () => void;
  onNotificationsPress?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  onQRPress, 
  onSearchPress, 
  onNotificationsPress 
}) => {
  return (
    <View className="flex-row justify-between items-center mb-12">
      <View className="flex-row items-center">
        <View className="w-8 h-8 rounded-full bg-[#DEB887] mr-3" />
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', letterSpacing: -0.5 }}>LMS Portal</Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity className="ml-4 bg-white/10 p-2 rounded-lg" onPress={onQRPress}>
          <Ionicons name="qr-code-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity className="ml-4 bg-white/10 p-2 rounded-lg" onPress={onSearchPress}>
          <Ionicons name="search-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity className="ml-4 bg-white/10 p-2 rounded-lg" onPress={onNotificationsPress}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardHeader;
