import pick from "lodash.pick";
import { CardFormValues, cardFormSchema, CardType } from "./card-schema";
import { Card, cardSchema } from "@/omise/utils/validators/tokenValidators";

type Value = string | { value: string };
type FallBack = { gaps: number[]; lengths: number[]; code: { size: number } };

const FALLBACK_CARD: FallBack = {
  gaps: [4, 8, 12],
  lengths: [16],
  code: { size: 3 },
};

const removeNonNumber = (input: string = ""): string => {
  return input.replace(/[^\d]/g, "");
};

const limitLength = (input: string = "", maxLength: number): string => {
  return input.slice(0, maxLength);
};

function addGaps(input: string = "", gaps: number[]): string {
  const offsets = [0].concat(gaps).concat([input.length]);

  return offsets
    .map((end, index) => {
      if (index === 0) return "";
      const start = offsets[index - 1];
      return input.slice(start, end);
    })
    .filter((part) => part !== "")
    .join(" ");
}

const isCardType = (card: any): card is CardType => {
  return (
    card &&
    Array.isArray(card.lengths) &&
    Array.isArray(card.gaps) &&
    typeof card.code === "object" &&
    typeof card.code.size === "number"
  );
};

const formatCardNumber = (
  number: string,
  card: CardType | FallBack | null | undefined
): string => {
  const numberSanitized = removeNonNumber(number);
  const cardDetails: CardType | FallBack =
    card && isCardType(card) ? card : FALLBACK_CARD;
  const maxLength = cardDetails.lengths[cardDetails.lengths.length - 1];
  const lengthSanitized = limitLength(numberSanitized, maxLength);
  return addGaps(lengthSanitized, cardDetails.gaps);
};

const formatExpirationDate = (expiry: string): string => {
  const sanitized = limitLength(removeNonNumber(expiry), 4);
  if (sanitized.match(/^[2-9]$/)) {
    return `0${sanitized}`;
  }
  if (sanitized.length > 2) {
    return `${sanitized.slice(0, 2)}/${sanitized.slice(2)}`;
  }
  return sanitized;
};

const formatCVC = (cvc: string, card: CardType | null | undefined): string => {
  if (!card) {
    return cvc;
  }
  const maxCVCLength = card.code.size;
  return limitLength(removeNonNumber(cvc), maxCVCLength);
};

const getFormattedValue = (
  name: keyof CardFormValues,
  value: string,
  card: CardType | null | undefined
): string => {
  switch (name) {
    case "cardNumber":
      return formatCardNumber(value, card || FALLBACK_CARD);
    case "expirationDate":
      return formatExpirationDate(value);
    case "cvv":
      return formatCVC(value, card);
    default:
      return value;
  }
};

const getMaxLength = (
  name: keyof CardFormValues,
  card: CardType | null | undefined
): number | undefined => {
  console.log("name", card?.lengths, card?.gaps);
  switch (name) {
    case "cardNumber":
      if (card?.lengths.length === 1) {
        return card?.lengths[0] + card?.gaps.length;
      }
      return card?.lengths[card.lengths.length - 1];
    case "cvv":
      return card?.code.size;
    case "expirationDate":
      return 5;
    default:
      return undefined;
  }
};

const extractStringValue = (value: Value): string => {
  if (typeof value === "string") {
    return value;
  }
  if (value && typeof value === "object" && "value" in value) {
    return value.value;
  }
  return "";
};

function extractExpirationDate(expirationDate: string): {
  expiration_month: number;
  expiration_year: number;
} {
  const [month, year] = expirationDate.split("/").map(Number);

  if (!Number.isInteger(month) || !Number.isInteger(year)) {
    throw new Error("Invalid expiration date format");
  }

  return { expiration_month: month, expiration_year: year };
}

const extractCreditCardData = (data: CardFormValues): Card => {
  const { cardholderName, cardNumber, expirationDate, cvv } = data;
  const { value } = cardNumber;
  const { expiration_month, expiration_year } =
    extractExpirationDate(expirationDate);

  const extractedData: Card = {
    number: value,
    expiration_month,
    expiration_year,
    security_code: cvv,
    name: cardholderName,
    city: "Bangkok",
    country: "TH",
  };

  const parsedData = cardSchema.parse(extractedData);

  return parsedData;
};

export {
  formatCardNumber,
  formatExpirationDate,
  formatCVC,
  getFormattedValue,
  getMaxLength,
  extractStringValue,
  extractCreditCardData,
  FALLBACK_CARD,
};
