import React from "react";
import { ActivityIndicator, View } from "react-native";

const FullPageLoader: React.FC = () => {
  return (
    <View className='items-center justify-center h-full'>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export { FullPageLoader };
