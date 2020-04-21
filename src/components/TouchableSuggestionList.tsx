import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";

import { Image } from "./Image";
import { View, ViewRow, V0 } from "./View";
import { Text, Grey12 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { SmallVerticalDivider } from "./LineDivider";

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
  const voteCount = suggestion.likes_aggregate.aggregate.sum.count;
  const votedByMe =
    suggestion.likes.length > 0 && suggestion.likes[0].count > 0;
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
        <View style={{ flex: 1 }}>
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
        </View>
        <V0
          style={{
            width: 35,
            height: 35,
            borderRadius: 15,
            backgroundColor: "#f35f5f",
            position: "absolute",
            right: -15,
          }}
        >
          <Image source={iconSympathy} />
          <Text style={{ fontSize: 11, textAlign: "center", color: "#ffffff" }}>
            {voteCount || 0}
          </Text>
        </V0>
      </ViewRow>
    </TouchableOpacity>
  );
};
