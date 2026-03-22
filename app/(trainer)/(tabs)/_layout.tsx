import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#0B1120', // Dark navy background
                    borderTopColor: '#1E293B',
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#0D6EFD', // Bright blue
                tabBarInactiveTintColor: '#64748B', // Slate gray
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'HOME',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" size={26} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="schedule"
                options={{
                    title: 'SCHEDULE',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="calendar-blank" size={26} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="trainees"
                options={{
                    title: 'TRAINEES',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-group" size={26} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'SETTINGS',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog" size={26} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}