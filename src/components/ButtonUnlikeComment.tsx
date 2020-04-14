import React from "react";
import { ViewStyle, ViewProps } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { Red12 } from "./Text";
import { TORowCenter } from "./TouchableOpacity";

import { Image } from "./Image";
import { useStore } from "../Store";
import { unlikeComment } from "../graphql/mutation";

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
  const [{ user_id }, dispatch] = useStore();
  const [unlike, { loading }] = useMutation(unlikeComment, {
    variables: { comment_id: id, user_id },
  });
  function pressHandler() {
    unlike().then(console.log).catch(console.error);
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
