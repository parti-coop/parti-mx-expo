import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";

import { Image } from "./Image";
import { V1, ViewRow } from "./View";
import { Grey12, Title16, Blue12 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { SmallVerticalDivider } from "./LineDivider";
import ViewLikeCount from "./ViewLikeCount";
import { RoundDDays } from "./Round";
import { DotRed8 } from "./Dots";

import { incrementUserPostCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { calculateDays, isAfterString } from "../Utils/CalculateDays";
import { SuggestionListType } from "../types";

import iconComment from "../../assets/iconComment.png";
import iconUserGrey from "../../assets/iconUserGrey.png";

export default function TouchableSuggestionList(props: {
  suggestion: SuggestionListType;
  style?: StyleProp<ViewStyle>;
}) {
  const { navigate } = useNavigation();
  const { suggestion, style } = props;
  const [{ user_id }] = useStore();
  const [update] = useMutation(incrementUserPostCheck, {
    variables: { user_id, post_id: suggestion.id },
  });
  const voteCount =
    suggestion?.users_aggregate?.aggregate?.sum?.like_count ?? 0;
  const votedByMe =
    suggestion.users.length > 0 && suggestion.users[0].like_count > 0;
  const daysLeft = calculateDays(suggestion.created_at);
  function pressHandler() {
    update();
    navigate("SuggestionDetail", { postId: suggestion.id });
  }
  const hasChecked = isAfterString(
    suggestion?.updated_at,
    suggestion?.users?.[0]?.updated_at
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
            <Title16 numberOfLines={1}>{suggestion.title}</Title16>
            {hasChecked && <DotRed8 style={{ marginLeft: 4 }} />}
          </ViewRow>
          <ViewRow style={{ justifyContent: "flex-start" }}>
            <Image source={iconUserGrey} style={{ marginRight: 8 }} />
            <Grey12>{suggestion.createdBy.name}</Grey12>
            {votedByMe && (
              <>
                <Grey12>{", "}</Grey12>
                <Blue12>동의함</Blue12>
              </>
            )}
            <SmallVerticalDivider />
            <Image
              source={iconComment}
              style={{ marginRight: 8, marginLeft: 6 }}
            />
            <Grey12>{suggestion.comments_aggregate.aggregate.count}</Grey12>
            {/* {suggestion.closed_at && <Text>{suggestion.closed_at}</Text>} */}
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
