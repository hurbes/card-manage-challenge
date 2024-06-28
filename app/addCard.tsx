import React, { useMemo } from "react";
import { Image, View } from "react-native";
import { Controller, Control, FieldErrors } from "react-hook-form";

import { CardFormValues, CardType } from "@/utils/cardFormSchema";
import {
  extractStringValue,
  getFormattedValue,
  getMaxLength,
} from "@/utils/cardFormatter";

import { Button } from "@/components/button";
import { SecureIcons } from "@/components/secureIcons";
import { InputField } from "@/components/inputField";
import { useAddCard } from "@/hooks/useAddCard";
import { getCardImage } from "@/utils/utils";

interface InputProps {
  label: string;
  placeholder: string;
  className?: string;
  control: Control<CardFormValues>;
  name: keyof CardFormValues;
  error?: string;
  card?: CardType;
}

interface CardFormProps {
  control: Control<CardFormValues>;
  errors: FieldErrors<CardFormValues>;
  card?: CardType;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  className,
  control,
  name,
  error,
  card,
}) => {
  const maxLength = useMemo(() => getMaxLength(name, card), [name, card]);
  const showSuffix = useMemo(() => name === "cardNumber" && card, [name, card]);
  const inputType = useMemo(() => {
    if (name === "cardholderName") return "text";
    return "numeric";
  }, [name]);

  const returnKeyType = useMemo(() => {
    if (name === "cvv") return "done";
    return "next";
  }, [name]);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => {
        const displayValue = extractStringValue(value);
        const formattedValue = getFormattedValue(name, displayValue, card);

        return (
          <InputField
            label={label}
            placeholder={placeholder}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            formattedValue={formattedValue}
            maxLength={maxLength}
            className={className}
            inputType={inputType}
            returnKeyType={returnKeyType}
            suffix={() => {
              return showSuffix ? (
                <Image
                  source={getCardImage(card!.niceType)}
                  resizeMode='cover'
                  className='h-5 w-8'
                />
              ) : null;
            }}
          />
        );
      }}
    />
  );
};
const AddCard: React.FC = () => {
  const { control, errors, cardType, isPending, onSubmit } = useAddCard();

  return (
    <View className='flex-1 bg-white px-7 py-10 justify-between'>
      <CardForm control={control} errors={errors} card={cardType} />
      <Button loading={isPending} onPress={onSubmit} />
    </View>
  );
};

const CardForm: React.FC<CardFormProps> = ({ control, errors, card }) => {
  return (
    <View className='gap-8'>
      <Input
        label='ATM/Debit/Credit card number'
        placeholder='Card number'
        control={control}
        name='cardNumber'
        error={errors.cardNumber?.message}
        card={card}
      />
      <Input
        label='Name on Card'
        placeholder='Name on Card'
        control={control}
        name='cardholderName'
        error={errors.cardholderName?.message}
      />
      <View className='flex flex-row items-stretch gap-4'>
        <Input
          label='Expiry date'
          placeholder='MM/YY'
          className='flex-1'
          control={control}
          name='expirationDate'
          error={errors.expirationDate?.message}
        />
        <Input
          label='CVV'
          placeholder='CVV'
          className='flex-1'
          control={control}
          name='cvv'
          error={errors.cvv?.message}
          card={card}
        />
      </View>
      <SecureIcons />
    </View>
  );
};

export default AddCard;
