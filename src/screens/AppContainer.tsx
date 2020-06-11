import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Intro from "./Intro";
import Home from "./Home";

import SuggestionList from "./SuggestionList";
import SuggestionNew from "./SuggestionNew";
import SuggestionDetail from "./SuggestionDetail";
import SuggestionEdit from "./SuggestionEdit";

import VoteList from "./VoteList";
import VoteNew from "./VoteNew";
import VoteDetail from "./VoteDetail";
import VoteEdit from "./VoteEdit";

import NoticeNew from "./NoticeNew";
import NoticeList from "./NoticeList";
import NoticeDetail from "./NoticeDetail";
import NoticeEdit from "./NoticeEdit";

import EventNew from "./EventNew";
import EventList from "./EventList";
import EventDetail from "./EventDetail";
import EventEdit from "./EventEdit";

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
import NoMatch from "./NoMatch";

import {
  SuggestionDetailType,
  NoticeDetailType,
  VoteDetailType,
  EventDetailType,
} from "../types";
export type RootStackParamList = {
  Home: {};
  Intro: { groupId?: number };
  GroupNew: {};
  GroupSetting: { title: string; bg_img_url: string };
  AccountDelete: {};

  SuggestionList: { id: number };
  SuggestionNew: { boardId: number; boardName: string };
  SuggestionDetail: { postId: number };
  SuggestionEdit: {
    suggestion: SuggestionDetailType;
  };

  VoteList: { id: number };
  VoteNew: { boardId: number; boardName: string };
  VoteDetail: { postId: number };
  VoteEdit: { vote: VoteDetailType };

  NoticeList: { id: number };
  NoticeNew: { boardId: number; boardName: string };
  NoticeDetail: { postId: number };
  NoticeEdit: { notice: NoticeDetailType };

  EventList: { id: number };
  EventNew: { boardId: number; boardName: string };
  EventDetail: { postId: number };
  EventEdit: { event: EventDetailType };

  Member: { userStatus: "organizer" | "user" };
  QRcode: {};
  TermsPrivacy: {};
  TermsService: {};
  UserSetting: {};
  Profile: {};
  PasswordChange: {};
  BoardSetting: {};
  Search: {};
  NoMatch: {};
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
      <Stack.Screen name="SuggestionNew" component={SuggestionNew} />
      <Stack.Screen name="SuggestionDetail" component={SuggestionDetail} />
      <Stack.Screen name="SuggestionEdit" component={SuggestionEdit} />

      <Stack.Screen name="VoteList" component={VoteList} />
      <Stack.Screen name="VoteNew" component={VoteNew} />
      <Stack.Screen name="VoteDetail" component={VoteDetail} />
      <Stack.Screen name="VoteEdit" component={VoteEdit} />

      <Stack.Screen name="NoticeList" component={NoticeList} />
      <Stack.Screen name="NoticeNew" component={NoticeNew} />
      <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
      <Stack.Screen name="NoticeEdit" component={NoticeEdit} />

      <Stack.Screen name="EventList" component={EventList} />
      <Stack.Screen name="EventNew" component={EventNew} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name="EventEdit" component={EventEdit} />

      <Stack.Screen name="TermsPrivacy" component={TermsPrivacy} />
      <Stack.Screen name="TermsService" component={TermsService} />
      <Stack.Screen name="UserSetting" component={UserSetting} />
      <Stack.Screen name="AccountDelete" component={AccountDelete} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PasswordChange" component={PasswordChange} />
      <Stack.Screen name="BoardSetting" component={BoardSetting} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="NoMatch" component={NoMatch} />
    </Stack.Navigator>
  );
}
