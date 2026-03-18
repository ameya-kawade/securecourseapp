import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Surface, RadioButton, Text } from 'react-native-paper';
import { colors } from '../theme/colors';

interface OptionItemProps {
  id: string;
  label: string;
  isSelected: boolean;
  onPress: (id: string) => void;
}

const OptionItem: React.FC<OptionItemProps> = ({ id, label, isSelected, onPress }) => {
  return (
    <Surface
      style={[
        { borderRadius: 16, borderWidth: 2, overflow: 'hidden', marginBottom: 16 },
        isSelected 
          ? { borderColor: '#1D6FEA', backgroundColor: '#1d6fea0d' } 
          : { borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }
      ]}
      elevation={isSelected ? 2 : 0}
    >
      <TouchableOpacity
        className="flex-row items-center p-4 min-h-[64px]"
        onPress={() => onPress(id)}
        activeOpacity={0.7}
      >
        <RadioButton.Android 
          value={id} 
          status={isSelected ? 'checked' : 'unchecked'}
          color={colors.primary} 
          uncheckedColor="rgba(255,255,255,0.2)" 
          onPress={() => onPress(id)}
        />
        <Text style={[
          { fontSize: 16, fontWeight: '600', marginLeft: 8, flex: 1 },
          isSelected ? { color: '#FFFFFF' } : { color: 'rgba(255, 255, 255, 0.7)' }
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Surface>
  );
};

export default OptionItem;
