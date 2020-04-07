import React from "react";
import UserProfileNameDate from "../components/UserProfileNameDate";
import { View, ViewRow, V0 } from "./View";
import { Body16 } from "./Text";
export default (props: {
  voteUsers: Array<{
    name: string;
    created_at: string;
    photo_url: string;
  }>;
}) => {
  const { voteUsers } = props;
  return (
    <View
      style={{ borderRadius: 25, backgroundColor: "#ffffff", marginBottom: 50 }}
    >
      {voteUsers.length > 0 ? (
        <ViewRow style={{ padding: 30 }}>
          {voteUsers.map((u, i: number) => (
            <UserProfileNameDate
              name={u.name}
              key={i}
              date={u.created_at}
              photoUrl={u.photo_url}
            />
          ))}
        </ViewRow>
      ) : (
        <V0 style={{ padding: 50 }}>
          <Body16>아직 제안동의가 없습니다</Body16>
        </V0>
      )}
    </View>
  );
};
