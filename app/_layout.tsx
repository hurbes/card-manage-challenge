import "../global.css";

import { Stack } from "expo-router/stack";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  const addCard = () => {
    router.push("add-card");
  };

  const back = () => {
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: "Cards",

          headerLeft: () => (
            <Pressable>
              <Ionicons name='chevron-back' size={24} color='black' />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={addCard}>
              <Ionicons name='add' size={24} color='black' />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='add-card'
        options={{
          title: "Add Card",
          headerTitle: "",
          presentation: "modal",
          headerLeft: () => (
            <Pressable onPress={back}>
              <Ionicons name='chevron-back' size={24} color='black' />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
