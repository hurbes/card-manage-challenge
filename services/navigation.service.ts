import { useRouter } from "expo-router";

const NavigationService = () => {
  const router = useRouter();

  const addCard = () => {
    router.push("add-card");
  };

  const back = () => {
    router.back();
  };

  return {
    addCard,
    back,
  };
};
