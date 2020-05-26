import React from "react";
import { ViewStyle } from "react-native";
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
  height: 33,
  paddingHorizontal: 15,
  borderRadius: 16.5,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#f35f5f",
} as ViewStyle;
export default function ButtonSuggestionLike(props: {
  id: number;
  created_at: string;
}) {
  const [, dispatch] = useStore();
  const { id } = props;
  const [vote, { loading }] = useMutation(likeSuggestion, {
    variables: { id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  function voteHandler() {
    vote().then(() =>
      showMessage({
        type: "success",
        message: "참석 신청 했습니다",
      })
    );
  }
  return (
    <>
      <TORowCenter style={bgMenuBgCopy} onPress={voteHandler}>
        <Image source={iconAgree} style={{ margin: 4, tintColor: "#f35f5f" }} />
        <Red16 style={{ fontFamily: "notosans700" }}>참석 신청</Red16>
      </TORowCenter>
    </>
  );
}
