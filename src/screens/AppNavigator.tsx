import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./Home";
import GroupNew from "./GroupNew";
import Detail from "./Detail";
import SuggestionList from "./SuggestionList";
import SuggestionCreate from "./SuggestionCreate";
import SuggestionEdit from "./SuggestionEdit";
import SuggestionDetail from "./SuggestionDetail";
import UserSetting from "./UserSetting";
import QRcode from "./QRcode";
import contentComponent from "../components/CustomDrawer";
import TermsPrivacy from "./TermsPrivacy";
import TermsService from "./TermsService";
import Logout from "./Logout";
import Member from "./Member";
import GroupSetting from "./GroupSetting";
import GroupCreate from "./GroupCreate";
const stack = createStackNavigator(
  {
    Detail,
    GroupCreate,
    GroupSetting,
    Home,
    Logout,
    Member,
    QRcode,
    SuggestionList,
    SuggestionCreate,
    SuggestionDetail,
    SuggestionEdit,

    TermsPrivacy,
    TermsService,
    UserSetting
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
export default createDrawerNavigator(
  {
    stack,
    GroupNew
  },
  {
    initialRouteName: "stack",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent
  }
);
