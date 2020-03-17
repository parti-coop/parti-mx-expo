import React from "react";
import { ScrollView, Share, Picker } from "react-native";
import { StackHeaderProps } from "@react-navigation/stack";
import { Text, TextRound } from "../components/Text";
import { View, ViewRow, ViewRowLeft } from "../components/View";
import LoadingIndicator from "../components/LoadingIndicator";
import { TouchableOpacity, TORow } from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { subscribeSuggestionsByBoardId } from "../graphql/subscription";
export default (props: StackHeaderProps) => {
  const [{ user_id }, dispatch] = useStore();
  const list = [
    { label: "내 프로필", page: "Profile" },
    { label: "비밀번호 변경", page: "PasswordChange" },
    "알림",
    { label: "푸시 알림", page: "NotificationPush" },
    "기타",
    { label: "이용약관", page: "TermsService" },
    { label: "개인정보처리방침", page: "TermsPrivacy" },
    { label: "로그아웃", page: "Logout" },
    { label: "탈퇴", page: "AccountDelete" }
  ];
  return (
    <>
      <ViewRowLeft>
        <TouchableOpacity style={{}} onPress={e => props.navigation.navigate("Home")}>
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>내 설정</Text>
      </ViewRowLeft>
      {list.map((a, i) => {
        if (typeof a === "string") {
          return <Text key={i}>a</Text>;
        } else {
          const { label, page } = a;
          return (
            <TORow
              key={i}
              style={{ justifyContent: "space-between" }}
              onPress={e => props.navigation.navigate(page)}
            >
              <Text>{label}</Text>
              <Ionicons name="ios-arrow-forward" size={60} />
            </TORow>
          );
        }
      })}
    </>
  );
};
