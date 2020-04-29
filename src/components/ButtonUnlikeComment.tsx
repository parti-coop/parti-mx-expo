import React from "react";
import { ViewStyle, ViewProps } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { White12 } from "./Text";
import { TORowCenter } from "./TouchableOpacity";

import { Image } from "./Image";
import { useStore } from "../Store";
import { unlikeComment } from "../graphql/mutation";

import iconAgree11 from "../../assets/iconAgree11.png";
const bgMenuBg = {
  width: 51,
  height: 23,
  borderRadius: 11.5,
  borderStyle: "solid",
  borderWidth: 2,
  backgroundColor: "#f35f5f",
  borderColor: "#f35f5f",
} as ViewProps;
export default (props: { id: number; style?: ViewStyle; count: number }) => {
  const { id, style, count } = props;
  const [{ user_id }, dispatch] = useStore();
  const [unlike, { loading }] = useMutation(unlikeComment, {
    variables: { comment_id: id, user_id },
  });
  function pressHandler() {
    unlike();
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return (
    <TORowCenter style={[bgMenuBg, style]} onPress={pressHandler}>
      <Image
        source={iconAgree11}
        style={{ marginRight: 3, tintColor: "#ffffff" }}
      />
      <White12>{count}</White12>
    </TORowCenter>
  );
};
