import React from "react";
// import QRCode from "react-native-qrcode-svg";
import { StackHeaderProps } from "@react-navigation/stack";
import { useStore } from "../Store";
import { View, V0 } from "../components/View";
import { Button } from "../components/Button";

export default (props: StackHeaderProps) => {
  const [store] = useStore();
  return (
    <V0>
      {/* <QRCode value="http://awesome.link.qr" size={200} /> */}
      <Button
        color="darkblue"
        title="뒤로가기 "
        onPress={() => props.navigation.navigate("Home")}
      />
    </V0>
  );
};
