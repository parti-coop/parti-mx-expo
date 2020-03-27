import React from "react";
import { ViewStyle, StyleProp, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";

import { View, ViewRow } from "./View";
import { Text } from "./Text";
import ViewRedDot from "./ViewRedDot";
import { TouchableOpacity } from "./TouchableOpacity";
import ViewGroupType from "./ViewGroupType";

import {
  updateUserBoardCheck,
  insertUserBoardCheck
} from "../graphql/mutation";
import { useStore } from "../Store";

type Board = {
  id: number;
  title: string;
  body: string;
  is_member_only: boolean;
  type: string;
  updated_at: string;
  last_posted_at: string;
  usersBoardCheck: Array<{ updated_at: string }>;
};
export default (props: { board: Board; style?: StyleProp<ViewStyle> }) => {
  const { navigate } = useNavigation();
  const { board } = props;
  const [{ user_id }] = useStore();
  const [update, { data }] = useMutation(updateUserBoardCheck, {
    variables: { user_id, board_id: board.id }
  });
  const [insert] = useMutation(insertUserBoardCheck, {
    variables: { user_id, board_id: board.id }
  });
  React.useEffect(() => {
    if (data && data.update_parti_2020_users_board) {
      if (data.update_parti_2020_users_board.affected_rows === 0) {
        insert();
      }
    }
  }, [data]);
  let minutes = "비어있습니다",
    isNew = false;
  const lastPostedDate = new Date(board.last_posted_at);
  if (board.last_posted_at) {
    const miliseconds = new Date().getTime() - lastPostedDate.getTime();
    minutes = miliseconds / 1000 / 60 + " 분 전";
    if (board.usersBoardCheck.length) {
      isNew = lastPostedDate > new Date(board.usersBoardCheck[0].updated_at);
    }
  }

  function goToBoard() {
    update();
    switch (board.type) {
      case "suggestion":
        return navigate("SuggestionList", { id: board.id });
      case "notice":
        return navigate("NoticeList", { id: board.id });
      default:
        return navigate("SuggestionList", { id: board.id });
    }
  }
  return (
    <TouchableOpacity
      style={[
        {
          height: 123,
          backgroundColor: "#ffffff",
          marginBottom: 10,
          borderRadius: 25,
          marginRight: 10
        },
        props.style
      ]}
      onPress={goToBoard}
    >
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          paddingVertical: 20,
          // paddingHorizontal: 30,
          marginLeft: 30,
          marginRight: 50
        }}
      >
        <ViewRow style={{ justifyContent: "flex-start" }}>
          <Text style={{ fontSize: 18 }}>{board.title}</Text>
          {!board.is_member_only && (
            <Text
              style={{
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#cb6794",
                borderRadius: 10,
                fontSize: 12,
                padding: 1,
                color: "#cb6794",
                marginLeft: 10
              }}
            >
              전체공개
            </Text>
          )}
          {isNew && <ViewRedDot style={{ marginLeft: 10 }} />}
          <Text
            style={{
              color: "#30ad9f",
              fontSize: 14,
              position: "absolute",
              right: 0
            }}
          >
            {minutes}
          </Text>
        </ViewRow>
        <Text style={{ fontSize: 14, color: "#888888", marginTop: 15 }}>{board.body}</Text>
      </View>
      <ViewGroupType style={{ position: "absolute", right: -17, top: 44 }} />
    </TouchableOpacity>
  );
};
