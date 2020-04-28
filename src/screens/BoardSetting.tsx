import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSubscription } from "@apollo/react-hooks";

import { RootStackParamList } from "./AppContainer";
import { Text, Title22, Mint13 } from "../components/Text";
import { ViewRow, View } from "../components/View";
import { TouchableOpacity, TO1 } from "../components/TouchableOpacity";
import BoardSettingList from "../components/BoardSettingList";
import ButtonBoardInsert from "../components/ButtonBoardInsert";
import HeaderBack from "../components/HeaderBack";

import { useStore } from "../Store";
import { subscribeBoardsByGroupId } from "../graphql/subscription";
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "BoardSetting">;
  route: RouteProp<RootStackParamList, "BoardSetting">;
}) => {
  const [{ group_id, user_id }, dispatch] = useStore();
  const { data, error } = useSubscription(subscribeBoardsByGroupId, {
    variables: { group_id, user_id },
  });
  if (error) {
    console.log(error);
  }
  const { boards = [] } = data?.mx_groups_by_pk ?? {};
  return (
    <>
      <HeaderBack />
      <Title22 style={{ marginHorizontal: 30, marginBottom: 20 }}>관리</Title22>
      <View style={{ borderRadius: 25, backgroundColor: "#ffffff", flex: 1 }}>
        <ScrollView contentContainerStyle={{}}>
          <Mint13 style={{ margin: 30 }}>게시판</Mint13>
          {boards.map((b: any, i: number) => {
            return <BoardSettingList board={b} key={i} />;
          })}
        </ScrollView>
        <ButtonBoardInsert />
      </View>
    </>
  );
};
