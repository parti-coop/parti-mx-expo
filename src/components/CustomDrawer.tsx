import React from "react";
import { ScrollView, SafeAreaView, Picker } from "react-native";
import { DrawerContentComponentProps } from "react-navigation-drawer";
import { Button } from "./Button";
import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { Ionicons } from "@expo/vector-icons";
import { View } from "./View";
import { useQuery } from "@apollo/react-hooks";
import { getGroups } from "../graphql/query";
import Home from "../screens/Home";
import Detail from "../screens/Detail";

export default (props: DrawerContentComponentProps) => {
  const { loading, data } = useQuery(getGroups);
  const [group, setGroup] = React.useState<any>({});
  // console.log(props);
  const dropdownGroups = !loading && (
    <Picker
      selectedValue={group.id}
      style={{ height: 50, width: 200 }}
      onValueChange={(itemValue, itemIndex) => setGroup(itemValue)}
    >
      {data.parti_2020_groups.map((g: any, i: number) => (
        <Picker.Item label={g.title} value={g.id} key={i} />
      ))}
    </Picker>
  );
  function closeDrawer() {
    props.navigation.closeDrawer();
  }
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: 50, padding: 10 }}
            onPress={closeDrawer}
          >
            <Ionicons name="ios-arrow-back" size={60} />
          </TouchableOpacity>
          {dropdownGroups}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
