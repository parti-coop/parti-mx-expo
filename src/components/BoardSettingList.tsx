import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, ViewRow } from "./View";
import { Text } from "./Text";
import ViewRedDot from "./ViewRedDot";
import { TouchableOpacity } from "./TouchableOpacity";
import { useMutation } from "@apollo/react-hooks";
import {} from "../graphql/mutation";
import { useStore } from "../Store";
type Board = {
  id: number;
  title: string;
  body: string;
  is_member_only: boolean;
  type: string;
  updated_at: string;
  last_posted_at: string;
  usersBoardCheck: Array<{ updated_at: string }>;
};
export default (props: { board: Board; style?: StyleProp<ViewStyle> }) => {
  const { navigate } = useNavigation();
  const { board, style } = props;
  const [{ user_id }] = useStore();

  return (
    <View
      style={{
        height: 83,
        backgroundColor: "#ffffff",
        marginBottom: 10,
        borderRadius: 25,
        ...(style as Object)
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginLeft: 30,
          marginRight: 50
        }}
      >
        <ViewRow style={{ justifyContent: "flex-start" }}>
          <Text style={{ fontSize: 18 }}>{board.title}</Text>
          <TouchableOpacity>
            <Text
              style={{
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#cb6794",
                borderRadius: 10,
                fontSize: 12,
                padding: 1,
                color: "#cb6794",
                marginLeft: 10
              }}
            >
              {board.is_member_only ? "맴버공개" : "전체공개"}
            </Text>
          </TouchableOpacity>
        </ViewRow>
        <Text style={{ fontSize: 14, color: "#888888" }}>{board.body}</Text>
      </View>
    </View>
  );
};
