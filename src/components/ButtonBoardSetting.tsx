import React from "react";
import { Image } from "./Image";
import { TouchableOpacity, TORow } from "./TouchableOpacity";
import { Text } from "./Text";
import { useNavigation } from "@react-navigation/native";
import iconManage from "../../assets/iconManage.png";
export default () => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  return (
    <TORow
      style={{
        backgroundColor: "#30ad9f",
        borderRadius: 10,
        paddingHorizontal: 10,
      }}
      onPress={() => navigate("BoardSetting")}
    >
      <Image source={iconManage} style={{ marginRight: 3 }} />
      <Text
        style={{
          fontSize: 12,
          color: "#ffffff",
        }}
      >
        관리
      </Text>
    </TORow>
  );
};
