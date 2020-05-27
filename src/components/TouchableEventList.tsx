import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";

import { Image } from "./Image";
import { V1, ViewRow } from "./View";
import { Grey12, Title16, Blue12, Red12 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { SmallVerticalDivider } from "./LineDivider";
import { RoundEventDate } from "./Round";
import { DotRed } from "./Dots";

import { incrementUserPostCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { isAfterString } from "../Utils/CalculateDays";
import { EventListType } from "../types";

import iconComment from "../../assets/iconComment.png";
import iconUserGrey from "../../assets/iconUserGrey.png";
import iconSympathy from "../../assets/iconSympathy.png";
import iconCalendar from "../../assets/iconCalendar.png";
import { format } from "date-fns";

export default function TouchableEventList(props: {
  post: EventListType;
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
  function pressHandler() {
    update();
    navigate("EventDetail", { postId: post.id });
  }
  const hasChecked = isAfterString(
    post?.updated_at,
    post?.users?.[0]?.updated_at
  );
  let deadline = null;
  try {
    deadline = format(new Date(post.metadata.deadline), "M/dd");
  } catch (error) {
    console.warn(error);
  }
  return (
    <TouchableOpacity onPress={pressHandler}>
      <ViewRow>
        <RoundEventDate value={post.metadata.eventDate} />
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
            <Title16 numberOfLines={1}>{post.title}</Title16>
            {hasChecked && <DotRed style={{ marginLeft: 4 }} size={4} />}
          </ViewRow>
          <ViewRow>
            <Image source={iconUserGrey} style={{ marginRight: 8 }} />
            <Grey12 style={{ fontFamily: "notosans700" }}>
              {post.metadata.countPeople}명 모집, {voteCount}명 신청
              {votedByMe && (
                <>
                  <Grey12 style={{ fontFamily: "notosans700" }}>{", "}</Grey12>
                  <Blue12 style={{ fontFamily: "notosans700" }}>신청함</Blue12>
                </>
              )}
            </Grey12>
          </ViewRow>

          <ViewRow>
            <Image source={iconCalendar} style={{ marginRight: 8 }} />
            <Grey12 style={{ fontFamily: "notosans700" }}>
              {deadline}일까지
            </Grey12>
            <SmallVerticalDivider />
            <Image
              source={iconComment}
              style={{ marginRight: 8, marginLeft: 6 }}
            />
            <Grey12>{post.comments_aggregate.aggregate.count}</Grey12>
            <SmallVerticalDivider style={{ marginHorizontal: 10 }} />
            <Image source={iconSympathy} />
            <Red12 style={{ marginLeft: 5 }}>{voteCount}</Red12>
          </ViewRow>
        </V1>
      </ViewRow>
    </TouchableOpacity>
  );
}
