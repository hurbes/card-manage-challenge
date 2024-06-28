import { useCreateToken } from "@/omise/hooks/useTokens";
import {
  cardFormSchema,
  CardFormValues,
  CardType,
} from "@/utils/cardFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Control, FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { useSafeStorage } from "./useSafeStorage";
import { useUpdateCustomer } from "@/omise/hooks/useCustomer";
import { useEffect, useState } from "react";
import { extractCreditCardData } from "@/utils/cardFormatter";

interface UseAddCardReturn {
  control: Control<CardFormValues>;
  errors: FieldErrors<CardFormValues>;
  cardType: CardType | null;
  isPending: boolean;
  onSubmit: () => Promise<void>;
}

export const useAddCard = (): UseAddCardReturn => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CardFormValues>({
    mode: "onChange",
    resolver: zodResolver(cardFormSchema),
  });

  const router = useRouter();
  const {
    mutate: createCardToken,
    isPending: isTokenPending,
    isError: isTokenError,
    error: tokenError,
    data: createdToken,
    isSuccess: isTokenSuccess,
  } = useCreateToken();

  const { data: customer_id } = useSafeStorage<string>("customer_id", "");
  const {
    isError: isUpdateError,
    error: updateError,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    mutate: updateCustomer,
  } = useUpdateCustomer(customer_id || "");
  const [cardType, setCardType] = useState<CardType | null>(null);

  const watchAllFields = watch();

  useEffect(() => {
    if (isTokenError) {
      alert(`Failed to create card\n${tokenError.message}`);
    }
  }, [isTokenError, tokenError]);

  useEffect(() => {
    const subscription = watch((value) => {
      const result = cardFormSchema.shape.cardNumber.safeParse(
        value.cardNumber
      );
      if (result.success) {
        setCardType(result.data.card);
      }
    });
    return () => subscription.unsubscribe();
  }, [watchAllFields]);

  useEffect(() => {
    if (isUpdateError) {
      alert(`Failed to update customer\n${updateError.data.message}`);
    }

    if (isUpdateSuccess && isTokenSuccess) {
      alert(`Card added successfully!`);
      router.back();
    }
  }, [isUpdateError, isUpdateSuccess, updateError]);

  useEffect(() => {
    if (customer_id && createdToken) {
      updateCustomer({ data: { card: createdToken.id } });
    }
  }, [customer_id, createdToken]);

  const isPending = isTokenPending || isUpdatePending;

  const onSubmit: SubmitHandler<CardFormValues> = (data) => {
    const card = extractCreditCardData(data);
    createCardToken({ data: { card } });
  };

  const submit = async () => {
    handleSubmit(onSubmit)();
  };

  return {
    control,
    errors,
    cardType,
    isPending,
    onSubmit: submit,
  };
};
