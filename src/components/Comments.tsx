import React from "react";
import UserProfileWithName from "./UserProfileWithName";
import { View, ViewRowLeft, ViewRow } from "./View";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { useMutation } from "@apollo/react-hooks";
import { insertComment } from "../graphql/mutation";
import { useStore } from "../Store";
export default (
  props: React.PropsWithoutRef<{ comments: any[]; suggestionId: number }>
) => {
  const [{ user_id }, , dispatch] = useStore();
  const [comm, setComm] = React.useState("");
  const [insert, { loading }] = useMutation(insertComment, {
    variables: {
      body: comm,
      suggestion_id: props.suggestionId,
      user_id: user_id
    }
  });
  React.useEffect(() => {
    console.log(loading);
    dispatch({ type: "SET_LOADING", payload: loading });
  }, [loading]);
  return (
    <View>
      <Text>댓글 {props.comments.length}</Text>
      <ViewRowLeft>
        {props.comments.map(
          (
            u: { body: string; updated_at: string; user: { name: string } },
            i: number
          ) => (
            <ViewRow key={i}>
              <UserProfileWithName name={u.user.name} key={i} />
              <Text>{u.body}</Text>
            </ViewRow>
          )
        )}
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
        <Button
          title="등록"
          onPress={e =>
            insert()
              .then(console.log)
              .catch(console.error)
          }
        />
      </ViewRowLeft>
    </View>
  );
};
