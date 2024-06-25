import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import { FlashList } from "@shopify/flash-list";

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

const maskCreditCard = (card: string): string => {
  const maskedCard = card.replace(/.(?=.{4})/g, "•").match(/.{1,4}/g);
  if (maskedCard) {
    return maskedCard.join("  ");
  }
  return "";
};

const data: number[] = [];

const Page: React.FC = () => {
  if (data.length === 0) {
    return <EmptyState />;
  }
  return (
    <View className='bg-white h-full w-full'>
      <FlashList
        renderItem={({ item }) => {
          return <Card />;
        }}
        estimatedItemSize={200}
        data={data}
      />
    </View>
  );
};

const Card: React.FC = () => {
  const creditCard = maskCreditCard("1234567890123456");
  return (
    <View
      className='bg-white h-[180px] w-11/12 rounded-[12px] p-4 self-center m-5'
      style={styles.shadowContainer}>
      <LottieView
        autoPlay
        loop={false}
        style={{
          width: "25%",
          height: "35%",
        }}
        source={require("../assets/animations/visa.json")}
      />
      <View className='w-10/12'>
        <Text className='text-xl tracking-[.36rem] text-gray-500 px-4 py-2'>
          {creditCard}
        </Text>
        <CardDetails name='John Doe' expiry='12/25' />
      </View>
    </View>
  );
};

interface CardDetailsProps {
  name: string;
  expiry: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({ name, expiry }) => {
  return (
    <View className='flex-row justify-between px-4'>
      <DetailsColumn title='Name on Card' value={name} />
      <DetailsColumn title='Expiry' value={expiry} />
    </View>
  );
};

interface DetailsColumnProps {
  title: string;
  value: string;
}

const DetailsColumn: React.FC<DetailsColumnProps> = ({ title, value }) => {
  return (
    <View>
      <Text className='text-xs text-gray-300 py-3'>{title}</Text>
      <Text className='text-sm font-semibold'>{value}</Text>
    </View>
  );
};

const EmptyState: React.FC = () => {
  return (
    <View className='flex-col h-full gap-3 items-center justify-center bg-white'>
      <Text className='text-6xl'>💳</Text>
      <Text className='text-lg'>No Cards Found</Text>
      <Text className='text-lg text-center'>
        We recommend adding a card{"\n"}for easy payment
      </Text>
      <Link href='/add-card' className='text-lg font-semibold text-sky-400'>
        Add New Card
      </Link>
    </View>
  );
};

export default Page;
