import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";
import { incrementUserBoardCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { boardTypes } from "./boardTypes";

export default function useNavigateToBoard() {
  const { navigate } = useNavigation();
  const [{ user_id }] = useStore();
  const [increment] = useMutation(incrementUserBoardCheck);

  function navigateHandler(type: boardTypes, board_id: number) {
    increment({
      variables: { user_id, board_id },
    });
    switch (type) {
      case boardTypes.EVENT:
        return navigate("EventList", { id: board_id });
      case boardTypes.SUGGESTION:
        return navigate("SuggestionList", { id: board_id });
      case boardTypes.NOTICE:
        return navigate("NoticeList", { id: board_id });
      case boardTypes.VOTE:
        return navigate("VoteList", { id: board_id });
      default:
        return navigate("SuggestionList", { id: board_id });
    }
  }

  return navigateHandler;
}
