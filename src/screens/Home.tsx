import React from "react";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
import { View } from "../components/View";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { Image } from "react-native";
import icon from "../../assets/icon.png";
export default (props: NavigationDrawerScreenProps<{ name: string }>) => {
  const { navigate } = props.navigation;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={icon} style={{ width: 200, height: 200 }} />
      <Text>Parti-2020에 오신것을 환영합니다.</Text>
      <Button title="2020 제안 " onPress={() => navigate("Suggestions")} />
    </View>
  );
};
