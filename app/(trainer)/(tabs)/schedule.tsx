import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function schedule() {
    const router = useRouter();
    return (
        <View className='flex flex-1 justify-center items-center'>
            <Text onPress={() => router.push('/(trainer)/create-session/step1')}>schedule</Text>
        </View>
    )
}