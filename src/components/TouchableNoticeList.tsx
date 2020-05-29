import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";

import { Image } from "./Image";
import { V1, ViewRow } from "./View";
import { Title16, Grey12, Red12 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { SmallVerticalDivider } from "./LineDivider";

import { incrementUserPostCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { PostListType } from "../types";
import { isAfterString, semanticDate } from "../Utils/CalculateDays";
import { DotRed } from "./Dots";

import iconComment from "../../assets/iconComment.png";
import iconSympathy from "../../assets/iconSympathy.png";
import iconUserGrey from "../../assets/iconUserGrey.png";

export default function TouchableNoticeList(props: {
  post: PostListType;
  style?: StyleProp<ViewStyle>;
}) {
  const { navigate } = useNavigation();
  const { post, style } = props;
  const [{ user_id }] = useStore();
  const [update, { data }] = useMutation(incrementUserPostCheck, {
    variables: { user_id, post_id: post.id },
  });
  const likeCount = post?.users_aggregate?.aggregate?.sum?.like_count ?? 0;
  const hasChecked = isAfterString(
    post?.updated_at,
    post?.users?.[0]?.updated_at
  );
  function pressHandler() {
    update();
    navigate("NoticeDetail", { postId: post.id });
  }
  return (
    <TouchableOpacity onPress={pressHandler}>
      <V1
        style={[
          {
            paddingHorizontal: 30,
            alignItems: "flex-start",
            paddingVertical: 19,
            borderBottomColor: "#e4e4e4",
          },
          style,
        ]}
      >
        <ViewRow>
          {hasChecked && (
            <DotRed
              style={{ marginLeft: -4, alignSelf: "flex-start" }}
              size={4}
            />
          )}
          <Title16 numberOfLines={2}>{post.title}</Title16>
        </ViewRow>
        <ViewRow>
          <Grey12
            style={{ fontFamily: "notosans700", flexShrink: 1 }}
            numberOfLines={1}
          >
            {post.createdBy.name}{" "}
          </Grey12>
          <Grey12 style={{ fontFamily: "notosans700" }}>
            ({semanticDate(post.created_at)})
          </Grey12>
          <SmallVerticalDivider />
          <Grey12>댓글 </Grey12>
          <Grey12>{post.comments_aggregate.aggregate.count}</Grey12>
          <SmallVerticalDivider />
          <Image source={iconSympathy} />
          <Red12 style={{ marginLeft: 5 }}>{likeCount}</Red12>
        </ViewRow>
      </V1>
    </TouchableOpacity>
  );
}
