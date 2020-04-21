import React from "react";
import { ViewStyle, ViewProps } from "react-native";
import { useMutation } from "@apollo/react-hooks";

import { Image } from "./Image";
import { Red12 } from "./Text";
import { TORowCenter } from "./TouchableOpacity";

import { useStore } from "../Store";
import { likeComment } from "../graphql/mutation";

import iconAgreeRed11 from "../../assets/iconAgreeRed11.png";
const bgMenuBg = {
  width: 51,
  height: 23,
  borderRadius: 11.5,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#f35f5f",
} as ViewProps;
export default (props: { id: number; style?: ViewStyle; count: number }) => {
  const { id, style, count } = props;
  const [, dispatch] = useStore();
  const [like, { loading }] = useMutation(likeComment, {
    variables: { comment_id: id },
  });
  function pressHandler() {
    like();
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return (
    <TORowCenter style={[bgMenuBg, style]} onPress={pressHandler}>
      <Image source={iconAgreeRed11} style={{ marginRight: 3 }} />
      <Red12>{count}</Red12>
    </TORowCenter>
  );
};
