import React from "react";
import { ViewStyle, StyleProp, Image } from "react-native";
import { useMutation } from "@apollo/react-hooks";

import { View, ViewRow, V0 } from "./View";
import { TO0 } from "./TouchableOpacity";
import { Caption16, Title22, Mint16, White16 } from "./Text";
import { showMessage } from "react-native-flash-message";
import { TextInput } from "./TextInput";
import { boardOptions, boardTypes } from "./boardTypes";
import { whiteRoundBg } from "./Styles";

import { useStore } from "../Store";
import { insertBoard } from "../graphql/mutation";

const rectangleStyle = {
  width: 60,
  height: 66,
  borderRadius: 15,
  backgroundColor: "#f0f0f0",
  marginHorizontal: 1,
} as ViewStyle;
export default function ViewBoardInsert(props: {
  style?: StyleProp<ViewStyle>;
  setVisible: (visible: boolean) => void;
}) {
  const [{ group_id }] = useStore();
  const [type, setType] = React.useState(boardTypes.SUGGESTION);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const bodyRef = React.useRef(null);
  function pickerHandler(value: string) {
    switch (value) {
      case boardTypes.NOTICE:
      case boardTypes.SUGGESTION:
      case boardTypes.VOTE:
        return setType(value);
    }
  }
  const [insert, { error, data }] = useMutation(insertBoard, {
    variables: { group_id, type, title, body },
  });
  if (error) {
    console.log(error);
  }
  async function saveHandler() {
    if (!title || !type) {
      return;
    }
    await insert();
    showMessage({ type: "success", message: "게시판을 만들었습니다." });
    props.setVisible(false);
  }
  return (
    <View style={[whiteRoundBg, { width: 315, height: 361, padding: 30 }]}>
      <Title22 style={{ paddingBottom: 20 }}>게시판 추가</Title22>
      <ViewRow style={{ paddingVertical: 20 }}>
        {boardOptions.map(({ icon, label, value }, index) => {
          if (value === type) {
            return (
              <TO0
                style={[rectangleStyle, { backgroundColor: "#12BD8E" }]}
                key={index}
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
              onPress={() => pickerHandler(value)}
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
}
