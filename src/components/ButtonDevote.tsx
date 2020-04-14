import React from "react";
import { ViewProps } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { Image } from "./Image";
import { ViewRowCenter } from "./View";
import { Mint13, Red16 } from "./Text";
import { TO0 } from "./TouchableOpacity";

import { useStore } from "../Store";
import { devoteSuggestion } from "../graphql/mutation";

import iconAgreeRed from "../../assets/iconAgreeRed.png";
const bgMenuBgCopy = {
  width: 124,
  height: 33,
  borderRadius: 16.5,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#f35f5f",
} as ViewProps;
export default ({ id }: { id: number }) => {
  const [{ user_id }, dispatch] = useStore();
  const [devote, { loading }] = useMutation(devoteSuggestion, {
    variables: { id, user_id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  function devoteHandler() {
    devote().then(() =>
      showMessage({
        type: "success",
        message: "제안 동의가 취소되었습니다",
      })
    );
  }
  return (
    <TO0 onPress={devoteHandler}>
      <ViewRowCenter style={bgMenuBgCopy}>
        <Image source={iconAgreeRed} style={{ marginRight: 4 }} />
        <Red16>제안 동의함</Red16>
      </ViewRowCenter>
      <Mint13 style={{ marginTop: 9 }}>제안 동의 취소</Mint13>
    </TO0>
  );
};
