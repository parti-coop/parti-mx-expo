import React from "react";
import { View } from "./View";
import { Text } from "./Text";
import { ActivityIndicator } from "react-native";
// import { useStore } from "../Store";
export default () => {
  // const [store] = useStore();
  // // console.log(store);
  // if (!store.isLoading) {
  //   return null;
  // }
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "absolute"
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>로딩중입니다.</Text>
    </View>
  );
};
