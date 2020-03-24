import React from "react";
import { ViewStyle, TextStyle, Image } from "react-native";
import { useMutation } from "@apollo/react-hooks";

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
  borderColor: "#f35f5f"
} as ViewStyle;
const textStyle = {
  fontSize: 16,
  textAlign: "left",
  color: "#ffffff"
} as TextStyle;
export default ({ id }: { id: number }) => {
  const [{ user_id }, dispatch] = useStore();
  const [vote, { loading }] = useMutation(voteSuggestion, {
    variables: { id, user_id }
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return (
    <>
      <TORowCenter
        style={bgMenuBgCopy}
        onPress={e =>
          vote()
            .then(console.log)
            .catch(console.error)
        }
      >
        <Image source={iconAgree} style={{ margin: 4 }} />
        <Text style={textStyle}>이 제안에 동의합니다</Text>
      </TORowCenter>
    </>
  );
};
