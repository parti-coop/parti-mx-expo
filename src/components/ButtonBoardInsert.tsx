import React from "react";
import {
  ViewStyle,
  StyleProp,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";
import { useMutation } from "@apollo/react-hooks";

import { View, ViewRow, ViewColumnCenter } from "./View";
import { KeyboardAvoidingView } from "./KeyboardAvoidingView";
import { TouchableOpacity, TORowCenter } from "./TouchableOpacity";
import { Text, Mint16 } from "./Text";
import ViewBoardInsert from "./ViewBoardInsert";

import { deleteBoard } from "../graphql/mutation";
import { useStore } from "../Store";

import iconAddForm from "../../assets/iconAddForm.png";
const options = [
  { value: "notice", label: "소식" },
  { value: "suggestion", label: "제안" },
  { value: "event", label: "모임" },
  { value: "vote", label: "투표" },
];
export default (props: { style?: StyleProp<ViewStyle> }) => {
  const [isVisible, setVisible] = React.useState(false);
  // const [{ group_id, user_id }, dispatch] = useStore();

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
          <ViewColumnCenter>
            <ViewBoardInsert setVisible={setVisible} />
          </ViewColumnCenter>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};
