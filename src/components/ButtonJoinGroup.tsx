import React from "react";

import { Text } from "./Text";
import { TO0 } from "./TouchableOpacity";
import { View } from "./View";
import useGroupJoin from "./useGroupJoin";

export default (props: { title: string }) => {
  const { title } = props;
  const joinGroup = useGroupJoin();
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#30ad9f",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 113,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 41,
        bottom: 0,
        position:"absolute"
      }}
    >
      <Text style={{ fontSize: 16, color: "#ffffff" }}>
        {title}에 가입합니다.
      </Text>
      <TO0
        onPress={joinGroup}
        style={{
          marginTop: 16,
          width: 104,
          height: 35,
          borderRadius: 17.5,
          backgroundColor: "#ffec83"
        }}
      >
        <Text style={{ color: "#333333", fontSize: 16, textAlign: "center" }}>
          가입
        </Text>
      </TO0>
    </View>
  );
};
