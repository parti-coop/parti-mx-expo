import React from "react";
import { TouchableOpacity } from "./TouchableOpacity";
import { Text, Mint13 } from "./Text";
import { useStore } from "../Store";
export default ({ recomment }: { recomment: () => any }) => {
  const [{ user_id }] = useStore();
  function comment() {
    focus();
  }
  return (
    <TouchableOpacity onPress={recomment}>
      <Mint13>댓글 달기</Mint13>
    </TouchableOpacity>
  );
};
