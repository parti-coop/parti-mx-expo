import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { View, ViewRow, ViewColumnCenter } from "./View";
import { Text } from "./Text";
import ViewRedDot from "./ViewRedDot";
import { TouchableOpacity } from "./TouchableOpacity";
import { useMutation } from "@apollo/react-hooks";
import {
  updateUserBoardCheck,
  insertUserBoardCheck
} from "../graphql/mutation";
import { useStore } from "../Store";
type Suggestion = {
  id: number;
  title: string;
  body: string;
  closed_at: string;
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
  // const [insert] = useMutation(insertUserBoardCheck, {
  //   variables: { user_id, board_id: suggestion.id }
  // });
  const voteCount = suggestion.votes_aggregate.aggregate.sum.count;
  const votedByMe =
    suggestion.votes.length > 0 && suggestion.votes[0].count > 0;
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
            -29
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
            <Text style={{ fontSize: 12, textAlign: "left", color: "#909090" }}>
              {suggestion.updatedBy.name}
            </Text>
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
            <Text style={{ fontSize: 12, textAlign: "left", color: "#909090" }}>
              {suggestion.comments_aggregate.aggregate.count}
            </Text>
            {/* {suggestion.closed_at && <Text>{suggestion.closed_at}</Text>} */}
          </ViewRow>
        </View>
        <ViewColumnCenter
          style={{
            width: 35,
            height: 35,
            borderRadius: 15,
            backgroundColor: "#f35f5f",
            position:"absolute",
            right: -15
          }}
        >
          <EvilIcons name="heart" color="white" />
          <Text style={{ fontSize: 11, textAlign: "center", color: "#ffffff" }}>
            {voteCount}
          </Text>
        </ViewColumnCenter>
      </ViewRow>
    </TouchableOpacity>
  );
};
