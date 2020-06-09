import React from "react";
import { ViewStyle, StyleProp } from "react-native";

import { View, ViewRow, V0 } from "./View";
import { Text, Title18, Mint14, Purple12 } from "./Text";
import { DotRed } from "./Dots";
import { TouchableOpacity } from "./TouchableOpacity";
import ViewGroupType from "./ViewGroupType";
import { boardTypes } from "./boardTypes";
import { Board } from "../types";
import { isAfterString } from "../Utils/CalculateDays";

export default function TouchableBoardList(props: {
  board: Board;
  countObj: { [board_id: string]: number };
  style?: StyleProp<ViewStyle>;
  onPress: (board_type: boardTypes, board_id: number) => void;
}) {
  const { board, countObj, onPress } = props;

  const isNew = isAfterString(
    board?.last_posted_at,
    board?.users?.[0]?.updated_at
  );
  const newPostCount = countObj[board.id] || 0;
  function goToBoard() {
    onPress(board.type, board.id);
  }
  const isForAll = board?.permission === "all";
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
        <ViewRow>
          <ViewRow style={{ flex: 1 }}>
            <Title18 numberOfLines={1}>{board.title}</Title18>
            <V0
              style={[
                {
                  padding: 1,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: isForAll ? "#cb6794" : "#4aacc7",
                  borderRadius: 10,
                  marginLeft: 10,
                },
              ]}
            >
              {isForAll ? (
                <Purple12>전체공개</Purple12>
              ) : (
                <Purple12 style={{ color: "#4aacc7" }}>멤버공개</Purple12>
              )}
            </V0>
            {isNew && <DotRed style={{ marginLeft: 10 }} />}
          </ViewRow>
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
