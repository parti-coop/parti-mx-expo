import React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { View } from "./View";
import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import useGroupExit from "./useGroupExit";

import iconOut from "../../assets/icon-out.png";

export default (props: {
  bg_img_url: string;
  title: string;
  userCount: string;
}) => {
  const { navigate } = useNavigation();
  const exitGroup = useGroupExit();
  const { bg_img_url, title, userCount } = props;
  return (
    <View style={{ marginHorizontal: 30, marginBottom: 20 }}>
      <Text style={{ fontSize: 14, marginBottom: 20 }}>기타</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <TouchableOpacity
          onPress={() => navigate("Member")}
          style={{
            flex: 1,
            height: 100,
            borderRadius: 25,
            backgroundColor: "#30ad9f",
            marginHorizontal: 5,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 16, color: "#ffffff" }}>
            멤버 ({userCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("GroupSetting", { title, bg_img_url })}
          style={{
            flex: 1,
            height: 100,
            borderRadius: 25,
            backgroundColor: "#30ad9f",
            marginHorizontal: 5,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 16, color: "#ffffff" }}>그룹 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={exitGroup}
          style={{
            flex: 1,
            height: 100,
            borderRadius: 25,
            backgroundColor: "#30ad9f",
            marginHorizontal: 5,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={iconOut}
            style={{ width: 22, height: 24, marginBottom: 16 }}
          />
          <Text style={{ fontSize: 16, color: "#ffffff" }}>그룹 나가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
