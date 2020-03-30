import React from "react";
import UserProfileWithName from "../components/UserProfileWithName";
import { View, ViewRow, ViewColumnCenter } from "./View";
import { Text, Body16 } from "./Text";
export default (props: {
  voteUsers: Array<{
    name: string;
  }>;
}) => {
  const { voteUsers } = props;
  return (
    <View>
      {voteUsers.length > 0 ? (
        <ViewRow>
          {voteUsers.map((u: any, i: number) => (
            <UserProfileWithName name={u} key={i} />
          ))}
        </ViewRow>
      ) : (
        <ViewColumnCenter
          style={{
            padding: 50,
            borderRadius: 25,
            backgroundColor: "#ffffff",
            marginBottom: 50
          }}
        >
          <Body16>아직 제안동의가 없습니다</Body16>
        </ViewColumnCenter>
      )}
    </View>
  );
};
