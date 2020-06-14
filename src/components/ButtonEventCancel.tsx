import React from "react";
import { ViewProps } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { Image } from "./Image";
import { ViewRowCenter } from "./View";
import { Mint13, White16 } from "./Text";
import { TO0 } from "./TouchableOpacity";

import { useStore } from "../Store";
import { unlikeSuggestion } from "../graphql/mutation";

import iconAgree from "../../assets/iconAgree.png";
const bgMenuBgCopy = {
  minHeight: 33,
  paddingHorizontal: 15,
  borderRadius: 16.5,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#f35f5f",
  backgroundColor: "#f35f5f",
} as ViewProps;
export default function ButtonEventCancel({ id }: { id: number }) {
  const [{ user_id }, dispatch] = useStore();
  const [unlike, { loading }] = useMutation(unlikeSuggestion, {
    variables: { id, user_id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  function unlikeHandler() {
    unlike().then(() =>
      showMessage({
        type: "success",
        message: "참석을 취소하였습니다",
      })
    );
  }
  return (
    <TO0 onPress={unlikeHandler}>
      <ViewRowCenter style={bgMenuBgCopy}>
        <Image source={iconAgree} style={{ marginRight: 4 }} />
        <White16 style={{ fontFamily: "notosans700" }}>모임 신청 완료</White16>
      </ViewRowCenter>
      <Mint13 style={{ marginTop: 9, fontFamily: "notosans700" }}>
        모임 신청 취소
      </Mint13>
    </TO0>
  );
}
