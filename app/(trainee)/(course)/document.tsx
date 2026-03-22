import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useHeaderHeight } from '@react-navigation/elements';

export default function Document() {
    const headerHeight = useHeaderHeight();

    return (
        <SafeAreaView className='flex flex-1 bg-[#0B1120]'>
            <StatusBar style='light' />
            <Text className='text-white'>Document</Text>
        </SafeAreaView>
    )
}