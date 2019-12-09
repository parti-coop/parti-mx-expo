import React from "react";
import { View } from "./View";
import { Text } from "./Text";
import { ActivityIndicator } from "react-native";
export default () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>로딩중입니다.</Text>
    </View>
  );
};
