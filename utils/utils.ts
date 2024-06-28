import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string, locale = "en-US") => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const now = new Date(date).toLocaleDateString(locale, options);

  return now;
};

const cardImageMap: Record<string, number> = {
  amex: require("../assets/cards/amex.png"),
  cvc_amex: require("../assets/cards/cvc_amex.png"),
  cvc: require("../assets/cards/cvc.png"),
  diners: require("../assets/cards/diners.png"),
  discover: require("../assets/cards/discover.png"),
  jcb: require("../assets/cards/jcb.png"),
  mastercard: require("../assets/cards/mastercard.png"),
  unknown: require("../assets/cards/unknown.png"),
  visa: require("../assets/cards/visa.png"),
};

export const getCardImage = (cardType: string): number => {
  return cardImageMap[cardType.toLowerCase()] || cardImageMap["unknown"];
};
