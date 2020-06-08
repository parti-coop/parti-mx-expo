import React from "react";
import { ViewStyle, TextStyle } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { Image } from "./Image";
import { Text, Red16 } from "./Text";
import { TORowCenter } from "./TouchableOpacity";

import { useStore } from "../Store";
import { closingDateFrom } from "../Utils/CalculateDays";
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

export default function ButtonLike(props: {
  id: number;
  created_at: string;
  closingMethod: string;
}) {
  const [, dispatch] = useStore();
  const { created_at, closingMethod = "30days", id } = props;
  const [vote, { loading }] = useMutation(likeSuggestion, {
    variables: { id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  let after = 30;
  try {
    after = Number(closingMethod.replace("days", ""));
  } catch (error) {}
  const closingAt = closingDateFrom(created_at, after);
  function voteHandler() {
    vote().then(() =>
      showMessage({
        type: "success",
        message: "제안을 동의 했습니다",
      })
    );
  }
  return (
    <>
      <TORowCenter style={bgMenuBgCopy} onPress={voteHandler}>
        <Image source={iconAgree} style={{ margin: 4, tintColor: "#f35f5f" }} />
        <Red16>이 제안에 동의합니다</Red16>
      </TORowCenter>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          color: "#f35f5f",
          marginTop: 10,
        }}
      >
        {closingAt}까지 동의할 수 있습니다
      </Text>
    </>
  );
}
