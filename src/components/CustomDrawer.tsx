import React from "react";
import { Updates } from "expo";
import { ScrollView, SafeAreaView, Picker } from "react-native";
import { DrawerContentComponentProps } from "react-navigation-drawer";
import { View } from "./View";
import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { Ionicons } from "@expo/vector-icons";
import { ViewRow } from "./View";
import { useSubscription } from "@apollo/react-hooks";
import { subscribeGroupsByUserId } from "../graphql/subscription";
import { useStore } from "../Store";

export default (props: DrawerContentComponentProps) => {
  const [{ user_id }, dispatch] = useStore();
  const { loading, data } = useSubscription(subscribeGroupsByUserId, {
    variables: { user_id }
  });
  const [group_id, setGroupId] = React.useState<any>(0);
  React.useEffect(() => {
    dispatch({ type: "SET_GROUP", group_id });
    props.navigation.navigate("Home", { group_id });
    props.navigation.closeDrawer();
  }, [group_id]);
  function pickerChangeHandler(group_id: number, i: number) {
    setGroupId(group_id);
  }
  React.useEffect(() => {
    if (!loading && data.parti_2020_users_group.length === 0) {
      props.navigation.navigate("GroupNew");
    }
  }, [loading, data]);

  const dropdownGroups = !loading && (
    <Picker
      selectedValue={group_id}
      style={{ height: 50, width: 200 }}
      onValueChange={pickerChangeHandler}
    >
      {data.parti_2020_users_group.map(
        (g: { group: { title: string; id: number } }, i: number) => {
          return (
            <Picker.Item label={g.group.title} value={g.group.id} key={i} />
          );
        }
      )}
    </Picker>
  );
  function closeDrawer() {
    props.navigation.closeDrawer();
  }
  function refreshApp() {
    dispatch({ type: "APP_REFRESH" });
    Updates.reload();
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "floralwhite" }}>
        <ViewRow
          style={{
            justifyContent: "flex-start",
            backgroundColor: "darkgoldenrod"
          }}
        >
          <TouchableOpacity
            style={{ width: 50, padding: 10 }}
            onPress={closeDrawer}
          >
            <Ionicons name="ios-arrow-back" size={60} />
          </TouchableOpacity>
          {dropdownGroups}
        </ViewRow>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: "forestgreen" }}
          onPress={refreshApp}
        >
          <Text>앱 새로고침</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};
