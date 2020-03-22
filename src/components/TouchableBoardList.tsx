import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, ViewRow } from "./View";
import { Text } from "./Text";
import ViewRedDot from "./ViewRedDot";
import { TouchableOpacity } from "./TouchableOpacity";
import { useMutation } from "@apollo/react-hooks";
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
  usersBoardCheck: Array<{ updated_at: string }>;
};
export default (props: { board: Board; style?: StyleProp<ViewStyle> }) => {
  const { navigate } = useNavigation();
  const { board, style } = props;
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

  const isNew =
    board.usersBoardCheck.length === 0 ||
    new Date(board.updated_at) > new Date(board.usersBoardCheck[0].updated_at);
  function goToBoard() {
    update();
    navigate("SuggestionList", { id: board.id });
  }
  return (
    <TouchableOpacity
      style={{
        height: 83,
        backgroundColor: "#ffffff",
        marginBottom: 10,
        borderRadius: 25,
        ...(style as Object)
      }}
      onPress={goToBoard}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginLeft: 30,
          marginRight: 50
        }}
      >
        <ViewRow style={{ justifyContent: "flex-start" }}>
          <Text style={{ fontSize: 18 }}>{board.title}</Text>
          {board.is_member_only && (
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
            50분 전
          </Text>
        </ViewRow>
        <Text style={{ fontSize: 14, color: "#888888" }}>{board.body}</Text>
      </View>
    </TouchableOpacity>
  );
};
