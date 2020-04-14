import React from "react";
import { ViewStyle, TextStyle } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { Image } from "./Image";
import { Text } from "./Text";
import { TORowCenter } from "./TouchableOpacity";

import { useStore } from "../Store";
import { voteSuggestion } from "../graphql/mutation";

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
  closing_method: number;
}) => {
  const [{ user_id }, dispatch] = useStore();
  const { created_at, closing_method, id } = props;
  const [vote, { loading }] = useMutation(voteSuggestion, {
    variables: { id, user_id },
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
      {closing_method === 0 && (
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
