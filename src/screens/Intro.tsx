import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import { useStore } from "../Store";

const Drawer = createDrawerNavigator();
function IntroNull() {
  return null;
}
export default function IntroContainer(props) {
  const groupId = props.route.params?.groupId ?? null;
  const [{ group_id }, dispatch] = useStore();
  React.useEffect(() => {
    if (group_id !== null) {
      props.navigation.navigate("Home");
    }
  }, [group_id]);
  React.useEffect(() => {
    if (groupId !== null) {
      dispatch({ type: "SET_GROUP", group_id: groupId });
    }
  }, [groupId]);
  return (
    <Drawer.Navigator
      initialRouteName={"Intro"}
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerStyle={{
        backgroundColor: "#00a580",
        width: 330,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
      }}
      drawerType={"permanent"}
    >
      <Drawer.Screen name="Intro" component={IntroNull} />
    </Drawer.Navigator>
  );
}
