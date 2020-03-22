import React from "react";
import { ViewStyle, StyleProp, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, ViewRow, ViewColumnCenter } from "./View";

import { TouchableOpacity } from "./TouchableOpacity";
import { Text } from "./Text";
import { useMutation } from "@apollo/react-hooks";
import { deleteBoard } from "../graphql/mutation";
import { useStore } from "../Store";
import { showMessage } from "react-native-flash-message";
import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";

import ViewBoardInsert from "./ViewBoardInsert";
const options = [
  { value: "notice", label: "소식" },
  { value: "suggestion", label: "제안" },
  { value: "event", label: "모임" },
  { value: "vote", label: "투표" }
];
export default (props: { style?: StyleProp<ViewStyle> }) => {
  const [isVisible, setVisible] = React.useState(false);
  // const [{ group_id, user_id }, dispatch] = useStore();

  function insertHandler() {
    setVisible(true);
  }
  return (
    <>
      <TouchableOpacity onPress={insertHandler}>
        <Text>게시판 추가</Text>
      </TouchableOpacity>
      <Modal isVisible={isVisible}>
        <ViewColumnCenter>
          <ViewBoardInsert setVisible={setVisible} />
        </ViewColumnCenter>
      </Modal>
    </>
  );
};
