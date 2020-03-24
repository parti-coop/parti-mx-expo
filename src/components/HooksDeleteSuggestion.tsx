import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";

import { useStore } from "../Store";
import { deleteSuggestion } from "../graphql/mutation";

export default (id: number) => {
  const [, dispatch] = useStore();
  const { goBack } = useNavigation();
  const [del, { loading }] = useMutation(deleteSuggestion, {
    variables: { id }
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  function showAlert() {
    return Alert.alert("제안 삭제", "삭제하겠습니까? 복구할 수 없습니다.", [
      {
        text: "취소",
        style: "cancel"
      },
      {
        text: "삭제",
        onPress: () =>
          del()
            .then(() => alert("삭제되었습니다."))
            .catch(console.error)
            .finally(goBack)
      }
    ]);
  }
  return [showAlert];
};
