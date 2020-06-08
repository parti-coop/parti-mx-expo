import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";
import { incrementUserPostCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { boardTypes } from "./boardTypes";

export default function useNavigateToPost() {
  const { navigate } = useNavigation();
  const [{ user_id }] = useStore();
  const [increment] = useMutation(incrementUserPostCheck);

  function navigateHandler(type: boardTypes, post_id: number) {
    increment({
      variables: { user_id, post_id },
    });
    switch (type) {
      case boardTypes.SUGGESTION:
        return navigate("SuggestionDetail", { postId: post_id });
      case boardTypes.NOTICE:
        return navigate("NoticeDetail", { postId: post_id });
      case boardTypes.VOTE:
        return navigate("VoteDetail", { postId: post_id });
      case boardTypes.EVENT:
        return navigate("EventDetail", { postId: post_id });
    }
  }
  return navigateHandler;
}
