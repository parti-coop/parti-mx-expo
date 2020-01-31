import React from "react";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { createNewBoard } from "../graphql/mutation";
export default () => {
  const [{ user_id, group_id }, dispatch] = useStore();

  const [create, { loading }] = useMutation(createNewBoard, {
    variables: {
      title: "제안",
      body: "제안 게시판입니다",
      user_id,
      group_id
    }
  });
  type board_id = number;
  async function createDefaultSuggestionBoard(
    groupId?: number
  ): Promise<board_id> {
    const res = await create({
      variables: {
        title: "제안",
        body: "제안 게시판입니다",
        user_id,
        group_id: !!groupId ? groupId : group_id
      }
    });
    return res.data.insert_parti_2020_boards.returning[0].id;
  }

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  return { createDefaultSuggestionBoard };
};
