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
  suffix?: () => React.ReactNode;
  className?: string;
  inputType?: "text" | "numeric";
  returnKeyType?: "done" | "next";
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
  inputType = "text",
  returnKeyType = "next",
}) => {
  console.log("InputFieldProps", maxLength);
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
          inputMode={inputType}
          returnKeyType={returnKeyType}
          placeholderTextColor={"#A0AEC0"}
          className='flex-1 font-semibold tracking-wide w-full text-gray-800'
        />
        {suffix ? suffix() : null}
      </View>
      {error && <Text className='text-red-500 text-sm'>{error}</Text>}
    </View>
  );
};

export { InputField };
