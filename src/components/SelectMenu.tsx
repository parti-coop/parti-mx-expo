import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import Modal from "react-native-modal";

import { Image } from "./Image";
import { View } from "./View";
import { White15 } from "./Text";
import { TouchableOpacity, TO0 } from "./TouchableOpacity";
import { mintBg } from "./Styles";

import btnDetailMore from "../../assets/btnDetailMore.png";
const boxStyle: StyleProp<ViewStyle> = {
  ...(mintBg as Object),
  width: 182,
  paddingVertical: 5,
  borderTopRightRadius: 0,
  position: "absolute",
};
let hideHandler = () => {};
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
    hideHandler = () => setTimeout(() => item.handler(item?.value), 1);
  }
  function openModal() {
    btnRef.current.measure(
      (x, y, width, height: number, pageX: number, pageY: number) =>
        setLayout({
          top: pageY + height / 2 - 3.0,
          left: pageX - 182 + width / 2 - 2.8,
        })
    );
    setVisible(true);
  }
  function backdropPressHandler() {
    hideHandler = () => {};
    setVisible(false);
  }
  return (
    <>
      <View
        style={[
          {
            flexGrow: 1,
            alignItems: "flex-end",
            zIndex: 1,
            // backgroundColor: "blue",
            // overflow: "hidden",
          },
          style,
        ]}
      >
        <TO0
          onPress={openModal}
          style={{
            borderTopEndRadius: 5,
            borderTopStartRadius: 5,
            width: 36,
            height: 35,
            zIndex: 2,
            backgroundColor: isVisible ? "#12BD8E" : "#ffffff",
          }}
          ref={btnRef}
        >
          <Image
            source={btnDetailMore}
            style={isVisible && { tintColor: "white" }}
          />
        </TO0>
      </View>
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0}
        onBackdropPress={backdropPressHandler}
        onModalHide={hideHandler}
      >
        <View style={[boxStyle, layout]}>
          {items.map((item, i) => {
            function pressHandler() {
              changeHandler(item);
            }
            return (
              <TouchableOpacity
                key={i}
                onPress={pressHandler}
                style={{ paddingHorizontal: 25 }}
              >
                <White15 style={{ marginVertical: 12 }}>{item.label}</White15>
                {i !== items.length - 1 && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#2ea497",
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </>
  );
};
