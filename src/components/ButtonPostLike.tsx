import React from "react";
import { ViewStyle, TextStyle } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { Image } from "./Image";
import { Red16 } from "./Text";
import { TORowCenter } from "./TouchableOpacity";

import { useStore } from "../Store";
import { likeSuggestion } from "../graphql/mutation";

import iconAgree from "../../assets/iconAgree.png";

const bgMenuBgCopy = {
  minHeight: 33,
  paddingHorizontal: 15,
  borderRadius: 16.5,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#f35f5f",
} as ViewStyle;
export default (props: { id: number; total: number }) => {
  const [, dispatch] = useStore();
  const { id, total = 0 } = props;
  const [vote, { loading }] = useMutation(likeSuggestion, {
    variables: { id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  function voteHandler() {
    vote();
  }
  return (
    <>
      <TORowCenter style={bgMenuBgCopy} onPress={voteHandler}>
        <Image source={iconAgree} style={{ margin: 4, tintColor: "#f35f5f" }} />
        <Red16>{total}</Red16>
      </TORowCenter>
    </>
  );
};
