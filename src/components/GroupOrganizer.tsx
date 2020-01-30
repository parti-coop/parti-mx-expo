import React from "react";
import { NavigationSwitchScreenProps } from "react-navigation";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "./Text";

import { ViewRowLeft, ViewColumnCenter } from "./View";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { searchOrganizer } from "../graphql/query";
export default (props: { searchKeyword: string }) => {
  const { searchKeyword } = props;
  const [{ group_id }, dispatch] = useStore();
  const { data, loading } = useQuery(searchOrganizer, {
    variables: { searchKeyword: `%${searchKeyword}%`, group_id }
  });
  const list =
    data &&
    data.parti_2020_users_group.map(
      (
        u: { user: { name: string; email: string }; status: string },
        i: number
      ) => {
        return (
          <ViewRowLeft key={i}>
            <Ionicons name="ios-arrow-back" size={60} />
            <ViewColumnCenter>
              <Text>{u.user.name}</Text>
              <Text>{u.user.email}</Text>
            </ViewColumnCenter>
            <Feather name="more-horizontal" />
          </ViewRowLeft>
        );
      }
    );
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return <ScrollView>{list}</ScrollView>;
};
