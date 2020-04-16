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
export default () => {
  return (
    <Drawer.Navigator
      initialRouteName={"Intro"}
      drawerContentOptions={{ activeTintColor: "#e91e63" }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerStyle={{
        backgroundColor: "#008489",
        width: 330,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
      }}
      drawerType={"permanent"}
    >
      <Drawer.Screen name="Intro" component={Intro} />
    </Drawer.Navigator>
  );
};
