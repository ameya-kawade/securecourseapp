// src/screens/VideoLessonScreen.tsx
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

// --- Constants ---
const VIDEO_SOURCE = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


// --- Main Screen Component ---

export default function VideoLessonScreen() {
    // Initialize expo-video player
    const player = useVideoPlayer(VIDEO_SOURCE, player => {
        player.loop = false;
        player.pause(); // Start paused
    });

    return (
        <View className="flex-1 bg-[#121A27]">
            <StatusBar hidden />

            {/* Video Player using Native OS Controls */}
            <VideoView
                style={StyleSheet.absoluteFill}
                player={player}
                nativeControls={true}
                contentFit="contain"
                allowsPictureInPicture={true}
                fullscreenOptions={{ enable: true }}
            />
        </View>
    );
}