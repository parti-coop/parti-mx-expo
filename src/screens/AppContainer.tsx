import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
import SuggestionList from "./SuggestionList";
import SuggestionNew from "./SuggestionNew";
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
import GroupNew from "./GroupNew";
import AccountDelete from "./AccountDelete";
import Profile from "./Profile";
import PasswordChange from "./PasswordChange";
import BoardSetting from "./BoardSetting";
import { useStore } from "../Store";
export type RootStackParamList = {
  Home: {};
  SuggestionList: { id: number };
  GroupNew: {};
  AccountDelete: {};
  GroupSetting: { title: string; bg_img_url: string };
  Logout: {};
  Member: {};
  QRcode: {};
  SuggestionNew: {};
  SuggestionDetail: { suggestionId: number };
  SuggestionEdit: {
    suggestion: {
      id: number;
      title: string;
      context: string;
      body: string;
      closing_method: number;
    };
  };
  TermsPrivacy: {};
  TermsService: {};
  UserSetting: {};
  Profile: {};
  PasswordChange: {};
  BoardSetting: {};
};
const Drawer = createDrawerNavigator<RootStackParamList>();

export default function MyDrawer() {
  const [{ user_id }, dispatch] = useStore();
  return (
    <Drawer.Navigator
      initialRouteName={user_id !== null ? "Home" : "Profile"}
      drawerContentOptions={{ activeTintColor: "#e91e63" }}
      drawerContent={props => <CustomDrawer {...props} />}
      drawerStyle={{
        backgroundColor: "#008489",
        width: 330,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="GroupNew" component={GroupNew} />
      <Drawer.Screen name="GroupSetting" component={GroupSetting} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="Member" component={Member} />
      <Drawer.Screen name="QRcode" component={QRcode} />
      <Drawer.Screen name="SuggestionList" component={SuggestionList} />
      <Drawer.Screen name="SuggestionNew" component={SuggestionNew} />
      <Drawer.Screen name="SuggestionDetail" component={SuggestionDetail} />
      <Drawer.Screen name="SuggestionEdit" component={SuggestionEdit} />
      <Drawer.Screen name="TermsPrivacy" component={TermsPrivacy} />
      <Drawer.Screen name="TermsService" component={TermsService} />
      <Drawer.Screen name="UserSetting" component={UserSetting} />
      <Drawer.Screen name="AccountDelete" component={AccountDelete} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="PasswordChange" component={PasswordChange} />
      <Drawer.Screen name="BoardSetting" component={BoardSetting} />
    </Drawer.Navigator>
  );
}
