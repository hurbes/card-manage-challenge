import { cn } from "@/utils/utils";
import React from "react";
import { TextInput, View, Text } from "react-native";

interface InputFieldProps {
  label: string;
  placeholder: string;
  error?: string;
  onBlur: () => void;
  onChange: (text: string) => void;
  formattedValue: string;
  maxLength: number | undefined;
  suffix?: React.ReactNode;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  error,
  onBlur,
  onChange,
  formattedValue,
  maxLength,
  suffix,
  className,
}) => {
  return (
    <View className={cn("gap-3", className)}>
      <Text className='text-lg font-semibold tracking-wide'>{label}</Text>
      <View
        className={cn(
          "rounded-lg border-2 py-5 px-3 flex-row justify-between",
          error ? "border-red-500" : "border-slate-200"
        )}>
        <TextInput
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={formattedValue}
          maxLength={maxLength}
          inputMode='numeric'
          keyboardType='numeric'
          className='flex-1 font-semibold tracking-wide'
        />
        {suffix ? suffix : null}
      </View>
      {error && <Text className='text-red-500 text-sm'>{error}</Text>}
    </View>
  );
};

export { InputField };
