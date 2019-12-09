import React from "react";
import QRCode from "react-native-qrcode";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { useStore } from "../Store";
import { View, ViewColumnCenter } from "../components/View";
import { Button } from "../components/Button";

export default (props: NavigationStackScreenProps) => {
  const [store] = useStore();
  return (
    <ViewColumnCenter>
      <QRCode
        value={{ user: "swain@parti.xyz", group_id: 1 }}
        size={200}
        bgColor="purple"
        fgColor="white"
      />
      <Button
        color="darkblue"
        title="뒤로가기 "
        onPress={() => props.navigation.navigate("Home")}
      />
    </ViewColumnCenter>
  );
};
