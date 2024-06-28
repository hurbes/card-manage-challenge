import { cn } from "@/utils/utils";
import { useState } from "react";
import {
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
} from "react-native";

interface ButtonProps {
  onPress: () => void;
  buttonClass?: string;
  titleClass?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  buttonClass,
  titleClass,
  loading = false,
}) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.95,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressIn}>
      <Animated.View
        className={cn(
          "bg-[#4AD8DA] h-14 rounded-[30px] items-center justify-center",
          buttonClass
        )}
        style={{
          transform: [{ scale }],
        }}
        onTouchEnd={onPress}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text className={cn("font-bold text-xl text-white", titleClass)}>
            Add Card
          </Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export { Button };
