import React from "react";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { insertUserGroup } from "../graphql/mutation";
import { showMessage } from "react-native-flash-message";
export default () => {
  const [{ user_id, group_id }, dispatch] = useStore();

  const [join, { loading }] = useMutation(insertUserGroup, {
    variables: { group_id, user_id }
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  function joinGroup() {
    join().then(() =>
      showMessage({ type: "success", message: "가입 하였습니다." })
    );
  }
  return joinGroup;
};
