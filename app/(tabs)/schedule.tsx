import { View, Text } from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import { colors } from '../../theme/colors';

export default function ScheduleScreen() {
  return (
    <GradientBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.text, fontSize: 18 }}>Schedule Content</Text>
    </GradientBackground>
  );
}
