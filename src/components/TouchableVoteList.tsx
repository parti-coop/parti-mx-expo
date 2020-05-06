import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";

import { Image } from "./Image";
import { V1, ViewRow } from "./View";
import { Text, Grey12, Title16 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { SmallVerticalDivider } from "./LineDivider";
import ViewLikeCount from "./ViewLikeCount";
import { RoundDDays } from "./Round";
import { DotRed8 } from "./Dots";

import { incrementUserPostCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { calculateDays, isAfterString } from "../Utils/CalculateDays";
import { VoteListType } from "../types";

import iconComment from "../../assets/iconComment.png";
import iconUserGrey from "../../assets/iconUserGrey.png";

export default function TouchableVoteList(props: {
  post: VoteListType;
  style?: StyleProp<ViewStyle>;
}) {
  const { navigate } = useNavigation();
  const { post, style } = props;
  const [{ user_id }] = useStore();
  const [update] = useMutation(incrementUserPostCheck, {
    variables: { user_id, post_id: post.id },
  });
  const voteCount = post?.users_aggregate?.aggregate?.sum?.like_count ?? 0;
  const votedByMe = post.users.length > 0 && post.users[0].like_count > 0;
  const daysLeft = calculateDays(post.created_at);
  function pressHandler() {
    update();
    navigate("VoteDetail", { postId: post.id });
  }
  const hasChecked = isAfterString(
    post?.updated_at,
    post?.users?.[0]?.updated_at
  );
  return (
    <TouchableOpacity onPress={pressHandler}>
      <ViewRow style={{ justifyContent: "flex-start" }}>
        <RoundDDays number={daysLeft} />
        <V1
          style={[
            {
              alignItems: "flex-start",
              paddingVertical: 19,
              borderBottomColor: "#e4e4e4",
              marginRight: 25,
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
            <Text style={{ fontSize: 12, textAlign: "left", color: "#4b93dc" }}>
              {votedByMe && ", 동의함"}
            </Text>
            <SmallVerticalDivider />
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
}
