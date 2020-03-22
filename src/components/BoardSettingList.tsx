import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, ViewRow } from "./View";
import { Text } from "./Text";
import { useMutation } from "@apollo/react-hooks";
import { updateBoardPermission } from "../graphql/mutation";
import { useStore } from "../Store";
import { useDebouncedCallback } from "use-debounce";
import RNPickerSelect from "react-native-picker-select";
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
const options = [
  { value: false, label: "전체공개" },
  { value: true, label: "멤버공개" }
];
export default (props: { board: Board; style?: StyleProp<ViewStyle> }) => {
  const { navigate } = useNavigation();
  const { board, style } = props;
  const [isMemberOnly, setMemberOnly] = React.useState(board.is_member_only);
  const [{ user_id }] = useStore();
  const [update, { error, data }] = useMutation(updateBoardPermission);
  console.log(error, data);
  function valueChangeHandler(value: boolean) {
    setMemberOnly(value);
    debouncedCallback();
  }
  const [debouncedCallback] = useDebouncedCallback(function() {
    update({
      variables: { user_id, board_id: board.id, is_member_only: isMemberOnly }
    });
  }, 1000);
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
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: "#cb6794",
              borderRadius: 10,
              padding: 1,
              marginLeft: 10
            }}
          >
            <RNPickerSelect
              onValueChange={valueChangeHandler}
              items={options}
              value={isMemberOnly}
              textInputProps={{ style: { fontSize: 12, color: "#cb6794" } }}
              style={{ fontSize: 12, color: "#cb6794" }}
              placeholder={{}}
            />
          </View>
        </ViewRow>
        <Text style={{ fontSize: 14, color: "#888888" }}>{board.body}</Text>
      </View>
    </View>
  );
};
