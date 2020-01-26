import React from "react";
import { TouchableOpacity } from "./TouchableOpacity";
import { Text } from "./Text";
import { useStore } from "../Store";
export default ({ focus }: { focus: () => any }) => {
  const [{ user_id }] = useStore();
  function comment() {
    focus();
  }
  return (
    <TouchableOpacity onPress={comment}>
      <Text>댓글 달기</Text>
    </TouchableOpacity>
  );
};
