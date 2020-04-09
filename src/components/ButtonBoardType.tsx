import React from "react";
import { ViewStyle, StyleProp, Image } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { View, ViewRow } from "./View";
import { TORow, TouchableOpacity } from "./TouchableOpacity";
import { Mint15, Title14, Title15 } from "./Text";

import { updateBoardPermission } from "../graphql/mutation";
import { useStore } from "../Store";

import selectbox from "../../assets/selectbox.png";
import iconSelected from "../../assets/iconSelected.png";
const boxStyle: StyleProp<ViewStyle> = {
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.32)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 5,
  shadowOpacity: 1,
  borderRadius: 25,
  borderTopLeftRadius: 0,
  width: 207,
  position: "absolute",
  left: 50,
  zIndex: 1,
};

const options = [
  { value: false, label: "전체" },
  { value: true, label: "멤버" },
];
export default (props: {
  boardId: number;
  style?: StyleProp<ViewStyle>;
  is_member_only: boolean;
}) => {
  const { boardId, style, is_member_only } = props;
  const [isVisible, setVisible] = React.useState(false);
  const [isMemberOnly, setMemberOnly] = React.useState(is_member_only);
  const [{ user_id }] = useStore();
  const [update, { error, data }] = useMutation(updateBoardPermission);
  const boardType = options.find((o) => o.value === isMemberOnly).label;
  function valueChangeHandler(value: boolean) {
    setMemberOnly(value);
    setVisible(false);
    debouncedCallback();
  }
  const [debouncedCallback] = useDebouncedCallback(async function () {
    const {
      data: {
        update_parti_2020_boards: { affected_rows },
      },
    } = await update({
      variables: { user_id, board_id: boardId, is_member_only: isMemberOnly },
    });
    if (affected_rows === 1) {
      showMessage({ type: "success", message: "수정 성공" });
    }
  }, 1000);
  return (
    <>
      <TORow
        style={[{ width: 70 }, style]}
        onPress={() => setVisible(!isVisible)}
      >
        <Title14 style={{ flex: 1 }}>{boardType}</Title14>
        <Image source={selectbox} />
      </TORow>
      {isVisible && (
        <View style={[boxStyle]}>
          {options.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={(e) => valueChangeHandler(item.value)}
              style={{ paddingHorizontal: 25 }}
            >
              <ViewRow style={{ paddingVertical: 15 }}>
                {item.value === isMemberOnly ? (
                  <Mint15 style={{ flex: 1 }}>{item.label}</Mint15>
                ) : (
                  <Title15 style={{ flex: 1 }}>{item.label}</Title15>
                )}
                {item.value === isMemberOnly && (
                  <Image source={iconSelected} style={{ marginLeft: 10 }} />
                )}
              </ViewRow>
              {i !== options.length - 1 && (
                <View style={{ height: 1, backgroundColor: "#e4e4e4" }} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};
