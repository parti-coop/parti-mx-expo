import React from "react";
import { ScrollView } from "react-native";
import { useSubscription } from "@apollo/react-hooks";

import { Title22, Mint13 } from "../components/Text";
import { View } from "../components/View";
import {} from "../components/TouchableOpacity";
import BoardSettingList from "../components/BoardSettingList";
import ButtonBoardInsert from "../components/ButtonBoardInsert";
import HeaderBack from "../components/HeaderBack";

import { useStore } from "../Store";
import { subscribeBoardsByGroupId } from "../graphql/subscription";
export default function BoardSetting() {
  const [{ group_id, user_id }, dispatch] = useStore();
  const { data, error, loading } = useSubscription(subscribeBoardsByGroupId, {
    variables: { group_id, user_id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
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
          {boards.map((b, i: number) => {
            return <BoardSettingList board={b} key={i} />;
          })}
        </ScrollView>
        <ButtonBoardInsert />
      </View>
    </>
  );
}
