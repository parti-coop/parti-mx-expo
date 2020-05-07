import React from "react";
import { TO0 } from "../components/TouchableOpacity";
import { V0 } from "../components/View";
import COLORS from "./Colors";
export default function ToggleBox(props: {
  value: boolean;
  changeHandler: (on: boolean) => void;
}) {
  const { changeHandler = () => {}, value = false } = props;
  function toggleHandler() {
    changeHandler(!value);
  }
  return (
    <TO0
      onPress={toggleHandler}
      style={{
        width: 50,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: "#ebebeb",
        alignItems: value ? "flex-end" : "flex-start",
      }}
    >
      <V0
        style={{
          width: 25,
          height: 25,
          borderRadius: 12.5,
          backgroundColor: value ? COLORS.MINT : "#bebebe",
        }}
      ></V0>
    </TO0>
  );
}
