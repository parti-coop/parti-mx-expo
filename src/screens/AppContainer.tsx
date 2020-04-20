import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDebouncedCallback } from "use-debounce";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";
import { DocumentResult } from "expo-document-picker";

import Intro from "./Intro";
import Home from "./Home";
import SuggestionList from "./SuggestionList";
import SuggestionNew from "./SuggestionNew";
import SuggestionEdit from "./SuggestionEdit";
import SuggestionDetail from "./SuggestionDetail";
import UserSetting from "./UserSetting";
import QRcode from "./QRcode";
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
import Search from "./Search";

import CustomDrawer from "../components/CustomDrawer";

import { useStore } from "../Store";
import { auth, IdTokenResult } from "../firebase";
import { minutesDiff } from "../Utils/CalculateDays";
export type RootStackParamList = {
  Home: {};
  Intro: {};
  SuggestionList: { id: number };
  GroupNew: {};
  AccountDelete: {};
  GroupSetting: { title: string; bg_img_url: string };
  Logout: {};
  Member: { userStatus: "organizer" | "user" };
  QRcode: {};
  SuggestionNew: {};
  SuggestionDetail: { suggestionId: number };
  SuggestionEdit: {
    suggestion: {
      id: number;
      title: string;
      context: string;
      body: string;
      metadata: any;
      images: ImageInfo[];
      files: DocumentResult[];
    };
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

export default function MyDrawer() {
  const [{ loading }, dispatch] = useStore();
  const [debouncedRefreshToken] = useDebouncedCallback(refreshAuthToken, 2000);
  const [isNewUser, setNewUser] = React.useState(null);
  async function refreshAuthToken() {
    return auth.currentUser
      .getIdTokenResult(true)
      .then((res) => res as IdTokenResult)
      .then(async ({ claims }) => {
        // console.log(claims);
        if (claims["https://hasura.io/jwt/claims"]) {
          const userId = Number(
            claims["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
          );
          dispatch({ type: "SET_USER", user_id: userId });
          dispatch({ type: "SET_LOADING", loading: false });
        } else {
          debouncedRefreshToken();
        }
      });
  }

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading: true });
    refreshAuthToken();
    const { creationTime } = auth.currentUser.metadata;
    setNewUser(minutesDiff(creationTime) < 3);
  }, []);
  if (isNewUser === null) {
    return null;
  }
  return (
    <Drawer.Navigator
      initialRouteName={isNewUser ? "Profile" : "Intro"}
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
      <Drawer.Screen name="Search" component={Search} />
    </Drawer.Navigator>
  );
}
