import React, { useCallback, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useSafeStorage } from "@/hooks/useSafeStorage";
import { useCreateCustomer } from "@/omise/hooks/useCustomer";
import { FullPageLoader } from "@/components/fullPageloader";
import { useFetchAllCards } from "@/omise/hooks/useCard";
import { CCard } from "@/components/cCard";

const Page: React.FC = () => {
  const { isLoading, data, saveValue } = useSafeStorage<string | null>(
    "customer_id"
  );

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!data) {
    return <CreateCustomer saveValue={saveValue} />;
  }

  return <CardList customerId={data} />;
};

const CreateCustomer: React.FC<{ saveValue: (value: string) => void }> = ({
  saveValue,
}) => {
  const { data, isPending, error, isSuccess, isError, mutate } =
    useCreateCustomer();

  useEffect(() => {
    if (isSuccess && data) {
      saveValue(data.id);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      alert(`Failed to create customer${error.message}`);
    }
  }, [isError]);

  const handleCreateCustomer = useCallback(() => {
    mutate({
      data: {
        email: "test_demo-1@demo.com",
        description: "Test Customer #1 - John Doe",
      },
    });
  }, [mutate]);

  if (isPending) {
    return <FullPageLoader />;
  }

  return (
    <View className='items-center justify-center h-full gap-4'>
      <Text className='text-3xl'>No customer data found</Text>
      <Pressable onPress={handleCreateCustomer}>
        <Text className='text-lg text-sky-400'>Create a dummy customer</Text>
      </Pressable>
    </View>
  );
};

const CardList: React.FC<{ customerId: string }> = ({ customerId }) => {
  const { data, isLoading, isError, error } = useFetchAllCards(customerId);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    alert(`Failed to fetch customer cards${error.message}`);
  }

  if (data?.data?.length === 0) {
    return <EmptyState />;
  }

  return (
    <View className='flex-col bg-white gap-3 h-full w-full'>
      <FlashList
        data={data?.data}
        estimatedItemSize={300}
        renderItem={(ccCard) => <CCard card={ccCard.item} />}
      />
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
      <Link href='/addCard' className='text-lg font-semibold text-sky-400'>
        Add New Card
      </Link>
    </View>
  );
};

export default Page;
