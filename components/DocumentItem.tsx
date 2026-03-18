import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface DocumentItemProps {
  title: string;
  date: string;
  icon: string;
  onDownload?: () => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ title, date, icon, onDownload }) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between p-6 border-b border-white/5" activeOpacity={0.7}>
      <View className="flex-row items-center">
        <View className="w-11 h-11 rounded-xl bg-[#ffffff08] justify-center items-center mr-3">
          <Ionicons name={icon as any} size={20} color={colors.text} />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>{title}</Text>
          <Text style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.5)', fontWeight: '500', marginTop: 2 }}>{date}</Text>
        </View>
      </View>
      <IconButton 
        icon="download" 
        size={20} 
        iconColor="rgba(255,255,255,0.5)" 
        onPress={onDownload}
      />
    </TouchableOpacity>
  );
};

export default DocumentItem;
