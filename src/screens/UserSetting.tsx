import React from "react";
import { ScrollView, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Image } from "../components/Image";
import { Title14, Title22, Title16 } from "../components/Text";
import { View } from "../components/View";
import { TORow } from "../components/TouchableOpacity";
import HeaderBack from "../components/HeaderBack";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";

import btnNext from "../../assets/btnNext.png";
const boxStyle = {
  borderRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 1,
  shadowOpacity: 1,
  marginTop: 20,
  paddingHorizontal: 30,
  paddingVertical: 5,
} as ViewStyle;
export default () => {
  const { navigate } = useNavigation();
  const list = [
    {
      category: "내 정보 관리",
      children: [
        { label: "내 프로필", page: "Profile" },
        { label: "비밀번호 변경", page: "PasswordChange" },
      ],
    },
    {
      category: "알림",
      children: [{ label: "푸시 알림", page: "NotificationPush" }],
    },
    {
      category: "기타",
      children: [
        { label: "이용약관", page: "TermsService" },
        { label: "개인정보처리방침", page: "TermsPrivacy" },
        { label: "로그아웃", page: "Logout" },
        { label: "탈퇴", page: "AccountDelete" },
      ],
    },
  ];
  function pagePressHandler(page: string) {
    navigate(page);
  }
  const ViewList = list.map((a, i) => {
    const { category, children } = a;
    const ViewChildren = children.map((child, i2) => {
      const { label, page } = child;
      return (
        <TORow
          key={i2}
          style={
            children.length !== i2 + 1
              ? {
                  paddingVertical: 20,
                  borderBottomColor: "#e4e4e4",
                  borderBottomWidth: 1,
                }
              : { paddingVertical: 20 }
          }
          onPress={(e) => pagePressHandler(page)}
        >
          <Title16 style={{ flex: 1 }}>{label}</Title16>
          <Image source={btnNext} />
        </TORow>
      );
    });
    return (
      <View key={i}>
        <Title14 style={{ marginHorizontal: 30, marginTop: 40 }}>
          {category}
        </Title14>
        <View style={boxStyle}>{ViewChildren}</View>
      </View>
    );
  });
  return (
    <>
      <HeaderBack />
      <Title22 style={{ marginHorizontal: 30, marginBottom: 10 }}>
        내 설정
      </Title22>
      <KeyboardAwareScrollView>
        <View style={{ paddingBottom: 50 }}>{ViewList}</View>
      </KeyboardAwareScrollView>
    </>
  );
};
