import React from "react";
import { White16 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { Group } from "../types";
import ViewGroupImg from "./ViewGroupImg";
export default function TouchableSideNavGroupSearchList(props: {
  group: Group;
  onPress: (group_id: number) => void;
}) {
  const { title, id } = props.group;
  function goToGroup() {
    props.onPress(id);
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
        {title}
      </White16>
    </TouchableOpacity>
  );
}
