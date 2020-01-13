import React from "react";
import { KeyboardAvoidingView } from "react-native";
import UserProfileWithName from "./UserProfileWithName";
import { View, ViewRowLeft } from "./View";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
export default (props: React.PropsWithoutRef<{ comments: any[] }>) => {
  const [comm, setComm] = React.useState("");
  return (
    // <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
    <View>
      <Text>댓글 {props.comments.length}</Text>
      <ViewRowLeft>
        {props.comments.map((u: any, i: number) => (
          <UserProfileWithName name={u} key={i} />
        ))}
      </ViewRowLeft>
      <ViewRowLeft>
        <TextInput
          value={comm}
          placeholder="댓글을 입력하세요"
          onChange={e => setComm(e.nativeEvent.text)}
          style={{ flex: 1, height: 50, backgroundColor: "white" }}
          multiline
          textAlignVertical="top"
        />
        <Button title="등록" onPress={e => e} />
      </ViewRowLeft>
    </View>
    // </KeyboardAvoidingView>
  );
};
