import React from "react";
import { ViewStyle, StyleProp, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { useMutation } from "@apollo/react-hooks";

import { View, ViewRow, ViewColumnCenter } from "./View";
import { Text, Grey12 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";

import { updateUserBoardCheck } from "../graphql/mutation";
import { useStore } from "../Store";
import { calculateDays } from "../Utils/CalculateDays";

import iconSympathy from "../../assets/iconSympathy.png";
import iconComment from "../../assets/iconComment.png";
import iconUser from "../../assets/iconUser.png";
type Suggestion = {
  id: number;
  title: string;
  body: string;
  closed_at: string;
  created_at: string;
  votes_aggregate: {
    aggregate: {
      sum: {
        count: number;
      };
    };
  };
  votes: Array<{ count: number }>;
  updatedBy: {
    name: string;
  };
  comments_aggregate: {
    aggregate: {
      count: number;
    };
  };
};
export default (props: {
  suggestion: Suggestion;
  style?: StyleProp<ViewStyle>;
}) => {
  const { navigate } = useNavigation();
  const { suggestion, style } = props;
  const [{ user_id }] = useStore();
  const [update, { data }] = useMutation(updateUserBoardCheck, {
    variables: { user_id, board_id: suggestion.id }
  });
  const voteCount = suggestion.votes_aggregate.aggregate.sum.count;
  const votedByMe =
    suggestion.votes.length > 0 && suggestion.votes[0].count > 0;
  const daysLeft = calculateDays(suggestion.created_at);
  return (
    <TouchableOpacity
      onPress={e =>
        navigate("SuggestionDetail", {
          suggestionId: suggestion.id
        })
      }
    >
      <ViewRow style={{ justifyContent: "flex-start" }}>
        <ViewColumnCenter
          style={{
            width: 54,
            height: 54,
            borderRadius: 22.2,
            backgroundColor: "#ffffff",
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "#30ad9f",
            margin: 15,
            flex: 0
          }}
        >
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "#4a9f95",
              fontFamily: "notosans900",
              lineHeight: 17
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
              lineHeight: 15
            }}
          >
            {daysLeft}
          </Text>
        </ViewColumnCenter>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: "left",
              color: "#333333"
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
            <View
              style={{
                width: 1,
                height: 11,
                backgroundColor: "#dedede",
                marginHorizontal: 4
              }}
            ></View>
            <Image
              source={iconComment}
              style={{ marginRight: 8, marginLeft: 6 }}
            />
            <Grey12>{suggestion.comments_aggregate.aggregate.count}</Grey12>
            {/* {suggestion.closed_at && <Text>{suggestion.closed_at}</Text>} */}
          </ViewRow>
        </View>
        <ViewColumnCenter
          style={{
            width: 35,
            height: 35,
            borderRadius: 15,
            backgroundColor: "#f35f5f",
            position: "absolute",
            right: -15
          }}
        >
          <Image source={iconSympathy} />
          <Text style={{ fontSize: 11, textAlign: "center", color: "#ffffff" }}>
            {voteCount || 0}
          </Text>
        </ViewColumnCenter>
      </ViewRow>
    </TouchableOpacity>
  );
};
