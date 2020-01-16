import React from "react";
import { Button } from "./Button";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { voteSuggestion } from "../graphql/mutation";
export default ({ id }: { id: number }) => {
  const [{ user_id }, , dispatch] = useStore();
  const [vote, { loading }] = useMutation(voteSuggestion, {
    variables: { id, user_id }
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, [loading]);
  return (
    <Button
      title="이 제안에 동의합니다."
      color="cadetblue"
      onPress={e =>
        vote()
          .then(console.log)
          .catch(console.error)
      }
    />
  );
};
