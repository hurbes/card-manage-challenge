import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import {
  useForm,
  SubmitHandler,
  Controller,
  Control,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardFormValues, CardType, cardSchema } from "@/utils/card-schema";
import {
  extractCreditCardData,
  extractStringValue,
  getFormattedValue,
  getMaxLength,
} from "@/utils/card-formatter";

import { Button } from "@/components/button";
import { SecureIcons } from "@/components/secure-icons";
import { InputField } from "@/components/input-field";

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

  return (
    <>
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
              suffix={
                name === "cardNumber" && card ? (
                  <Text className='ml-2 text-lg font-semibold'>
                    {card.type}
                  </Text>
                ) : null
              }
            />
          );
        }}
      />
    </>
  );
};

const AddCard: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CardFormValues>({
    mode: "onChange",
    resolver: zodResolver(cardSchema),
  });

  const [cardType, setCardType] = useState<CardType | null>(null);

  const watchAllFields = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      const result = cardSchema.shape.cardNumber.safeParse(value.cardNumber);
      if (result.success) {
        setCardType(result.data.card);
      }
    });
    return () => subscription.unsubscribe();
  }, [watchAllFields]);

  const onSubmit: SubmitHandler<CardFormValues> = (data) => {
    const cardData = extractCreditCardData(data);
    console.log(cardData);
  };

  return (
    <View className='flex-1 bg-white px-7 py-10 justify-between'>
      <CardForm control={control} errors={errors} card={cardType} />
      <Button onPress={handleSubmit(onSubmit)} />
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
