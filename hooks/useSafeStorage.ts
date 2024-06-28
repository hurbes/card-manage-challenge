import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

type SaveValueFunction<T> = (newValue: T) => Promise<void>;

const useSafeStorage = <T>(
  key: string,
  initialValue?: T
): {
  isLoading: boolean;
  data: T | undefined;
  getValue: () => Promise<QueryObserverResult<T, Error>>;
  saveValue: SaveValueFunction<T>;
} => {
  const { isLoading, data, refetch } = useQuery<T>({
    queryKey: [key],
    queryFn: async () => {
      const value = await SecureStore.getItemAsync(key);
      return value ? JSON.parse(value) : initialValue;
    },
  });

  const saveValue: SaveValueFunction<T> = async (newValue) => {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(newValue));
      refetch();
    } catch (error) {
      console.error("Error saving value to SecureStore:", error);
    }
  };

  return { isLoading, data, getValue: refetch, saveValue };
};

export { useSafeStorage };
