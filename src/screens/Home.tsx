import React from "react";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
import { View, Text, Button } from "react-native";
export default (props: NavigationDrawerScreenProps<{ name: string }>) => {
  const { navigate } = props.navigation;
  return (
    <View style={{ flex: 1 }}>
      <Text>Home Screen</Text>
      <Text>가자!!</Text>
      <Text style={{ flex: 1 }}>{props.navigation.getParam("name")}</Text>
      <Button
        title="Go to Jane's Detail"
        onPress={() => navigate("Detail", { name: "Jane" })}
      />
    </View>
  );
};
