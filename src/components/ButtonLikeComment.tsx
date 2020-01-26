import React from "react";
// import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { useStore } from "../Store";
import { useMutation } from "@apollo/react-hooks";
import { likeComment } from "../graphql/mutation";
import { AntDesign } from "@expo/vector-icons";
export default ({ id }: { id: number }) => {
  const [{ user_id }, dispatch] = useStore();
  const [like, { loading }] = useMutation(likeComment, {
    variables: { comment_id: id, user_id }
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return (
    <TouchableOpacity
      onPress={e =>
        like()
          .then(console.log)
          .catch(console.error)
      }
    >
      <AntDesign name="hearto" size={20} />
    </TouchableOpacity>
  );
};
