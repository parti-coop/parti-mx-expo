import React, { ReactComponentElement } from "react";
import { View, ViewRound, ViewRow } from "./View";
import { Text } from "./Text";
export default (props: React.PropsWithoutRef<{ name: string }>) => {
  return (
    <ViewRow>
      <ViewRound
        style={{
          backgroundColor: "red"
        }}
      >
        <Text>{props.name[0]}</Text>
      </ViewRound>
      <View>
        <Text>{props.name}</Text>
      </View>
    </ViewRow>
  );
};
