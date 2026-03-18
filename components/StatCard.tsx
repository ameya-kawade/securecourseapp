import React from 'react';
import { Surface, Text } from 'react-native-paper';

interface StatCardProps {
  title: string;
  value: string;
  tint: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, tint }) => {
  return (
    <Surface 
      style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: 24, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: tint, marginHorizontal: 4 }} 
      elevation={0}
    >
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#FFFFFF' }}>{value}</Text>
      <Text style={{ fontSize: 12, color: '#A0ABC0', marginTop: 4, fontWeight: '600' }}>{title}</Text>
    </Surface>
  );
};

export default StatCard;
