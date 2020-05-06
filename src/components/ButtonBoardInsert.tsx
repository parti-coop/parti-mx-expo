import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import Modal from "react-native-modal";

import { V0 } from "./View";
import { Image } from "./Image";
import { KeyboardAvoidingView } from "./KeyboardAvoidingView";
import { TouchableOpacity, TORowCenter } from "./TouchableOpacity";
import { Mint16 } from "./Text";
import ViewBoardInsert from "./ViewBoardInsert";

import iconAddForm from "../../assets/iconAddForm.png";

export default function ButtonBoardInsert(props: {
  style?: StyleProp<ViewStyle>;
}) {
  const [isVisible, setVisible] = React.useState(false);

  function insertHandler() {
    setVisible(true);
  }
  return (
    <>
      <TORowCenter onPress={insertHandler} style={{ padding: 25 }}>
        <Image source={iconAddForm} style={{ marginRight: 10 }} />
        <Mint16>게시판 추가</Mint16>
      </TORowCenter>

      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={() => setVisible(false)}
      >
        <KeyboardAvoidingView
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
          <V0>
            <ViewBoardInsert setVisible={setVisible} />
          </V0>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
