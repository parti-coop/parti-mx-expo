import React from "react";
import { PixelRatio } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
import SuggestionList from "./SuggestionList";
import SuggestionCreate from "./SuggestionCreate";
import SuggestionEdit from "./SuggestionEdit";
import SuggestionDetail from "./SuggestionDetail";
import UserSetting from "./UserSetting";
import QRcode from "./QRcode";
import CustomDrawer from "../components/CustomDrawer";
import TermsPrivacy from "./TermsPrivacy";
import TermsService from "./TermsService";
import Logout from "./Logout";
import Member from "./Member";
import GroupSetting from "./GroupSetting";
import GroupCreate from "./GroupCreate";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{ activeTintColor: "#e91e63" }}
      drawerContent={props => <CustomDrawer {...props} />}
      drawerStyle={{
        backgroundColor: "#008489",
        width: 330,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
      }}
    >
      <Drawer.Screen name="GroupCreate" component={GroupCreate} />
      <Drawer.Screen name="GroupSetting" component={GroupSetting} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="Member" component={Member} />
      <Drawer.Screen name="QRcode" component={QRcode} />
      <Drawer.Screen name="SuggestionList" component={SuggestionList} />
      <Drawer.Screen name="SuggestionCreate" component={SuggestionCreate} />
      <Drawer.Screen name="SuggestionDetail" component={SuggestionDetail} />
      <Drawer.Screen name="SuggestionEdit" component={SuggestionEdit} />
      <Drawer.Screen name="TermsPrivacy" component={TermsPrivacy} />
      <Drawer.Screen name="TermsService" component={TermsService} />
      <Drawer.Screen name="UserSetting" component={UserSetting} />
    </Drawer.Navigator>
  );
}
