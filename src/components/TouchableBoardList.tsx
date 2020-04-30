import React from "react";
import { ViewStyle, StyleProp, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

import { View, ViewRow, V0 } from "./View";
import { Text, Title18, Mint14, Purple12 } from "./Text";
import { DotRed8 } from "./Dots";
import { TouchableOpacity } from "./TouchableOpacity";
import ViewGroupType from "./ViewGroupType";
import { Board } from "../types";

import {
  updateUserBoardCheck,
  insertUserBoardCheck,
} from "../graphql/mutation";
import { useStore } from "../Store";

export default (props: { board: Board; style?: StyleProp<ViewStyle> }) => {
  const { navigate } = useNavigation();
  const { board } = props;
  const [{ user_id }] = useStore();
  const [update, { data }] = useMutation(updateUserBoardCheck, {
    variables: { user_id, board_id: board.id },
  });
  const [insert] = useMutation(insertUserBoardCheck, {
    variables: { board_id: board.id },
  });
  React.useEffect(() => {
    if (data && data.update_mx_users_board) {
      if (data.update_mx_users_board.affected_rows === 0) {
        insert();
      }
    }
  }, [data]);
  let minutes = "비어있습니다",
    isNew = false;
  const lastPostedDate = new Date(board.last_posted_at);
  if (board.last_posted_at) {
    minutes = formatDistanceToNow(lastPostedDate, { locale: ko });
    if (board.users.length) {
      isNew = lastPostedDate > new Date(board.users[0].updated_at);
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
          marginRight: 10,
        },
        props.style,
      ]}
      onPress={goToBoard}
    >
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          marginLeft: 30,
          marginRight: 50,
        }}
      >
        <ViewRow style={{ justifyContent: "flex-start" }}>
          <Title18>{board.title}</Title18>
          {board?.permission === "all" && (
            <V0
              style={[
                {
                  padding: 1,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "#cb6794",
                  borderRadius: 10,
                  marginLeft: 10,
                },
              ]}
            >
              <Purple12>전체공개</Purple12>
            </V0>
          )}
          {isNew && <DotRed8 style={{ marginLeft: 10 }} />}
          <Mint14 style={{ position: "absolute", right: 0 }}>{minutes}</Mint14>
        </ViewRow>
        <Text
          style={{
            fontSize: 14,
            color: "#888888",
            marginTop: 15,
          }}
        >
          {board.body}
        </Text>
      </View>
      <ViewGroupType style={{ position: "absolute", right: -17, top: 44 }} />
    </TouchableOpacity>
  );
};
