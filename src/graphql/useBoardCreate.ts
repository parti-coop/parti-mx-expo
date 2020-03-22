import React from "react";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { insertBoard } from "../graphql/mutation";
import useRegisterGroupOrganizer from "../graphql/useRegisterGroupOrganizer";
import { showMessage } from "react-native-flash-message";
type board_id = number;
export default () => {
  const [{ user_id }, dispatch] = useStore();
  const [create, { loading }] = useMutation(insertBoard);
  const [register] = useRegisterGroupOrganizer();
  async function handler(groupId: number): Promise<board_id> {
    let res;
    try {
      res = await create({
        variables: {
          title: "제안",
          body: "제안 게시판입니다",
          type: "suggestion",
          user_id,
          group_id: groupId
        }
      });
      await register(groupId);
      return res.data.insert_parti_2020_boards.returning[0].id;
    } catch (error) {
      showMessage({ type: "danger", message: JSON.stringify(error) });
    }
  }

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  return [handler];
};
