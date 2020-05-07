import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Intro from "./Intro";
import Home from "./Home";
import SuggestionList from "./SuggestionList";
import VoteList from "./VoteList";
import NoticeList from "./NoticeList";
import SuggestionNew from "./SuggestionNew";
import VoteNew from "./VoteNew";
import NoticeNew from "./NoticeNew";
import SuggestionEdit from "./SuggestionEdit";
import NoticeEdit from "./NoticeEdit";
import SuggestionDetail from "./SuggestionDetail";
import VoteDetail from "./VoteDetail";
import NoticeDetail from "./NoticeDetail";
import UserSetting from "./UserSetting";
import QRcode from "./QRcode";
import TermsPrivacy from "./TermsPrivacy";
import TermsService from "./TermsService";
import Member from "./Member";
import GroupSetting from "./GroupSetting";
import GroupNew from "./GroupNew";
import AccountDelete from "./AccountDelete";
import Profile from "./Profile";
import PasswordChange from "./PasswordChange";
import BoardSetting from "./BoardSetting";
import Search from "./Search";

import CustomDrawer from "../components/CustomDrawer";

import { SuggestionDetailType, NoticeDetailType } from "../types";
export type RootStackParamList = {
  Home: {};
  Intro: {};
  SuggestionList: { id: number };
  VoteList: { id: number };
  NoticeList: { id: number };
  GroupNew: {};
  AccountDelete: {};
  GroupSetting: { title: string; bg_img_url: string };
  Member: { userStatus: "organizer" | "user" };
  QRcode: {};
  SuggestionNew: { boardId: number; boardName: string };
  VoteNew: { boardId: number; boardName: string };
  NoticeNew: { boardId: number; boardName: string };
  SuggestionDetail: { postId: number };
  VoteDetail: { postId: number };
  NoticeDetail: { postId: number };
  SuggestionEdit: {
    suggestion: SuggestionDetailType;
  };
  NoticeEdit: {
    notice: NoticeDetailType;
  };
  TermsPrivacy: {};
  TermsService: {};
  UserSetting: {};
  Profile: {};
  PasswordChange: {};
  BoardSetting: {};
  Search: {};
};
const Drawer = createDrawerNavigator<RootStackParamList>();

export default function AppContainer() {
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
    >
      <Drawer.Screen name="Intro" component={Intro} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="GroupNew" component={GroupNew} />
      <Drawer.Screen name="GroupSetting" component={GroupSetting} />
      <Drawer.Screen name="Member" component={Member} />
      <Drawer.Screen name="QRcode" component={QRcode} />
      <Drawer.Screen name="SuggestionList" component={SuggestionList} />
      <Drawer.Screen name="VoteList" component={VoteList} />
      <Drawer.Screen name="NoticeList" component={NoticeList} />
      <Drawer.Screen name="SuggestionNew" component={SuggestionNew} />
      <Drawer.Screen name="VoteNew" component={VoteNew} />
      <Drawer.Screen name="NoticeNew" component={NoticeNew} />
      <Drawer.Screen name="SuggestionDetail" component={SuggestionDetail} />
      <Drawer.Screen name="VoteDetail" component={VoteDetail} />
      <Drawer.Screen name="NoticeDetail" component={NoticeDetail} />
      <Drawer.Screen name="SuggestionEdit" component={SuggestionEdit} />
      <Drawer.Screen name="NoticeEdit" component={NoticeEdit} />
      <Drawer.Screen name="TermsPrivacy" component={TermsPrivacy} />
      <Drawer.Screen name="TermsService" component={TermsService} />
      <Drawer.Screen name="UserSetting" component={UserSetting} />
      <Drawer.Screen name="AccountDelete" component={AccountDelete} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="PasswordChange" component={PasswordChange} />
      <Drawer.Screen name="BoardSetting" component={BoardSetting} />
      <Drawer.Screen name="Search" component={Search} />
    </Drawer.Navigator>
  );
}
