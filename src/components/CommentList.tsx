import React from "react";
import { ViewStyle, Image } from "react-native";
import Modal from "react-native-modal";

import UserCommentProfile from "./UserCommentProfile";
import { View, ViewRow, V0, ViewRowCenter } from "./View";
import { Text, Grey12, Body16, Red16, Mint13 } from "./Text";
import { TO1 } from "./TouchableOpacity";
import ButtonLikeComment from "./ButtonLikeComment";
import ButtonComment from "./ButtonComment";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import SelectMenu from "./SelectMenu";
import useCommentDelete from "./useCommentDelete";
import CommentReList from "./CommentReList";

import { Comment, RecommentArgs } from "../types";
import { formatDateFromString } from "../Utils/CalculateDays";
import { useStore } from "../Store";

const commentModal = {
  width: 315,
  height: 171,
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
  paddingHorizontal: 30,
  paddingTop: 40,
  paddingBottom: 10,
} as ViewStyle;
export default function CommentList(props: {
  comment: Comment;
  edit: (arg: { body: string; id: number }) => void;
  recomment: (arg: RecommentArgs) => void;
  style?: ViewStyle;
}) {
  const { comment, edit: editHandler, style, recomment } = props;
  const { id, body, likes_aggregate, user, updated_at, likes, re } = comment;
  const [isVisible, setVisible] = React.useState(false);
  const [{ user_id }] = useStore();
  const [deleteComment] = useCommentDelete(id);
  function deleteHandler() {
    deleteComment();
    setVisible(false);
  }
  function recommentHandler({ reUser = null }) {
    recomment({ id, user, reUser });
  }
  const options = [
    {
      label: "수정하기",
      handler: function () {
        editHandler({ body, id });
      },
    },
    { label: "삭제하기", handler: () => setVisible(true) },
  ];
  return (
    <View
      style={[
        {
          marginTop: 10,
          paddingBottom: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#e4e4e4",
        },
        style,
      ]}
    >
      <ViewRow>
        <UserCommentProfile name={user.name} photoUrl={user.photo_url} />
        {user?.checkedPosts?.[0] && (
          <Mint13 style={{ marginLeft: 9 }}>동의</Mint13>
        )}
        <Grey12 style={{ marginLeft: 9 }}>
          {formatDateFromString(updated_at)}
        </Grey12>
        {user.id === user_id && <SelectMenu items={options} />}
      </ViewRow>

      <Text style={{ color: "#555555", fontSize: 16, marginVertical: 10 }}>
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
      {re.map((u, i) => (
        <CommentReList
          comment={u}
          key={i}
          edit={editHandler}
          recomment={recommentHandler}
          style={re.length === i + 1 && { borderBottomWidth: 0 }}
        />
      ))}
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
}
