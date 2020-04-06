import React from "react";
import { Image, ViewProps } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { View } from "./View";
import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import useGroupExit from "./useGroupExit";

import iconOut from "../../assets/iconOut.png";
import iconMember from "../../assets/iconMember.png";
import iconSetting from "../../assets/iconSetting.png";
const btnStyle = {
  flex: 1,
  height: 100,
  borderRadius: 25,
  backgroundColor: "#30ad9f",
  marginHorizontal: 5,
  alignItems: "center",
  justifyContent: "center",
} as ViewProps;
export default (props: {
  bg_img_url: string;
  title: string;
  userCount: string;
  userStatus: "requested" | "organizer" | "user" | undefined;
}) => {
  const { bg_img_url, title, userCount, userStatus } = props;
  const { navigate } = useNavigation();
  const exitGroup = useGroupExit();
  function navigateMember() {
    navigate("Member", { userStatus });
  }
  return (
    <View style={{ marginHorizontal: 30, marginBottom: 20 }}>
      <Text style={{ fontSize: 14, marginBottom: 20 }}>기타</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={navigateMember} style={btnStyle}>
          <Image source={iconMember} style={{ marginBottom: 10 }} />
          <Text style={{ fontSize: 16, color: "#ffffff" }}>
            멤버 ({userCount})
          </Text>
        </TouchableOpacity>
        {userStatus === "organizer" && (
          <TouchableOpacity
            onPress={() => navigate("GroupSetting", { title, bg_img_url })}
            style={btnStyle}
          >
            <Image source={iconSetting} style={{ marginBottom: 10 }} />
            <Text style={{ fontSize: 16, color: "#ffffff" }}>그룹 설정</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={exitGroup} style={btnStyle}>
          <Image source={iconOut} style={{ marginBottom: 10 }} />
          <Text style={{ fontSize: 16, color: "#ffffff" }}>그룹 나가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
