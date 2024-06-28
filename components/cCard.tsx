import React, { useCallback, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { CardResponse } from "@/omise/utils/validators/cardValidators";
import { getCardImage } from "@/utils/utils";
import { useCreateCharge } from "@/omise/hooks/useCharge";
import { formatReadableExpirationDate } from "@/utils/cardFormatter";

interface CardDetailsProps {
  name: string;
  expiry: string;
}

interface DetailsColumnProps {
  title: string;
  value: string;
}

const extractCustomerId = (url: string): string | null => {
  const regex = /\/customers\/(cust_[^/]+)\//;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const CCard: React.FC<{ card: CardResponse }> = ({ card }) => {
  const exp = useMemo(() => {
    return formatReadableExpirationDate({
      expiration_month: card.expiration_month,
      expiration_year: card.expiration_year,
    });
  }, [card.expiration_month, card.expiration_year]);

  const cardImage = useMemo(() => getCardImage(card.brand), [card.brand]);
  const { isError, isSuccess, isPending, mutate, error, data } =
    useCreateCharge();

  useEffect(() => {
    if (isError) {
      console.error(error);
      alert(`Failed to create charge\n${error.message}`);
    }

    if (isSuccess) {
      alert(`Charge created successfully with id: ${data.id}`);
    }
  }, [isError, isSuccess, error, data]);

  const handleCharge = useCallback(() => {
    const customerId = extractCustomerId(card.location);
    mutate({
      data: {
        amount: 20000,
        currency: "thb",
        card: card.id,
        description: "Test Charge",
        customer: customerId || "",
      },
    });
  }, [mutate]);

  if (isPending) {
    return (
      <View
        className='bg-white h-[200px] w-11/12 rounded-[12px] p-7 self-center m-5 items-center justify-center'
        style={styles.shadowContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleCharge}>
      <View
        className='bg-white h-[200px] w-11/12 rounded-[12px] p-7 self-center m-5'
        style={styles.shadowContainer}>
        <Image source={cardImage} className='h-12 w-20 ' resizeMode='contain' />
        <View className='w-10/12'>
          <CardNumber number={card.last_digits} />
          <CardDetails name={card.name} expiry={exp} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CardNumber: React.FC<{ number: string }> = ({ number }) => {
  return (
    <View className='flex-row gap-4 pt-4'>
      {Array.from({ length: 3 }, (_, index) => index).map((_, index) => (
        <Text key={index} className='text-4xl tracking-[.14rem] text-gray-500'>
          ••••
        </Text>
      ))}
      <Text className='text-xl tracking-[.36rem] text-gray-500 py-2'>
        {number}
      </Text>
    </View>
  );
};

const CardDetails: React.FC<CardDetailsProps> = ({ name, expiry }) => {
  return (
    <View className='flex-row justify-between'>
      <DetailsColumn title='Name on Card' value={name} />
      <DetailsColumn title='Expires' value={expiry} />
    </View>
  );
};

const DetailsColumn: React.FC<DetailsColumnProps> = ({ title, value }) => {
  return (
    <View>
      <Text className='text-xs text-gray-300 py-4'>{title}</Text>
      <Text className='text-sm font-semibold'>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10, // This is for Android shadow
  },
});

export { CCard };
