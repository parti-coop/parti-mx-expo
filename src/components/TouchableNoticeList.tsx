import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";

import { Image } from "./Image";
import { V1, ViewRow, V0 } from "./View";
import { Title16, Grey12 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { SmallVerticalDivider } from "./LineDivider";
import ViewLikeCount from "./ViewLikeCount";

import { updateUserBoardCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { PostListType } from "../types";

import iconComment from "../../assets/iconComment.png";
import iconUserGrey from "../../assets/iconUserGrey.png";

export default (props: {
  post: PostListType;
  style?: StyleProp<ViewStyle>;
}) => {
  const { navigate } = useNavigation();
  const { post, style } = props;
  const [{ user_id }] = useStore();
  const [update, { data }] = useMutation(updateUserBoardCheck, {
    variables: { user_id, board_id: post.id },
  });
  const voteCount = post?.users_aggregate?.aggregate?.sum?.like_count ?? 0;

  return (
    <TouchableOpacity
      onPress={(e) =>
        navigate("NoticeDetail", {
          postId: post.id,
        })
      }
    >
      <ViewRow
        style={{
          justifyContent: "flex-start",
          paddingHorizontal: 30,
        }}
      >
        <V1
          style={[
            {
              alignItems: "flex-start",
              paddingVertical: 19,
              borderBottomColor: "#e4e4e4",
            },
            style,
          ]}
        >
          <Title16 numberOfLines={1}>{post.title}</Title16>
          <ViewRow style={{ justifyContent: "flex-start" }}>
            <Image source={iconUserGrey} style={{ marginRight: 8 }} />
            <Grey12>{post.updatedBy.name}</Grey12>
            <SmallVerticalDivider style={{ marginLeft: 10 }} />
            <Image
              source={iconComment}
              style={{ marginRight: 8, marginLeft: 6 }}
            />
            <Grey12>{post.comments_aggregate.aggregate.count}</Grey12>
            {/* {post.closed_at && <Text>{post.closed_at}</Text>} */}
          </ViewRow>
        </V1>
        <ViewLikeCount
          style={{ position: "absolute", right: -15 }}
          count={voteCount}
        />
      </ViewRow>
    </TouchableOpacity>
  );
};
