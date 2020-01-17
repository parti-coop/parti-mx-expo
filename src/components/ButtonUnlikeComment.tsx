import React from "react";
import { TouchableOpacity } from "./TouchableOpacity";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { unlikeComment } from "../graphql/mutation";
import { AntDesign } from "@expo/vector-icons";
export default ({ id }: { id: number }) => {
  const [{ user_id }, , dispatch] = useStore();
  const [unlike, { loading }] = useMutation(unlikeComment, {
    variables: { comment_id: id, user_id }
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, [loading]);
  return (
    <TouchableOpacity
      onPress={e =>
        unlike()
          .then(console.log)
          .catch(console.error)
      }
    >
      <AntDesign name="heart" size={20} />
    </TouchableOpacity>
  );
};
