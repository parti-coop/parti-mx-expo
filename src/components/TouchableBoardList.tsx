import React from "react";
import { ViewStyle, StyleProp, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

import { View, ViewRow, V0 } from "./View";
import { Text, Title18, Mint14, Purple12 } from "./Text";
import { DotRed } from "./Dots";
import { TouchableOpacity } from "./TouchableOpacity";
import ViewGroupType from "./ViewGroupType";
import { boardTypes } from "./boardTypes";

import { Board } from "../types";
import { incrementUserBoardCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { isAfterString } from "../Utils/CalculateDays";

export default function TouchableBoardList(props: {
  board: Board;
  countObj: { [board_id: string]: number };
  style?: StyleProp<ViewStyle>;
}) {
  const { navigate } = useNavigation();
  const { board, countObj } = props;
  const [{ user_id }] = useStore();
  const [increment] = useMutation(incrementUserBoardCheck, {
    variables: { user_id, board_id: board.id },
  });
  // console.log(board.newPostCount);
  // let minutes = "비어있습니다";
  const isNew = isAfterString(
    board?.last_posted_at,
    board?.users?.[0]?.updated_at
  );
  // const lastPostedDate = new Date(board.last_posted_at);
  // if (board.last_posted_at) {
  //   minutes = formatDistanceToNow(lastPostedDate, { locale: ko });
  // }
  const newPostCount = countObj[board.id] || 0;

  function goToBoard() {
    increment();
    switch (board.type) {
      case boardTypes.EVENT:
        return navigate("EventList", { id: board.id });
      case boardTypes.SUGGESTION:
        return navigate("SuggestionList", { id: board.id });
      case boardTypes.NOTICE:
        return navigate("NoticeList", { id: board.id });
      case boardTypes.VOTE:
        return navigate("VoteList", { id: board.id });
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
          <Title18 numberOfLines={1} style={{ flex: 1 }}>
            {board.title}
          </Title18>
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
          {isNew && <DotRed style={{ marginLeft: 10 }} />}
          {newPostCount > 0 && (
            <Mint14 style={{ marginLeft: 5 }}>새 글 {newPostCount}</Mint14>
          )}
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
      <ViewGroupType
        type={board.type}
        style={{ position: "absolute", right: -17, top: 44 }}
      />
    </TouchableOpacity>
  );
}
