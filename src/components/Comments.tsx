import React from "react";
import { ViewStyle, Image } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

// import UserProfileWithName from "./UserProfileWithName";
import UserCommentProfile from "./UserCommentProfile";
import { View, ViewRow } from "./View";
import { Text, Grey12 } from "./Text";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { TO0 } from "./TouchableOpacity";
import ButtonLikeComment from "./ButtonLikeComment";
import ButtonComment from "./ButtonComment";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import SelectMenu from "./SelectMenu";

import { insertComment } from "../graphql/mutation";
import { useStore } from "../Store";

import iconSend from "../../assets/iconSend.png";
interface Comment {
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
}

const box = {
  paddingHorizontal: 30,
  paddingTop: 14,
  paddingBottom: 45,
  // borderRadius: 25,
  borderTopRightRadius: 25,
  borderTopLeftRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowRadius: 1,
  shadowOpacity: 1
} as ViewStyle;
export default (props: { comments: Comment[]; suggestionId: number }) => {
  const { comments } = props;
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
  function sendHandler() {
    insert()
      .then(() =>
        showMessage({
          type: "success",
          message: "댓글 등록F"
        })
      )
      .catch(error =>
        showMessage({
          type: "danger",
          message: error.message
        })
      );
  }
  const options = [
    {
      label: "수정하기",
      handler: () => {
        console.log(1);
      }
    },
    { label: "삭제하기", handler: () => console.log(2) }
  ];
  return (
    <View>
      <View style={box}>
        {comments.map((u, i: number) => (
          <View
            key={i}
            style={{
              marginTop: 14,
              paddingBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: "#e4e4e4"
            }}
          >
            <ViewRow>
              <UserCommentProfile name={u.user.name} />
              <Text>{u.user.votes[0] && "동의"}</Text>
              <Grey12 style={{ marginLeft: 9 }}>
                {new Date(u.updated_at).toLocaleString()}
              </Grey12>
            </ViewRow>
            <SelectMenu items={options} style={{ right: 0, top: 0 }} />

            <Text
              style={{ color: "#555555", fontSize: 16, marginVertical: 25 }}
            >
              {u.body}
            </Text>
            <ViewRow>
              <ButtonComment focus={textinputFocus} />
              {u.likes[0] ? (
                <ButtonUnlikeComment
                  style={{ right: 0, position: "absolute" }}
                  id={u.id}
                  count={u.likes_aggregate.aggregate.count}
                />
              ) : (
                <ButtonLikeComment
                  style={{ right: 0, position: "absolute" }}
                  id={u.id}
                  count={u.likes_aggregate.aggregate.count}
                />
              )}
            </ViewRow>
          </View>
        ))}
      </View>
      <ViewRow
        style={{
          backgroundColor: "#f7f7f7",
          padding: 30,
          paddingBottom: 21
          // borderStyle: "solid"
        }}
      >
        <TextInput
          value={comm}
          placeholder="댓글입력"
          onChange={e => setComm(e.nativeEvent.text)}
          style={{ flex: 1, fontSize: 17, paddingLeft: 0 }}
          // multiline
          placeholderTextColor="#30ad9f"
          textAlignVertical="top"
          ref={textinput}
        />
        <TO0 onPress={sendHandler}>
          <Image source={iconSend} />
        </TO0>
      </ViewRow>
      <View
        style={{
          borderBottomColor: "#30ad9f",
          borderBottomWidth: 1,
          marginBottom: 53,
          marginHorizontal: 30
        }}
      />
    </View>
  );
};
