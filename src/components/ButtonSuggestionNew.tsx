import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "./TouchableOpacity";
import btnWrite from "../../assets/btnWrite.png";
// import { Text } from "./Text";
import { useNavigation } from "@react-navigation/native";
const rectangle3Copy3 = {
  width: 56,
  height: 51,
  borderRadius: 18,
  backgroundColor: "#30ad9f",
  shadowColor: "rgba(0, 0, 0, 0.35)",
  shadowOffset: {
    width: -1.8,
    height: -2.4
  },
  shadowRadius: 7,
  shadowOpacity: 1
};
export default () => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate("SuggestionNew")}
      style={[
        rectangle3Copy3,
        {
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 10,
          right: 16
        }
      ]}
    >
      <Image source={btnWrite} />
    </TouchableOpacity>
  );
};
