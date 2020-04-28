import React from "react";
import { ViewStyle, StyleProp, TextStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

import { Image } from "./Image";
import { View } from "./View";
import { White15 } from "./Text";
import { TouchableOpacity, TOCenter } from "./TouchableOpacity";

import btnDetailMore from "../../assets/btnDetailMore.png";

const boxStyle: StyleProp<ViewStyle> = {
  width: 182,
  // height: 197,
  backgroundColor: "#30ad9f",
  shadowColor: "rgba(0, 0, 0, 0.32)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 5,
  shadowOpacity: 1,
  // paddingHorizontal: 25,
  paddingVertical: 5,
  left: 0,
  borderRadius: 25,
  borderTopRightRadius: 0,
};
export default (props: { style?: StyleProp<ViewStyle>; items: Array<any> }) => {
  const [isVisible, setVisible] = React.useState(false);
  const { items, style } = props;
  function changeHandler(item: {
    label: string;
    value?: any;
    handler: (value?: any) => any;
  }) {
    setVisible(false);
    item.handler(item?.value);
  }
  return (
    <View
      style={[
        {
          flex: 1,
          // position: "absolute",
          // top: 39,
          // right: 31,
          alignItems: "flex-end",
          // zIndex: 1,
        },
        style,
      ]}
    >
      <TOCenter
        onPress={() => setVisible(!isVisible)}
        style={{
          borderTopEndRadius: 5,
          borderTopStartRadius: 5,
          width: 36,
          height: 35,
          backgroundColor: isVisible ? "#30ad9f" : "#ffffff",
          // position: "relative",
          // zIndex: 2,
        }}
      >
        <Image
          source={btnDetailMore}
          style={isVisible && { tintColor: "white" }}
        />
      </TOCenter>
      {isVisible && (
        <View style={[boxStyle]}>
          {items.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={(e) => changeHandler(item)}
              style={{ paddingHorizontal: 25 }}
            >
              <White15 style={{ marginVertical: 12 }}>{item.label}</White15>
              {i !== items.length - 1 && (
                <View
                  style={{ width: 131, height: 1, backgroundColor: "#2ea497" }}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
