import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";

import { Image } from "./Image";
import { V1, ViewRow, V0 } from "./View";
import { Text, Grey12 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { SmallVerticalDivider } from "./LineDivider";
import ViewLikeCount from "./ViewLikeCount";

import { updateUserBoardCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { calculateDays } from "../Utils/CalculateDays";
import { Suggestion } from "../types";

import iconSympathy from "../../assets/iconSympathy.png";
import iconComment from "../../assets/iconComment.png";
import iconUser from "../../assets/iconUser.png";

export default (props: {
  suggestion: Suggestion;
  style?: StyleProp<ViewStyle>;
}) => {
  const { navigate } = useNavigation();
  const { suggestion, style } = props;
  const [{ user_id }] = useStore();
  const [update, { data }] = useMutation(updateUserBoardCheck, {
    variables: { user_id, board_id: suggestion.id },
  });
  const voteCount =
    suggestion?.users_aggregate?.aggregate?.sum?.like_count ?? 0;
  const votedByMe =
    suggestion.users.length > 0 && suggestion.users[0].like_count > 0;
  const daysLeft = calculateDays(suggestion.created_at);

  return (
    <TouchableOpacity
      onPress={(e) =>
        navigate("SuggestionDetail", {
          postId: suggestion.id,
        })
      }
    >
      <ViewRow style={{ justifyContent: "flex-start" }}>
        <V0
          style={{
            width: 54,
            height: 54,
            borderRadius: 22.2,
            backgroundColor: "#ffffff",
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "#30ad9f",
            margin: 15,
            flex: 0,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "#4a9f95",
              fontFamily: "notosans900",
              lineHeight: 17,
            }}
          >
            D
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "left",
              color: "#4a9f95",
              fontFamily: "notosans900",
              lineHeight: 15,
            }}
          >
            {daysLeft}
          </Text>
        </V0>
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
          <Text
            style={{
              fontSize: 16,
              textAlign: "left",
              color: "#333333",
            }}
          >
            {suggestion.title}
          </Text>
          <ViewRow style={{ justifyContent: "flex-start" }}>
            <Image source={iconUser} style={{ marginRight: 8 }} />
            <Grey12>{suggestion.updatedBy.name}</Grey12>
            <Text style={{ fontSize: 12, textAlign: "left", color: "#4b93dc" }}>
              {votedByMe && ", 동의함"}
            </Text>
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
};
