import React from "react";
import { ViewStyle, StyleProp, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDebouncedCallback } from "use-debounce";
import { useMutation } from "@apollo/react-hooks";

import { View, ViewRow } from "./View";
import { TORow } from "./TouchableOpacity";
import { Text, Title14 } from "./Text";
import useBoardDelete from "./useBoardDelete";
import SelectMenu from "./SelectMenu";
import ButtonBoardType from "./ButtonBoardType";

import { updateBoardPermission } from "../graphql/mutation";
import { useStore } from "../Store";

import selectbox from "../../assets/selectbox.png";
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
  const { board, style } = props;
  const deleteBoard = useBoardDelete(board.id);
  const items = [
    { label: "수정", handler: console.log },
    { label: "삭제", handler: deleteBoard }
  ];
  return (
    <ViewRow
      style={[
        {
          paddingVertical: 20,
          borderBottomColor: "#e4e4e4",
          borderBottomWidth: 1,
          marginHorizontal: 30,
          borderStyle: "solid"
        },
        style
      ]}
    >
      <ButtonBoardType
        boardId={board.id}
        is_member_only={board.is_member_only}
      />
      <View
        style={{
          width: 1,
          height: 14,
          backgroundColor: "#e4e4e4",
          marginHorizontal: 15
        }}
      />
      <Title14 style={{ flex: 1 }}>{board.title}</Title14>
      <SelectMenu items={items} style={{ right: 0, position: "relative" }} />
    </ViewRow>
  );
};
