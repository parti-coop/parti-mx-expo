import React from "react";
import { ViewProps } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { Image } from "./Image";
import { ViewRowCenter } from "./View";
import { Mint13, Red16 } from "./Text";
import { TO0 } from "./TouchableOpacity";

import { useStore } from "../Store";
import { unlikeSuggestion } from "../graphql/mutation";

import iconAgree from "../../assets/iconAgree.png";
const bgMenuBgCopy = {
  paddingHorizontal: 15,
  height: 33,
  borderRadius: 16.5,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#f35f5f",
} as ViewProps;
export default ({ id, total = 0 }: { id: number; total: number }) => {
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
        message: "좋아요가 취소되었습니다",
      })
    );
  }
  return (
    <TO0 onPress={unlikeHandler}>
      <ViewRowCenter style={bgMenuBgCopy}>
        <Image
          source={iconAgree}
          style={{ marginRight: 4, tintColor: "#f35f5f" }}
        />
        <Red16>{total}</Red16>
      </ViewRowCenter>
    </TO0>
  );
};
