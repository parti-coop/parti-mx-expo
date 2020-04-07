import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import Modal from "react-native-modal";

import { View, ViewRow, V0 } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";
import { KeyboardAvoidingView } from "./KeyboardAvoidingView";
import { Text, Title14 } from "./Text";
import useBoardDelete from "./useBoardDelete";
import SelectMenu from "./SelectMenu";
import ButtonBoardType from "./ButtonBoardType";
import ViewBoardEdit from "./ViewBoardEdit";

type Board = {
  id: number;
  title: string;
  body: string;
  is_member_only: boolean;
  type: string;
  updated_at: string;
  last_posted_at: string;
  usersBoardCheck: Array<{ updated_at: string }>;
};
export default (props: { board: Board; style?: StyleProp<ViewStyle> }) => {
  const { board, style } = props;
  const [isVisible, setVisible] = React.useState(false);
  const deleteBoard = useBoardDelete(board.id);
  const items = [
    { label: "수정", handler: console.log },
    { label: "삭제", handler: deleteBoard },
  ];
  return (
    <ViewRow
      style={[
        {
          paddingVertical: 20,
          borderBottomColor: "#e4e4e4",
          borderBottomWidth: 1,
          marginHorizontal: 30,
          borderStyle: "solid",
        },
        style,
      ]}
    >
      <ButtonBoardType
        boardId={board.id}
        is_member_only={board.is_member_only}
      />
      <View
        style={{
          width: 1,
          height: 14,
          backgroundColor: "#e4e4e4",
          marginHorizontal: 15,
        }}
      />
      <Title14 style={{ flex: 1 }}>{board.title}</Title14>
      <SelectMenu items={items} style={{ right: 0, position: "relative" }} />
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
            <ViewBoardEdit setVisible={setVisible} />
          </V0>
        </KeyboardAvoidingView>
      </Modal>
    </ViewRow>
  );
};
