import React from "react";
import { ViewStyle, TextStyle } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { Image } from "./Image";
import { Text } from "./Text";
import { TORowCenter } from "./TouchableOpacity";

import { useStore } from "../Store";
import { likeSuggestion } from "../graphql/mutation";

import iconAgree from "../../assets/iconAgree.png";

const bgMenuBgCopy = {
  width: 184,
  height: 33,
  borderRadius: 16.5,
  backgroundColor: "#f35f5f",
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#f35f5f",
} as ViewStyle;
const textStyle = {
  fontSize: 16,
  textAlign: "left",
  color: "#ffffff",
} as TextStyle;
export default (props: {
  id: number;
  created_at: string;
  closingMethod: number;
}) => {
  const [, dispatch] = useStore();
  const { created_at, closingMethod = 0, id } = props;
  const [vote, { loading }] = useMutation(likeSuggestion, {
    variables: { id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  const closingAt = new Date(
    ((d) => d.setDate(d.getDate() + 30))(new Date(created_at))
  ).toDateString();
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
        <Image source={iconAgree} style={{ margin: 4 }} />
        <Text style={textStyle}>이 제안에 동의합니다</Text>
      </TORowCenter>
      {closingMethod === 0 && (
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
      )}
    </>
  );
};
