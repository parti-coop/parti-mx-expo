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

import { incrementUserPostCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { PostListType } from "../types";
import { isAfterString } from "../Utils/CalculateDays";

import iconComment from "../../assets/iconComment.png";
import iconUserGrey from "../../assets/iconUserGrey.png";
import { DotRed8 } from "./Dots";

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
          <ViewRow style={{ justifyContent: "flex-start" }}>
            <Title16 numberOfLines={1}>{post.title}</Title16>
            {hasChecked && <DotRed8 style={{ marginLeft: 4 }} />}
          </ViewRow>
          <ViewRow style={{ justifyContent: "flex-start" }}>
            <Image source={iconUserGrey} style={{ marginRight: 8 }} />
            <Grey12>{post.createdBy.name}</Grey12>
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
          count={likeCount}
        />
      </ViewRow>
    </TouchableOpacity>
  );
}
