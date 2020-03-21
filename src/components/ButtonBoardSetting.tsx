import React from "react";
import { TouchableOpacity } from "./TouchableOpacity";
import { Text } from "./Text";
import { useNavigation } from "@react-navigation/native";
export default () => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#30ad9f",
        borderRadius: 10,
        paddingHorizontal: 10
      }}
      onPress={() => navigate("BoardSetting")}
    >
      <Text
        style={{
          fontSize: 12,
          color: "#ffffff"
        }}
      >
        🔧관리
      </Text>
    </TouchableOpacity>
  );
};
