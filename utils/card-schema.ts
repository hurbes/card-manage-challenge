import { z } from "zod";
import valid from "card-validator";
import { CardNumberVerification } from "card-validator/dist/card-number";

const cardNumberSchema = z
  .string()
  .refine(
    (value) => {
      const result = valid.number(value);
      return result.isPotentiallyValid;
    },
    {
      message: "Invalid card number",
    }
  )
  .transform((value) => {
    const result = valid.number(value);

    return { value, card: result.card };
  });

const expirationDateSchema = z.string().refine(
  (value) => {
    const result = valid.expirationDate(value);
    return result.isValid;
  },
  {
    message: "Invalid expiration date",
  }
);

const cvvSchema = z.string().refine(
  (value) => {
    const result = valid.cvv(value);
    return result.isValid;
  },
  {
    message: "Invalid CVV",
  }
);

const cardholderNameSchema = z.string().min(1, {
  message: "Cardholder name cannot be empty",
});

// Define the complete card schema
const cardFormSchema = z.object({
  cardNumber: cardNumberSchema,
  expirationDate: expirationDateSchema,
  cvv: cvvSchema,
  cardholderName: cardholderNameSchema,
});

type CardFormValues = z.infer<typeof cardFormSchema>;
type CardType = CardNumberVerification["card"];

export { CardFormValues, CardType, cardFormSchema };
