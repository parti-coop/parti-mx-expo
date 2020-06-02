import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import Modal from "react-native-modal";
import { useMutation } from "@apollo/react-hooks";

import { Image } from "./Image";
import { View } from "./View";
import { White15 } from "./Text";
import { mintBg } from "./Styles";
import COLORS from "./Colors";
import { useStore } from "../Store";
import { NotificationType } from "../types";
import { TO0, TORow } from "./TouchableOpacity";
import { notificationOptions } from "./notificationTypes";
import useNotification from "./useNotification";

import { updateUserGroupNotification } from "../graphql/mutation";
import iconNotification from "../../assets/iconNotification.png";
import iconSelected from "../../assets/iconSelected.png";

const boxStyle: StyleProp<ViewStyle> = {
  ...(mintBg as Object),
  width: 222,
  paddingVertical: 5,
  borderTopLeftRadius: 0,
  position: "absolute",
};

export default function ViewNotification(props: {
  style?: ViewStyle;
  type: NotificationType;
}) {
  const { style, type } = props;
  const [isVisible, setVisible] = React.useState(false);
  const [{ group_id, user_id }, dispatch] = useStore();
  const [pushToken] = useNotification();
  const [update, { loading, error }] = useMutation(updateUserGroupNotification);
  if (error) {
    console.log(error);
  }

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  const [layout, setLayout] = React.useState({
    top: 0,
    left: 0,
  });
  const btnRef = React.useRef(null);
  function changeHandler(value: string) {
    setVisible(false);
    update({ variables: { group_id, user_id, notification_type: value } });
    pushToken();
  }
  function openModal() {
    btnRef.current.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) =>
        setLayout({
          top: pageY + height / 2 - 3.5,
          left: pageX - width / 2 - 3.2,
        })
    );
    setVisible(true);
  }
  function backdropPressHandler() {
    setVisible(false);
  }

  return (
    <>
      <TO0
        onPress={openModal}
        ref={btnRef}
        style={[
          {
            width: 35,
            height: 35,
            backgroundColor: COLORS.MINT,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 8,
            marginRight: 12,
            borderBottomLeftRadius: isVisible ? 0 : 15,
            borderBottomRightRadius: isVisible ? 0 : 15,
          },
          style,
        ]}
      >
        <Image
          style={{ width: 17, height: 18 }}
          resizeMode="contain"
          source={iconNotification}
        />
      </TO0>
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0}
        onBackdropPress={backdropPressHandler}
      >
        <View style={[boxStyle, layout]}>
          {notificationOptions.map((item, i) => {
            function pressHandler() {
              changeHandler(item.value);
            }
            return (
              <View key={i} style={{ paddingHorizontal: 25 }}>
                <TORow onPress={pressHandler}>
                  <White15
                    style={{
                      marginVertical: 12,
                      flex: 1,
                      color: item.value === type ? "#135254" : "#ffffff",
                    }}
                  >
                    {item.label}
                  </White15>
                  {item.value === type && (
                    <Image
                      source={iconSelected}
                      style={{ marginLeft: 10, tintColor: "#135254" }}
                    />
                  )}
                </TORow>
                {i !== notificationOptions.length - 1 && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#2ea497",
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>
      </Modal>
    </>
  );
}
