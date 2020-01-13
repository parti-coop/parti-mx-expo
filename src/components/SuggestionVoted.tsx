import React from "react";
import UserProfileWithName from "../components/UserProfileWithName";
import { View, ViewRowLeft } from "./View";
import { Text } from "./Text";
export default (props: React.PropsWithoutRef<{ voteUsers: any[] }>) => {
  return (
    <View>
      <Text>동의 {props.voteUsers.length}</Text>
      <ViewRowLeft>
        {props.voteUsers.map((u: any, i: number) => (
          <UserProfileWithName name={u} key={i} />
        ))}
      </ViewRowLeft>
    </View>
  );
};
