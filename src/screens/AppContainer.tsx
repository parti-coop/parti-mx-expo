import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

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
import VoteEdit from "./VoteEdit";

import CustomDrawer from "../components/CustomDrawer";

import {
  SuggestionDetailType,
  NoticeDetailType,
  VoteDetailType,
} from "../types";
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
  VoteEdit: { vote: VoteDetailType };
  TermsPrivacy: {};
  TermsService: {};
  UserSetting: {};
  Profile: {};
  PasswordChange: {};
  BoardSetting: {};
  Search: {};
};
const Stack = createStackNavigator<RootStackParamList>();

export default function AppContainer() {
  return (
    <Stack.Navigator initialRouteName={"Intro"} headerMode="none">
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GroupNew" component={GroupNew} />
      <Stack.Screen name="GroupSetting" component={GroupSetting} />
      <Stack.Screen name="Member" component={Member} />
      <Stack.Screen name="QRcode" component={QRcode} />
      <Stack.Screen name="SuggestionList" component={SuggestionList} />
      <Stack.Screen name="VoteList" component={VoteList} />
      <Stack.Screen name="NoticeList" component={NoticeList} />
      <Stack.Screen name="SuggestionNew" component={SuggestionNew} />
      <Stack.Screen name="VoteNew" component={VoteNew} />
      <Stack.Screen name="NoticeNew" component={NoticeNew} />
      <Stack.Screen name="SuggestionDetail" component={SuggestionDetail} />
      <Stack.Screen name="VoteDetail" component={VoteDetail} />
      <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
      <Stack.Screen name="SuggestionEdit" component={SuggestionEdit} />
      <Stack.Screen name="NoticeEdit" component={NoticeEdit} />
      <Stack.Screen name="TermsPrivacy" component={TermsPrivacy} />
      <Stack.Screen name="TermsService" component={TermsService} />
      <Stack.Screen name="UserSetting" component={UserSetting} />
      <Stack.Screen name="AccountDelete" component={AccountDelete} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PasswordChange" component={PasswordChange} />
      <Stack.Screen name="BoardSetting" component={BoardSetting} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="VoteEdit" component={VoteEdit} />
    </Stack.Navigator>
  );
}
