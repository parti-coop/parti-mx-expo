import React from "react";
import { ViewStyle, StyleProp, Alert } from "react-native";
import { TouchableOpacity } from "./TouchableOpacity";
import { Text } from "./Text";
import { useMutation } from "@apollo/react-hooks";
import { deleteBoard } from "../graphql/mutation";
import { showMessage } from "react-native-flash-message";

export default (props: { boardId: number; style?: StyleProp<ViewStyle> }) => {
  const [remove, { error, data }] = useMutation(deleteBoard, {
    variables: { board_id: props.boardId }
  });
  function removeHandler() {
    return Alert.alert(
      "게시판 삭제",
      "게시판을 삭제하시겠습니까?\n삭제된 게시판은 복원할 수 없습니다.",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "삭제!",
          onPress: () =>
            remove().finally(() =>
              showMessage({ type: "success", message: "삭제 하였습니다." })
            )
        }
      ]
    );
  }
  return (
    <TouchableOpacity onPress={removeHandler}>
      <Text>삭제</Text>
    </TouchableOpacity>
  );
};
