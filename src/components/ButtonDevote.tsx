import React from "react";
import { Button } from "./Button";
import { View } from "./View";
import { Text } from "./Text";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { devoteSuggestion } from "../graphql/mutation";
export default ({ id }: { id: number }) => {
  const [{ user_id }, dispatch] = useStore();
  const [devote, { loading }] = useMutation(devoteSuggestion, {
    variables: { id, user_id }
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return (
    <View>
      <Text>제안 동의함</Text>
      <Button
        title="제안 동의 취소"
        color="cadetblue"
        onPress={e =>
          devote()
            .then(console.log)
            .catch(console.error)
        }
      />
    </View>
  );
};
