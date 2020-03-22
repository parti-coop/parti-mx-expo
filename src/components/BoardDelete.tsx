import React from "react";
import { ViewStyle, StyleProp, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";
import { Text } from "./Text";
import { useMutation } from "@apollo/react-hooks";
import { deleteBoard } from "../graphql/mutation";
import { useStore } from "../Store";
import { showMessage } from "react-native-flash-message";
import RNPickerSelect from "react-native-picker-select";
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
const options = [
  { value: false, label: "전체공개" },
  { value: true, label: "멤버공개" }
];
export default (props: { boardId: number; style?: StyleProp<ViewStyle> }) => {
  const [remove, { error, data }] = useMutation(deleteBoard, {
    variables: { board_id: props.boardId }
  });
  function removeHandler() {
    return Alert.alert("게시판 삭제", "정말 삭제하시겠어요?", [
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
    ]);
  }
  return (
    <TouchableOpacity onPress={removeHandler}>
      <Text>삭제</Text>
    </TouchableOpacity>
  );
};
