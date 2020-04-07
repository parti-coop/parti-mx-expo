import React from "react";
import { ViewStyle, Image } from "react-native";
import Modal from "react-native-modal";

import UserCommentProfile from "./UserCommentProfile";
import { View, ViewRow, V0, ViewRowCenter } from "./View";
import { Text, Grey12, Body16, Red16 } from "./Text";
import { TO0, TO1 } from "./TouchableOpacity";
import ButtonLikeComment from "./ButtonLikeComment";
import ButtonComment from "./ButtonComment";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import SelectMenu from "./SelectMenu";

import useCommentDelete from "./useCommentDelete";

interface Comment {
  id: number;
  body: string;
  updated_at: string;
  user: { name: string; votes: [{ count: number }]; photo_url: string };
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

const commentModal = {
  width: 315,
  height: 171,
  borderRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowRadius: 1,
  shadowOpacity: 1,
  paddingHorizontal: 30,
  paddingTop: 40,
  paddingBottom: 10
} as ViewStyle;
export default (props: {
  comment: Comment;
  edit: (arg: { body: string; id: number }) => void;
  recomment: (arg: { id: number; user: Comment["user"] }) => void;
  style?: ViewStyle;
}) => {
  const { comment, edit: editHandler, style, recomment } = props;
  const { id, body, likes_aggregate, user, updated_at, likes } = comment;
  const [isVisible, setVisible] = React.useState(false);
  const [deleteComment] = useCommentDelete(id);
  function deleteHandler() {
    deleteComment();
    setVisible(false);
  }
  function recommentHandler() {
    recomment({ id, user });
  }
  const options = [
    {
      label: "수정하기",
      handler: function() {
        editHandler({ body, id });
      }
    },
    { label: "삭제하기", handler: () => setVisible(true) }
  ];
  return (
    <View
      style={[
        {
          marginTop: 14,
          paddingBottom: 25,
          borderBottomWidth: 1,
          borderBottomColor: "#e4e4e4"
        },
        style
      ]}
    >
      <ViewRow>
        <UserCommentProfile name={user.name} photoUrl={user.photo_url} />
        <Text>{user.votes[0] && "동의"}</Text>
        <Grey12 style={{ marginLeft: 9 }}>
          {new Date(updated_at).toLocaleString()}
        </Grey12>
      </ViewRow>
      <SelectMenu items={options} style={{ right: 0, top: 0 }} />

      <Text style={{ color: "#555555", fontSize: 16, marginVertical: 25 }}>
        {body}
      </Text>
      <ViewRow>
        <ButtonComment recomment={recommentHandler} />
        {likes[0] ? (
          <ButtonUnlikeComment
            style={{ right: 0, position: "absolute" }}
            id={id}
            count={likes_aggregate.aggregate.count}
          />
        ) : (
          <ButtonLikeComment
            style={{ right: 0, position: "absolute" }}
            id={id}
            count={likes_aggregate.aggregate.count}
          />
        )}
      </ViewRow>
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={() => setVisible(false)}
      >
        <V0>
          <View style={commentModal}>
            <Body16>이 댓글을 삭제 하시겠습니까?</Body16>
            <ViewRowCenter style={{ marginTop: 30 }}>
              <TO1 style={{ padding: 20 }} onPress={() => setVisible(false)}>
                <Text style={{ fontSize: 16, color: "#999999" }}>취소</Text>
              </TO1>
              <View
                style={{ width: 1, height: 13, backgroundColor: "#d6d6d6" }}
              />
              <TO1 style={{ padding: 20 }} onPress={deleteHandler}>
                <Red16>삭제</Red16>
              </TO1>
            </ViewRowCenter>
          </View>
        </V0>
      </Modal>
    </View>
  );
};
