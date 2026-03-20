import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useHeaderHeight } from '@react-navigation/elements';

export default function Document() {
    const headerHeight = useHeaderHeight();

    return (
        <SafeAreaView edges={['top', 'left', 'right']} className='flex flex-1 p-10 bg-[#0B1120]' style={{ paddingTop: 50 }}>
            <StatusBar style='light' />
            <Text className='text-white'>Document</Text>
        </SafeAreaView>
    )
}