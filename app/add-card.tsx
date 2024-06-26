import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";
import { cn } from "@/utils/utils";

interface InputProps {
  label: string;
  placeholder: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder, className }) => {
  return (
    <View className={cn("gap-3", className)}>
      <Text className='text-lg font-semibold tracking-wide'>{label}</Text>
      <TextInput
        className='rounded-lg border-2 border-slate-200 p-5'
        placeholder={placeholder}
      />
    </View>
  );
};

const AddCard: React.FC = () => {
  return (
    <View className='flex-1 bg-white px-7 py-10 justify-between'>
      <CardForm />
      <AddCardButton />
    </View>
  );
};

const CardForm: React.FC = () => {
  return (
    <View className='gap-8'>
      <Input label='ATM/Debit/Credit card number' placeholder='Card number' />
      <Input label='Name on Card' placeholder='Name on Card' />
      <View className='flex flex-row items-stretch gap-4'>
        <Input label='Expiry date' placeholder='MM/YY' className='flex-1' />
        <Input label='CVV' placeholder='CVV' className='flex-1' />
      </View>
      <SecureIcons />
    </View>
  );
};

const AddCardButton: React.FC = () => {
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
        className='bg-[#4AD8DA] h-14 rounded-[30px] items-center justify-center'
        style={{
          transform: [{ scale }],
        }}>
        <Text className='font-bold text-xl text-white'>Add Card</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const SecureIcons: React.FC = () => {
  return (
    <View className='flex-row items-center justify-center gap-8 py-5'>
      <Image source={require("../assets/images/verified-by-visa.png")} />
      <Image source={require("../assets/images/mastercard-securecode.png")} />
      <Image source={require("../assets/images/omise-grey.png")} />
    </View>
  );
};

export default AddCard;
