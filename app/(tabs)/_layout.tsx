import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#3C5898" },
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "React Native Post Manager",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/postForm")}
              style={{
                margin: 12,
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#fff",
                borderColor: "#3C5898",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
              }}
            >
              <Text
                style={{ fontSize: 24, color: "#3C5898", fontWeight: "bold" }}
              >
                +
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
