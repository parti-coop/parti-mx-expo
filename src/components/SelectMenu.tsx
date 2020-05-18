import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import Modal from "react-native-modal";

import { Image } from "./Image";
import { View } from "./View";
import { White15 } from "./Text";
import { TouchableOpacity, TOCenter } from "./TouchableOpacity";

import btnDetailMore from "../../assets/btnDetailMore.png";

const boxStyle: StyleProp<ViewStyle> = {
  width: 182,
  backgroundColor: "#12BD8E",
  shadowColor: "rgba(0, 0, 0, 0.32)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 5,
  shadowOpacity: 1,
  paddingVertical: 5,
  borderRadius: 25,
  borderTopRightRadius: 0,
  position: "absolute",
};
export default (props: { style?: StyleProp<ViewStyle>; items: Array<any> }) => {
  const { items, style } = props;
  const [isVisible, setVisible] = React.useState(false);
  const [layout, setLayout] = React.useState({
    top: 0,
    left: 0,
  });
  const btnRef = React.useRef(null);
  function changeHandler(item: {
    label: string;
    value?: any;
    handler: (value?: any) => any;
  }) {
    setVisible(false);
    item.handler(item?.value);
  }
  function openModal() {
    btnRef.current.measure(
      (x, y, width, height: number, pageX: number, pageY: number) =>
        setLayout({
          top: pageY + height / 2 - 1,
          left: pageX - 182 + width / 2 - 1,
        })
    );
    setVisible(true);
  }
  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: "flex-end",
          zIndex: 1,
        },
        style,
      ]}
    >
      <TOCenter
        onPress={openModal}
        style={{
          borderTopEndRadius: 5,
          borderTopStartRadius: 5,
          width: 36,
          height: 35,
          backgroundColor: isVisible ? "#12BD8E" : "#ffffff",
        }}
        ref={btnRef}
      >
        <Image
          source={btnDetailMore}
          style={isVisible && { tintColor: "white" }}
        />
      </TOCenter>
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0}
        onBackdropPress={() => setVisible(false)}
      >
        <View style={[boxStyle, layout]}>
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
      </Modal>
    </View>
  );
};
