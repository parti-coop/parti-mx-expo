import React from "react";
import UserProfileNameDate from "./UserProfileNameDate";
import { View, ViewRow, V0 } from "./View";
import { Body16 } from "./Text";
export default function EventParticipants(props: {
  users: Array<{
    name: string;
    created_at: string;
    photo_url: string;
  }>;
}) {
  const { users } = props;
  return (
    <View
      style={{ borderRadius: 25, backgroundColor: "#ffffff", marginBottom: 50 }}
    >
      {users.length > 0 ? (
        <ViewRow
          style={{
            padding: 20,
            flexWrap: "wrap",
          }}
        >
          {users.map((u, i: number) => (
            <UserProfileNameDate
              name={u.name}
              key={i}
              date={u.created_at}
              photoUrl={u.photo_url}
              style={{ padding: 10 }}
            />
          ))}
        </ViewRow>
      ) : (
        <V0 style={{ padding: 50 }}>
          <Body16>아직 참여자가 없습니다</Body16>
        </V0>
      )}
    </View>
  );
}
