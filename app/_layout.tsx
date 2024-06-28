import "../global.css";

import { Stack } from "expo-router/stack";
import { Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { OmiseConfigProvider } from "@/omise/config";

export default function RootLayout() {
  return (
    <OmiseConfigProvider
      config={{
        publicKey: "pkey_test_5wvisbxphp1zapg8ie6",
        secretKey: "skey_test_5wvisdjjoqmfof5npzw",
        apiVersion: "2019-05-29",
      }}>
      <StatusBar style='dark' />
      <RootStack />
    </OmiseConfigProvider>
  );
}

const RootStack: React.FC = () => {
  const router = useRouter();

  const addCard = () => {
    router.push("addCard");
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
        name='addCard'
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
};
