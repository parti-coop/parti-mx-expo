import React from "react";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { deleteComment, updateComment } from "../graphql/mutation";
import { showMessage } from "react-native-flash-message";
export default (id: number) => {
  const [, dispatch] = useStore();
  const [remove, { loading }] = useMutation(deleteComment, {
    variables: { comment_id: id },
  });
  const [nullify] = useMutation(updateComment, {
    variables: { id, body: null },
  });
  async function handler() {
    try {
      await remove();
      showMessage({ type: "success", message: "댓글을 삭제 했습니다" });
    } catch (error) {
      await nullify();
    }
  }

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  return [handler];
};
