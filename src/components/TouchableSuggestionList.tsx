import React from "react";
import { ViewStyle, StyleProp } from "react-native";

import { Image } from "./Image";
import { V1, ViewRow } from "./View";
import { Grey12, Title16, Blue12, Red12 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { SmallVerticalDivider } from "./LineDivider";
import { RoundDDays } from "./Round";
import { DotRed } from "./Dots";

import { calculateDays, isAfterString } from "../Utils/CalculateDays";
import { SuggestionListType } from "../types";

import iconUserGrey from "../../assets/iconUserGrey.png";
import iconSympathy from "../../assets/iconSympathy.png";
import { boardTypes } from "./boardTypes";

export default function TouchableSuggestionList(props: {
  post: SuggestionListType;
  style?: StyleProp<ViewStyle>;
  onPress: (type: boardTypes, post_id: number) => void;
}) {
  const { post, style, onPress } = props;
  const voteCount = post?.users_aggregate?.aggregate?.sum?.like_count ?? 0;
  const votedByMe = post.users.length > 0 && post.users[0].like_count > 0;
  const daysLeft = calculateDays(post.created_at);
  function pressHandler() {
    onPress(boardTypes.SUGGESTION, post.id);
  }
  const hasChecked = isAfterString(
    post?.updated_at,
    post?.users?.[0]?.updated_at
  );
  return (
    <TouchableOpacity onPress={pressHandler}>
      <ViewRow>
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
            <Image source={iconUserGrey} style={{ marginRight: 8 }} />
            <Grey12
              style={{ fontFamily: "notosans700", flexShrink: 1 }}
              numberOfLines={1}
            >
              {post.createdBy.name}
            </Grey12>
            {votedByMe && (
              <>
                <Grey12 style={{ fontFamily: "notosans700" }}>{", "}</Grey12>
                <Blue12 style={{ fontFamily: "notosans700" }}>동의함</Blue12>
              </>
            )}
            <SmallVerticalDivider />
            <Grey12>댓글 </Grey12>
            <Grey12>{post.comments_aggregate.aggregate.count}</Grey12>
            <SmallVerticalDivider />
            <Image source={iconSympathy} />
            <Red12 style={{ marginLeft: 5 }}>{voteCount}</Red12>
          </ViewRow>
        </V1>
      </ViewRow>
    </TouchableOpacity>
  );
}
