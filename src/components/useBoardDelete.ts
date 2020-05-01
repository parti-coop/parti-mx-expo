import React from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { deleteBoard } from "../graphql/mutation";
import { showMessage } from "react-native-flash-message";

export default function useBoardDelete(boardId: number) {
  const [remove] = useMutation(deleteBoard, {
    variables: { board_id: boardId },
  });
  function removeHandler() {
    return Alert.alert(
      "게시판 삭제",
      "게시판을 삭제하시겠습니까?\n삭제된 게시판은 복원할 수 없습니다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "네",
          onPress: async () => {
            try {
              await remove();
              showMessage({ type: "success", message: "삭제 하였습니다." });
            } catch (error) {
              showMessage({
                type: "danger",
                message: "삭제 실패했습니다. 게시판의 글을 먼저 삭제해 주세요.",
              });
            }
          },
        },
      ]
    );
  }
  return removeHandler;
}
