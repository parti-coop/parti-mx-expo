import React from "react";
import UserProfileWithName from "./UserProfileWithName";
import { View, ViewRow } from "./View";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import ButtonLikeComment from "./ButtonLikeComment";
import ButtonComment from "./ButtonComment";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import { useMutation } from "@apollo/react-hooks";
import { insertComment } from "../graphql/mutation";
import { useStore } from "../Store";
export default (
  props: React.PropsWithoutRef<{ comments: any[]; suggestionId: number }>
) => {
  const [{ user_id }, dispatch] = useStore();
  const [comm, setComm] = React.useState("");
  const textinput = React.useRef(null);
  const [insert, { loading }] = useMutation(insertComment, {
    variables: {
      body: comm,
      suggestion_id: props.suggestionId,
      user_id: user_id
    }
  });
  function textinputFocus() {
    setComm(`@${user_id} ` + comm);
    textinput.current.focus();
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return (
    <View>
      <Text>댓글 {props.comments.length}</Text>
      <View>
        {props.comments.map(
          (
            u: {
              id: number;
              body: string;
              updated_at: string;
              user: { name: string; votes: [{ count: number }] };
              likes: [
                {
                  user: {
                    name: string;
                  };
                }
              ];
              likes_aggregate: {
                aggregate: {
                  count: number;
                };
                nodes: {
                  user: {
                    name: string;
                  };
                };
              };
            },
            i: number
          ) => (
            <View key={i}>
              <ViewRow>
                <UserProfileWithName name={u.user.name} />
                <Text>{u.user.votes[0] && "동의"}</Text>
                <Text>{new Date(u.updated_at).toLocaleString()}</Text>
              </ViewRow>
              <Text>{u.body}</Text>
              <ViewRow>
                {u.likes[0] ? (
                  <ButtonUnlikeComment id={u.id} />
                ) : (
                  <ButtonLikeComment id={u.id} />
                )}

                <Text>{u.likes_aggregate.aggregate.count}</Text>
                <ButtonComment focus={textinputFocus} />
              </ViewRow>
            </View>
          )
        )}
      </View>
      <ViewRow>
        <TextInput
          value={comm}
          placeholder="댓글을 입력하세요"
          onChange={e => setComm(e.nativeEvent.text)}
          style={{ flex: 1, height: 50, backgroundColor: "white" }}
          // multiline
          textAlignVertical="top"
          ref={textinput}
        />
        <Button
          title="등록"
          onPress={e =>
            insert()
              .then(console.log)
              .catch(console.error)
          }
        />
      </ViewRow>
    </View>
  );
};
