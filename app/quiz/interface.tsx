import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, StatusBar } from 'react-native';
import {
  Text,
  ProgressBar,
  Button,
  IconButton,
  Surface,
  RadioButton
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import GradientBackground from '../../components/GradientBackground';
import QuizHeader from '../../components/QuizHeader';
import QuizProgress from '../../components/QuizProgress';
import QuestionCard from '../../components/QuestionCard';
import OptionItem from '../../components/OptionItem';
import { colors } from '../../theme/colors';

const MOCK_OPTIONS = [
  { id: '1', label: 'User-Centricity' },
  { id: '2', label: 'Visual Complexity' },
  { id: '3', label: 'Maximum Features' },
  { id: '4', label: 'Aesthetic Only Focus' },
];

export default function QuizInterface() {
  const [selectedOption, setSelectedOption] = React.useState<string>('1');

  return (
    <GradientBackground className="flex-1">
      <SafeAreaView className={Platform.OS === 'android' ? 'flex-1 pt-6' : 'flex-1'} edges={['top', 'bottom']}>

        <QuizHeader title="Trainee Quiz" onClose={() => router.back()} />

        <QuizProgress current={3} total={10} />

        <QuestionCard 
          question="What is the primary purpose of a Fire Escape Plan in a commercial building?"
          points={10}
          timer="00:45"
        >
          <RadioButton.Group onValueChange={value => setSelectedOption(value)} value={selectedOption}>
            {MOCK_OPTIONS.map((option) => (
              <OptionItem
                key={option.id}
                id={option.id}
                label={option.label}
                isSelected={selectedOption === option.id}
                onPress={setSelectedOption}
              />
            ))}
          </RadioButton.Group>
        </QuestionCard>

        {/* Footer Actions */}
        <View className="flex-row gap-4 mt-12 px-8 mb-12">
          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={{ flex: 1, borderRadius: 16, borderColor: 'rgba(255, 255, 255, 0.2)', borderWidth: 1 }}
            contentStyle={{ height: 56 }}
            labelStyle={{ color: "rgba(255,255,255,0.5)" }}
          >
            Previous
          </Button>
          <Button
            mode="contained"
            onPress={() => { }}
            style={{ flex: 1, borderRadius: 16, backgroundColor: '#1D6FEA' }}
            contentStyle={{ height: 56 }}
            labelStyle={{ color: colors.text, fontWeight: '800' }}
          >
            Next Question
          </Button>
        </View>

      </SafeAreaView>
    </GradientBackground>
  );
}
