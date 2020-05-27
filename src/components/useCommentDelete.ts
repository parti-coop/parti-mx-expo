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
    let parent_id = null;
    try {
      const res = await remove();
      parent_id = res.data.delete_mx_comments_by_pk.parent_id;

      showMessage({ type: "success", message: "댓글을 삭제 했습니다" });
    } catch (error) {
      await nullify();
    }
    try {
      // 상위 댓글이 있을 경우 지우려고 시도
      if (parent_id !== null) {
        await remove({ variables: { comment_id: parent_id } });
      }
    } catch (error) {
      // 삭제 실패는 대댓글이 있는 경우 임으로 가만 놓아둠
    }
  }

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  return [handler];
};
