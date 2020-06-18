import React from "react";

import { White16 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import ViewGroupImg from "./ViewGroupImg";
import ViewNewRed from "./ViewNewRed";

import { isAfterString } from "../Utils/CalculateDays";
import { UserGroup } from "../types";
export default function TouchableSideNavGroupList(props: {
  usersGroup: UserGroup;
  onPress: (group_id: number) => void;
}) {
  const { group, updated_at, group_id } = props.usersGroup;
  const isNew = isAfterString(group.last_posted_at, updated_at);
  function goToGroup() {
    props.onPress(group_id);
  }
  return (
    <TouchableOpacity
      style={{
        height: 53,
        borderRadius: 25,
        backgroundColor: "#007d61",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 11,
        paddingLeft: 8,
        paddingRight: 15,
      }}
      onPress={goToGroup}
    >
      <ViewGroupImg />
      <White16 numberOfLines={1} style={{ flex: 1, marginLeft: 12 }}>
        {group.title}
      </White16>
      {isNew && <ViewNewRed />}
    </TouchableOpacity>
  );
}
