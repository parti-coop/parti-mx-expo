import React from "react";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { deleteComment } from "../graphql/mutation";
import { showMessage } from "react-native-flash-message";
export default (id: number) => {
  const [, dispatch] = useStore();
  const [remove, { loading }] = useMutation(deleteComment, {
    variables: { comment_id: id }
  });
  function handler() {
    remove().then(() =>
      showMessage({ type: "success", message: "댓글을 삭제 했습니다" })
    );
  }

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  return [handler];
};
