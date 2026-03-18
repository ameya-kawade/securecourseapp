import React from 'react';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { colors } from '../theme/colors';

interface QuizHeaderProps {
  title: string;
  onClose: () => void;
  onHelp?: () => void;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ title, onClose, onHelp }) => {
  return (
    <View className="flex-row items-center justify-between px-6 py-4">
      <IconButton
        icon="close"
        iconColor={colors.text}
        size={24}
        onPress={onClose}
        style={{ margin: 0 }}
      />
      <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <IconButton
        icon="help-circle-outline"
        iconColor={colors.text}
        size={24}
        onPress={onHelp}
        style={{ margin: 0 }}
      />
    </View>
  );
};

export default QuizHeader;
