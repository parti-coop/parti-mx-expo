import React from "react";
import { ViewStyle, StyleProp, TextStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { View, ViewRow, ViewColumnCenter } from "./View";
import { Text } from "./Text";
import ViewRedDot from "./ViewRedDot";
import { TouchableOpacity } from "./TouchableOpacity";
import { useMutation } from "@apollo/react-hooks";
const textStyle: StyleProp<TextStyle> = {
  fontSize: 16,
  textAlign: "left",
  color: "#555555",
  paddingVertical: 24
};
const boxStyle: StyleProp<ViewStyle> = {
  width: 207,
  height: 224,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.32)",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowRadius: 5,
  shadowOpacity: 1,
  paddingHorizontal: 25,
  position: "absolute",
  right: 30,
  top: 20,
  borderRadius: 25,
  borderTopRightRadius: 0,
  zIndex: 5
};
export default (props: {
  style?: StyleProp<ViewStyle>;
  value: number;
  onChange: (value: number) => void;
  items: Array<{ value: number; label: string }>;
}) => {
  const { items, value, onChange } = props;
  const currentItem = items.find(i => i.value === value);
  const [isVisible, setVisible] = React.useState(false);
  function changeHandler(value: number) {
    onChange(value);
    setVisible(false);
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(!isVisible)}
        style={{ flex: 1 }}
      >
        <Text style={[textStyle]}>{currentItem.label}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={[boxStyle]}>
          {items.map((item, i) => (
            <TouchableOpacity key={i} onPress={e => changeHandler(item.value)}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};
