import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function CourseLayout() {
    const { courseId } = useLocalSearchParams();
    return (
        <Stack
            screenOptions={
                {
                    headerBackground: () => <View style={{ backgroundColor: "#0B1120" }} />,
                    headerTitle: "",
                    headerShown: true,
                    headerTitleStyle: { color: "white" },
                    headerTintColor: "white",
                }
            }
        />
    );
}