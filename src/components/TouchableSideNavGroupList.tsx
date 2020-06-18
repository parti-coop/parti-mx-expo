import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { White16 } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import ViewGroupImg from "./ViewGroupImg";
import ViewNewRed from "./ViewNewRed";

import { useStore } from "../Store";
import { isAfterString } from "../Utils/CalculateDays";
import { updateUserGroupCheck } from "../graphql/mutation";
import { UserGroup } from "../types";
export default function TouchableSideNavGroupList(props: {
  usersGroup: UserGroup;
  navigate: (route: string) => void;
}) {
  const [{ user_id }, dispatch] = useStore();
  const { group, updated_at } = props.usersGroup;
  const isNew = isAfterString(group.last_posted_at, updated_at);
  const [update] = useMutation(updateUserGroupCheck);
  function goToGroup(group_id: number) {
    dispatch({ type: "SET_GROUP", group_id });
    props.navigate("Home");
    update({ variables: { group_id, user_id } });
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
      onPress={() => goToGroup(group.id)}
    >
      <ViewGroupImg />
      <White16 numberOfLines={1} style={{ flex: 1, marginLeft: 12 }}>
        {group.title}
      </White16>
      {isNew && <ViewNewRed />}
    </TouchableOpacity>
  );
}
