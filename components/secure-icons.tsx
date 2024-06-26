import { View, Image } from "react-native";

const SecureIcons: React.FC = () => {
  return (
    <View className='flex-row items-center justify-center gap-8 py-5'>
      <Image source={require("../assets/images/verified-by-visa.png")} />
      <Image source={require("../assets/images/mastercard-securecode.png")} />
      <Image source={require("../assets/images/omise-grey.png")} />
    </View>
  );
};

export { SecureIcons };
