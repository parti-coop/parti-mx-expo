import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { View } from "../components/View";
import { Button } from "../components/Button";
import { useStore } from "../Store";
import { useQuery } from "@apollo/react-hooks";
import { getGroups } from "../graphql/query";
export default (props: NavigationStackScreenProps<{ name: string }>) => {
  const { navigate } = props.navigation;
  const [store, setPersistStore] = useStore();
  const { loading, data } = useQuery(getGroups);
  function removePersist() {
    setPersistStore("");
  }
  function navigateTo() {
    navigate("Home", { name: "John" });
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detail Screen</Text>
      <Text>와라!!</Text>
      <Text>{JSON.stringify(store)}</Text>
      <Text>{loading}</Text>
      <Text>{JSON.stringify(data)}</Text>
      <Text>{props.navigation.getParam("name")}</Text>
      <Button title="removePersist" onPress={removePersist} />
      <Button title="navigateTo" onPress={navigateTo} />
    </View>
  );
};
