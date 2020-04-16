import React from "react";
import { ViewStyle, StyleProp } from "react-native";

import { Image } from "./Image";
import { View, ViewRow, V0 } from "./View";
import { TO0 } from "./TouchableOpacity";
import { Caption16, Title22, Mint16, White16 } from "./Text";
import { useMutation } from "@apollo/react-hooks";
import { updateBoard } from "../graphql/mutation";
import { useStore } from "../Store";
import { showMessage } from "react-native-flash-message";
import { TextInput } from "./TextInput";
import { Board } from "../types";

import iconNewsGray from "../../assets/iconNewsGray.png";
import iconCommunityGray from "../../assets/iconCommunityGray.png";
import iconSuggestGray from "../../assets/iconSuggestGray.png";
import iconVoteGray from "../../assets/iconVoteGray.png";

const options = [
  { value: "notice", label: "소식", icon: iconNewsGray },
  { value: "suggestion", label: "제안", icon: iconSuggestGray },
  { value: "event", label: "모임", icon: iconCommunityGray },
  { value: "vote", label: "투표", icon: iconVoteGray },
];
const boxStyle = {
  width: 315,
  height: 361,
  borderRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 1,
  shadowOpacity: 1,
  padding: 30,
} as ViewStyle;
const rectangleStyle = {
  width: 60,
  height: 66,
  borderRadius: 15,
  backgroundColor: "#f0f0f0",
  marginHorizontal: 1,
} as ViewStyle;

export default (props: {
  style?: StyleProp<ViewStyle>;
  setVisible: (visible: boolean) => void;
  board: Board;
}) => {
  const { board } = props;
  const [{ group_id, user_id }, dispatch] = useStore();
  const [type, setType] = React.useState(board.type);
  const [title, setTitle] = React.useState(board.title);
  const [body, setBody] = React.useState(board.body);
  const bodyRef = React.useRef(null);
  const [update, { error, data }] = useMutation(updateBoard, {
    variables: { id: board.id, title, body },
  });
  if (error) {
    console.log(error);
  }
  async function saveHandler() {
    if (!title || !type) {
      return;
    }
    await update();
    showMessage({ type: "success", message: "게시판을 만들었습니다." });
    props.setVisible(false);
  }
  return (
    <View style={boxStyle}>
      <Title22 style={{ paddingBottom: 20 }}>게시판 추가</Title22>
      <ViewRow style={{ paddingVertical: 20 }}>
        {options.map(({ icon, label, value }, index) => {
          if (value === type) {
            return (
              <TO0
                style={[rectangleStyle, { backgroundColor: "#30ad9f" }]}
                key={index}
                onPress={() => setType(value)}
                disabled
              >
                <Image source={icon} style={{ tintColor: "white" }} />
                <White16>{label}</White16>
              </TO0>
            );
          }
          return (
            <TO0
              style={rectangleStyle}
              key={index}
              onPress={() => setType(value)}
              disabled
            >
              <Image source={icon} />
              <Caption16>{label}</Caption16>
            </TO0>
          );
        })}
      </ViewRow>
      <ViewRow>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={{
            borderBottomColor: "#f0f0f0",
            borderBottomWidth: 1,
            paddingLeft: 0,
          }}
          placeholder="게시판 이름을 입력해주세요"
          onSubmitEditing={() => bodyRef.current.focus()}
        />
      </ViewRow>
      <ViewRow>
        <TextInput
          value={body}
          onChangeText={setBody}
          style={{
            borderBottomColor: "#f0f0f0",
            borderBottomWidth: 1,
            paddingLeft: 0,
          }}
          placeholder="게시판 설명을 입력해주세요"
          ref={bodyRef}
          onSubmitEditing={saveHandler}
        />
      </ViewRow>
      <TO0 onPress={saveHandler} style={{ flex: 1 }}>
        <Mint16>확인</Mint16>
      </TO0>
    </View>
  );
};
