import React from "react";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { insertUserGroupAsOrganizer } from "../graphql/mutation";
export default () => {
  const [, dispatch] = useStore();

  const [insert, { loading }] = useMutation(insertUserGroupAsOrganizer);
  async function handler(group_id: number): Promise<void> {
    await insert({
      variables: {
        group_id,
      },
    });
  }

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  return [handler];
};
