import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import { useStore } from "../Store";

const Drawer = createDrawerNavigator();
function Intro(props) {
  const [{ group_id }] = useStore();
  React.useEffect(() => {
    if (group_id !== null) {
      props.navigation.navigate("Home");
    }
  }, [group_id]);

  return null;
}
export default function IntroContainer() {
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
      <Drawer.Screen name="Intro" component={Intro} />
    </Drawer.Navigator>
  );
}
